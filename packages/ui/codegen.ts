import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.gql',
  generates: {
    './packages/ui/src/app/gql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
    },
  },
  documents: [
    './packages/ui/src/graphql/queries.graphql',
    './packages/ui/src/graphql/mutations.graphql',
  ],
};

export default config;
