import Contentstack from "contentstack";

export const StackCG = Contentstack.Stack({
  api_key: process.env.api_key_cg,
  delivery_token: process.env.delivery_token_cg,
  environment: process.env.environment_cg,
  branch: process.env.branch_cg,
});

StackCG.setHost("api.contentstack.io");
