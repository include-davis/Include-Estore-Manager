import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/**
 * Takes object resembling example below with an "*expandIds" field:
 * {
 *   "*expandIds": {
 *       "ids": ["658f94018dac260ae7b17fce", "658f940e8dac260ae7b17fd0"],
 *       "from": "pokemon"
 *     }
 * }
 * When an object that resembles the above object is encountered, return an array of documents
 * from the "from" collection
 */
async function expandIds(obj) {
  obj = obj['*expandIds'];
  const documents = await prisma[obj.from].findMany({
    where: {
      id: {
        in: obj.ids.map((id) => parseInt(id, 10)), // Assuming ids are integers in Prisma schema
      },
    },
  });
  return documents;
}

/**
 * Takes object resembling example below with an "*expandId" field:
 * {
 *   "*expandId": {
 *       "id": "658f94018dac260ae7b17fce",
 *       "from": "pokemon"
 *     }
 * }
 * When an object that resembles the above object is encountered, return a document
 * from the "from" collection
 */
async function expandId(obj) {
  obj = obj['*expandId'];
  const document = await prisma[obj.from].findUnique({
    where: {
      id: parseInt(obj.id, 10), // Assuming id is an integer in Prisma schema
    },
  });
  return document;
}

/**
 * Takes object resembling example below with a "*convertIds" field:
 * {
 *   "*convertIds": {
 *       "ids": ["658f94018dac260ae7b17fce", "658f940e8dac260ae7b17fd0"],
 *     }
 * }
 *
 * Returns the array of ids converted to integers
 */
async function convertIds(obj) {
  obj = obj['*convertIds'];
  return obj.ids.map((id) => parseInt(id, 10)); // Assuming ids are integers in Prisma schema
}

/**
 * Takes object resembling example below with a "*convertId" field:
 * {
 *   "*convertId": {
 *       "id": "658f94018dac260ae7b17fce",
 *     }
 * }
 *
 * Returns the id converted to an integer
 */
async function convertId(obj) {
  obj = obj['*convertId'];
  return parseInt(obj.id, 10); // Assuming id is an integer in Prisma schema
}
