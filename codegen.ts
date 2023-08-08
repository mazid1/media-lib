import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: {
    [process.env.GRAFBASE_API_URL!]: {
      headers: {
        "x-api-key": process.env.GRAFBASE_API_KEY,
      },
    },
  },
  documents: ["src/**/*.gql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "src/generated/": {
      preset: "client",
      plugins: [],
    },
  },
  hooks: { afterAllFileWrite: ["eslint --fix"] },
};

export default config;
