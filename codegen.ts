import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'app/api/_graphql/**/*.graphql',
  documents: 'app/api/_graphql/**/*.graphql',
  generates: {
    'app/api/_types/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
