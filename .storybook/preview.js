/** @type { import('@storybook/react').Preview } */
//import "/styles/tmstyles.scss";
import "/styles/tm.scss";
import "./tailwind.css";
import { withPerformance } from "storybook-addon-performance";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "./storybook-overrides.scss";

import rootReducer from "/reducers";
const store = configureStore({
  reducer: rootReducer,
});

const customViewports = {
  iPhoneX: {
    name: "iPhone X",
    styles: {
      width: "375px",
      height: "812px",
    },
  },
  iPhone12: {
    name: "iPhone 12",
    styles: {
      width: "390px",
      height: "844px",
    },
  },
  GooglePixel: {
    name: "Google Pixel",
    styles: {
      width: "411px",
      height: "731px",
    },
  },
  SamsungGalaxyS21: {
    name: "Samsung Galaxy S21",
    styles: {
      width: "360px",
      height: "800px",
    },
  },
  OnePlus9: {
    name: "OnePlus 9",
    styles: {
      width: "412px",
      height: "870px",
    },
  },
  iPad: {
    name: "iPad",
    styles: {
      width: "768px",
      height: "1024px",
    },
  },
  iPadPro: {
    name: "iPad Pro",
    styles: {
      width: "1024px",
      height: "1366px",
    },
  },
  SamsungGalaxyTabS7: {
    name: "Samsung Galaxy Tab S7",
    styles: {
      width: "1600px",
      height: "2560px",
    },
  },
  AmazonFireHD10: {
    name: "Amazon Fire HD 10",
    styles: {
      width: "800px",
      height: "1280px",
    },
  },
  LenovoTabM10: {
    name: "Lenovo Tab M10",
    styles: {
      width: "800px",
      height: "1280px",
    },
  },
};

export const parameters = {
  // Replace the path with the path to your logo file
  docs: {
    logo: {
      src: "/tm-white.svg",
    },
  },
  layout: "fullscreen",
};

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          "Docs",
          ["Introduction", "Color system", "Typography", "Project Structure"],
          "Elements",
          "Components",
          ["Sitewide, PDP"],
          "Templates",
        ],
      },
    },
    viewport: { viewports: customViewports },
  },
};

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
  withPerformance,
];

export default preview;
