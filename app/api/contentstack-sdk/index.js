import * as contentstack from "contentstack";
import "@contentstack/live-preview-utils/dist/main.css";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { publicRuntimeConfig } from "@/next.config";

export const envConfig  = process && process.env.CONTENTSTACK_API_KEY
? process.env
: publicRuntimeConfig;

export const stackConfig = {
  api_key: envConfig.CONTENTSTACK_API_KEY
  ? envConfig.CONTENTSTACK_API_KEY
  : envConfig.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
  delivery_token: envConfig.CONTENTSTACK_DELIVERY_TOKEN,
  branch: envConfig.CONTENTSTACK_BRANCH
    ? envConfig.CONTENTSTACK_BRANCH
    : "develop",
  environment: envConfig.CONTENTSTACK_ENVIRONMENT,
  live_preview: {
    enable: true, // IMPORTANT: DISABLING LIVE PREVIEW WILL HIDE THE CONTENT MANAGEMENT TOKEN FROM THE WINDOW
    management_token: envConfig.CONTENTSTACK_MANAGEMENT_TOKEN,
    host: envConfig.CONTENTSTACK_API_HOST,
  },
}

export const Stack = contentstack.Stack(stackConfig);

if (envConfig.CONTENTSTACK_API_HOST) {
  Stack.setHost(envConfig.CONTENTSTACK_API_HOST);
}

ContentstackLivePreview.init({
  enable: true,
  stackSdk: Stack,
  ssr: true,
  clientUrlParams: {
    host: envConfig.CONTENTSTACK_APP_HOST,
  },
});

export const { onEntryChange } = ContentstackLivePreview;