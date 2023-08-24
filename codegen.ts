import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: {
    [process.env.NEXT_PUBLIC_HASURA_API_URL!]: {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
      },
    },
  } as any,
  documents: ["src/**/*.gql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "__generated__/types.tsx": {
      config: {
        reactApolloVersion: 3,
        withHooks: true,
        withMutationFn: true,
        withHOC: false,
        withComponent: false,
        namingConvention: {
          typeNames: "pascal-case#pascalCase",
          transformUnderscore: true,
        },
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-resolvers",
        "typescript-react-apollo",
      ],
    },
  },
  hooks: { afterAllFileWrite: ["eslint --fix"] },
};

export default config;
