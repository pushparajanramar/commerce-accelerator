import SuggestionBox from "../../components/Sitewide/Header/SearchBox/SuggestionBox";
import props from '../mock/search-box'

export default {
    title: "Components/Sitewide/SearchBox",
    component: SuggestionBox,
    tags: ["autodocs"],
};

const Template = (props) => {
    return (
        <div className="header-search-box">
            <div className="w1 storybook">
                <SuggestionBox {...props} />
            </div>
        </div>
    )

};

export const Default = Template.bind({});
Default.args = props;
