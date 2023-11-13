import { SortDropdown } from "../../components/Elements/SortDropdown";

export default {
  title: "Elements/Form elements",
  component: SortDropdown,
  // argTypes: {
  //   labels: {
  //     control: { type: "array" },
  //     description: "Array of checkbox labels",
  //   },
  // },
};

export const SortDropdownStory = (args) => {
  const { labels } = args;
  const options = [
    "Choose a Fruit",
    "Apple",
    "Banana",
    "Blueberry",
    "Boysenberry",
    "Cherry",
    "Cranberry",
    "Durian",
    "Eggplant",
    "Fig",
    "Grape",
    "Guava",
    "Huckleberry",
  ];
  return (
    <div>
      <label id="combo1-label" className="combo-label">
        Favorite Fruit
      </label>
      <SortDropdown options={options} />
    </div>
  );
};
