import { NextRequest } from 'next/server';
import prisma from '@datalib/_prisma/client';
// import { DMMF } from '@prisma/client/runtime';

function typeCast(value: string, type: string) {
  switch (type) {
    case 'Int':
      return isNaN(+value) ? value : +value;
    case 'String':
      return value;
    case 'Boolean':
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      } else {
        return value;
      }
    default:
      return value;
  }
}

export default async function getQueries(
  request: NextRequest,
  content_type: string
) {
  // Get the schema for the model in Prisma

  interface Field {
    name: string;
    type: string;
  }

  interface Schema {
    fields: Field[];
  }

  const schema: Schema | undefined = prisma
    ._getDmmf()
    .datamodel.models.find(
      (model: { name: string }) => model.name === content_type
    );

  if (!schema) {
    throw new Error(`Model ${content_type} not found in Prisma schema.`);
  }

  const query_entries = request.nextUrl.searchParams.entries();
  const output: { [key: string]: string | number | boolean } = {};

  for (const [key, val] of query_entries) {
    // Fetch the field type from the Prisma schema
    const field = schema.fields.find((field) => field.name === key);
    if (field) {
      output[key] = typeCast(val, field.type);
    } else {
      output[key] = val; // If field is not found in schema, return as is
    }
  }
  return output;
}
