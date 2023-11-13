import Footer from "/components/Sitewide/Footer/Footer";

const navigation_group = [
  {
    column_title: "Shop",
    _metadata: {
      uid: "cs74ab01e3cad8489c",
    },
    navigation_node: [
      {
        title: "New & Featured",
        href: "/",
      },
      {
        title: "Men",
        href: "/",
      },
      {
        title: "Women",
        href: "/",
      },
      {
        title: "Shoes",
        href: "/",
      },
      {
        title: "Accessories",
        href: "/",
      },
      {
        title: "Sale",
        href: "/",
      },
    ],
    text_block: "",
  },
  {
    column_title: "Customer Support",
    _metadata: {
      uid: "cs704de0be727f9c20",
    },
    navigation_node: [
      {
        title: "Help Center",
        href: "/",
      },
      {
        title: "Shipping Information",
        href: "/",
      },
      {
        title: "Returns",
        href: "/",
      },
      {
        title: "FAQ",
        href: "http://travismatheweurope.callawaygolfeurope.happyfox.com/",
      },
      {
        title: "Gift Cards",
        href: "/",
      },
    ],
    text_block: "",
  },
  {
    column_title: "TM Rewards",
    _metadata: {
      uid: "cs4a48816cb7f40cc3",
    },
    navigation_node: [
      {
        title: "About TM Rewards",
        href: "/",
      },
      {
        title: "TM Rewards FAQ",
        href: "/",
      },
      {
        title: "TM Rewards Terms & Conditions",
        href: "/",
      },
      {
        title: "Promo Codes",
        href: "/",
      },
    ],
    text_block: "",
  },
  {
    column_title: "About TravisMathew",
    _metadata: {
      uid: "cs9d17a10cd162ac3b",
    },
    navigation_node: [
      {
        title: "About",
        href: "/",
      },
      {
        title: "TM Rewards",
        href: "/",
      },
      {
        title: "Store Locator",
        href: "/",
      },
      {
        title: "Stories",
        href: "/",
      },
    ],
    text_block: "",
  },
];

const locale_picker_regions = [
  {
    flag_variable_pairing: "US",
    language_name: "English",
    region_name: "United States",
    _metadata: { uid: "cs439699edcc4a3d68" },
  },
  {
    flag_variable_pairing: "UK",
    language_name: "English",
    region_name: "United Kingdom",
    _metadata: { uid: "cscd259a3b9d08fe13" },
  },
];

const bottom_row_links = [
  {
    title: "Manage Cookie Preferences",
    href: "/",
  },
  {
    title: "Your Privacy Choices",
    href: "/",
  },
  {
    title: "Privacy, Ad & Cookie Policies",
    href: "/",
  },
  {
    title: "Terms & Conditions",
    href: "/",
  },
];
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Components/Sitewide/Footer",
  component: Footer,
  tags: ["autodocs"],
  argTypes: {
    // lang: "en-US",
    navigation_group: navigation_group,
    bottom_row_links: bottom_row_links,
    subfooter_copyright:"Copyright © ${year} TravisMathew" ,
    contact_info:
      '<li><a classname="p-xs" href="tel:${1-877-969-1952}" target="_self">1-877-969-1952</a></li>\n<li classname="p-xs">Mon-Fri : 8AM - 5PM PST</li>\n<li><a classname="p-xs" href="/" target="_self">Contact us</a></li>\n<li><a classname="p-xs" href="/" target="_self">15202 Graham , St. Huntington<br />Beach, CA 926491</a></li>',
    contact_info_heading: "Contact Us",
    subfooter_copyright:"Copyright © ${year} TravisMathew",
    locale_picker_regions: locale_picker_regions,
    // eachNode: { title: "hi" },
  },
  args: {
    navigation_group: navigation_group,
    bottom_row_links: bottom_row_links,
    contact_info:
    '<li><a classname="p-xs" href="tel:${1-877-969-1952}" target="_self">1-877-969-1952</a></li>\n<li classname="p-xs">Mon-Fri : 8AM - 5PM PST</li>\n<li><a classname="p-xs" href="/" target="_self">Contact us</a></li>\n<li><a classname="p-xs" href="/" target="_self">15202 Graham , St. Huntington<br />Beach, CA 926491</a></li>',
    contact_info_heading: "Contact Us",
    subfooter_copyright:"Copyright © ${year} TravisMathew",
    locale_picker_regions: locale_picker_regions,
    // eachNode: { title: "hi" },
  },
  parameters: {
    design: [
      {
        type: "figma",
        name: "Mobile",
        url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=1%3A26463&t=IOdtfClI40VIAsNr-1",
      },
      {
        type: "figma",
        name: "Desktop",
        url: "https://www.figma.com/file/tlQe2WirTOpYUmoRVmR441/TM-Site-Refresh-2023?type=design&node-id=1%3A34308&t=IOdtfClI40VIAsNr-1",
      },
    ],
  },
};

// // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = (args) => <Footer {...args} />;
