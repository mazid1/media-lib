import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: {
    [process.env.NEXT_PUBLIC_GRAFBASE_API_URL!]: {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_GRAFBASE_API_KEY,
      },
    },
  },
  documents: ["src/**/*.gql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "src/generated/gql.tsx": {
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
        "typescript-react-apollo",
      ],
    },
  },
  hooks: { afterAllFileWrite: ["eslint --fix"] },
};

export default config;
