import { addons } from "@storybook/manager-api";
import TMTheme from "./TMTheme";

addons.setConfig({
  theme: TMTheme,
});
