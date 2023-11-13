//***** footer *****//
// Description: Site footer
// Usage: Sitewide
//****************//
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
/**
Footer Component
@param {Object} footerData - Menu data for the footer
*/
const Footer = ({ ...props }) => {
  const {
    bottom_row_links,
    subfooter_copyright,
    contact_info_heading,
    contact_info,
    navigation_group,
    locale_picker_regions,
  } = props ?? {};
  /**
Toggles the open/closed status of a footer group
@param {string} groupName - Name of the group to toggle
*/

  const [openGroup, setOpenGroup] = useState([]); // State to keep track of the currently open group
  const toggleGroup = (groupTitle) => {
    setOpenGroup((prevOpenGroup) =>
      openGroup.find((item) => item === groupTitle)
        ? prevOpenGroup.filter((item) => item !== groupTitle)
        : [...prevOpenGroup, groupTitle]
    );
  };

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  /**
toggleOptions function
Toggles the options dropdown
*/
  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  /**
Sets the selected option and closes the dropdown
@param {number} index - Index of the selected option
*/
  const setSelectedThenCloseDropdown = (index) => {
    setSelectedOption(index);
    setIsOptionsOpen(false);
  };

  /**
Handles keydown events on individual options
@param {number} index - Index of the option
@returns {Function} - Event handler function
*/
  const handleKeyDown = (index) => (e) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        setSelectedThenCloseDropdown(index);
        break;
      default:
        break;
    }
  };

  /**
Handles keydown events on the options list
@param {Object} e - Event object
*/
  const handleListKeyDown = (e) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOptionsOpen(false);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedOption(
          selectedOption - 1 >= 0 ? selectedOption - 1 : optionsList.length - 1
        );
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedOption(
          selectedOption == optionsList.length - 1 ? 0 : selectedOption + 1
        );
        break;
      default:
        break;
    }
  };

  const socialicons = [
    {
      href: "https://www.instagram.com/travismathew/",
      className: "logo-instagram",
      ariaLabel: "Instagram",
    },
    {
      href: "https://www.facebook.com/travismathew/",
      className: "logo-facebook",
      ariaLabel: "Facebook",
    },
    {
      href: "https://twitter.com/travismathew",
      className: "logo-twitter",
      ariaLabel: "Twitter",
    },
    {
      href: "https://www.tiktok.com/@travismathew",
      className: "logo-tiktok",
      ariaLabel: "Tiktok",
    },
    {
      href: "https://www.youtube.com/channel/UC5MkksBIAEKv8UpFH1S4LiQ",
      className: "logo-youtube",
      ariaLabel: "Youtube",
    },
  ];

  const changeCurrentYear = (subfooter_copyright) => {
    let copyright = subfooter_copyright;
    const currentYear = new Date().getFullYear();
    copyright = copyright?.replace(/\$\{year\}/g, currentYear);
    return <div>{copyright}</div>;
  };

  return (
    <>
      <nav className="footer tm-footer">
        <div className="footer-social">
          <ul>
            {socialicons?.length > 0 &&
              socialicons?.map((icons, index) => {
                return (
                  <li key={index}>
                    <Link
                      href={icons?.href}
                      className={icons?.className}
                      aria-label={icons?.ariaLabel}
                    ></Link>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="footer-w1 flex flex-wrap">
          <div className="footer-w2 footer-logo w-full xl:w-1/5 lg:grid lg:grid-cols-5">
            <ul className="open">
              <li>
                <Link
                  href="/"
                  className="logo-tm"
                  aria-label="Travis Mathew logo"
                ></Link>
              </li>
            </ul>
          </div>

          {/* Desktop */}

          {navigation_group?.length > 0 &&
            navigation_group?.map((eachGroup, index) => (
              <div
                className={`footer-w2 w-full xl:w-1/5 px-4 ${
                  index == 2 ? "rewards" : ""
                } ${
                  openGroup.includes(eachGroup?.column_title) ? "active" : ""
                } 
                ${eachGroup?.column_title == "Shop" ? "shop" : null}`}
                key={eachGroup?.column_title}
              >
                <button
                  className={`footerbtn ${
                    openGroup.includes(eachGroup?.column_title) ? "active" : ""
                  } `}
                  aria-label={isOptionsOpen ? "plus" : "minus"}
                  onClick={() => toggleGroup(eachGroup?.column_title)}
                ></button>
                <h4 onClick={() => toggleGroup(eachGroup?.column_title)}>
                  {eachGroup?.column_title}
                </h4>
                <ul
                  className={
                    openGroup.includes(eachGroup?.column_title) ? "open" : ""
                  }
                >
                  {eachGroup?.navigation_node?.length > 0 &&
                    eachGroup?.navigation_node.map((eachNode) => (
                      <li key={eachNode?.title}>
                        <Link href={eachNode?.href} className="p-xs">
                          {eachNode?.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}

          <div className="footer-w2 w-full xl:w-1/5 px-4 contact-us">
            <h4>{contact_info_heading}</h4>
            {contact_info ? <ul>{parse(contact_info)}</ul> : ""}
          </div>
        </div>

        <div className="footer-preferences">
          <div className="footer-w3">
            <div className="country-selector p-xs">
              <div>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isOptionsOpen}
                  className={`csbutton ${
                    isOptionsOpen ? "expanded" : ""
                  } flag-${
                    locale_picker_regions
                      ? locale_picker_regions[selectedOption]
                          ?.flag_variable_pairing
                      : ""
                  }`}
                  aria-label={isOptionsOpen ? "plus" : "minus"}
                  onClick={toggleOptions}
                  onKeyDown={handleListKeyDown}
                >
                  {locale_picker_regions
                    ? locale_picker_regions[selectedOption]?.region_name
                    : ""}
                </button>

                <ul
                  className={`options ${isOptionsOpen ? "show" : ""}`}
                  role="listbox"
                  aria-activedescendant={
                    locale_picker_regions
                      ? locale_picker_regions[selectedOption]?.region_name
                      : ""
                  }
                  tabIndex={-1}
                  onKeyDown={handleListKeyDown}
                >
                  {locale_picker_regions?.length > 0 &&
                    locale_picker_regions?.map((option, index) =>
                      selectedOption !== index ? (
                        <li
                          className={`country flag-${option.flag_variable_pairing}`}
                          id={`option-${option.flag_variable_pairing}`}
                          data-country={option.flag_variable_pairing}
                          key={index}
                          role="option"
                          aria-selected={selectedOption == index}
                          tabIndex={0}
                          onKeyDown={handleKeyDown(index)}
                          onClick={() => {
                            setSelectedThenCloseDropdown(index);
                          }}
                        >
                          {option?.region_name}
                        </li>
                      ) : null
                    )}
                </ul>
              </div>
            </div>

            <div className="language-name p-xs">
              <span>
                {locale_picker_regions
                  ? locale_picker_regions[selectedOption]?.language_name
                  : ""}
              </span>
            </div>

            <div className="copyright">
              <div className="p-xs">
                {" "}
                {changeCurrentYear(subfooter_copyright)}
              </div>
            </div>
          </div>
          <div className="preferences-links">
            <div className="copyright">
              <div className="p-xs">
                {" "}
                {changeCurrentYear(subfooter_copyright)}
              </div>
            </div>
            <ul>
              {bottom_row_links?.length > 0 &&
                bottom_row_links?.map((eachLink) => (
                  <li key={eachLink?.title}>
                    <Link className="p-xs" href={eachLink?.href}>
                      {eachLink?.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Footer;

// export async function getStaticProps() {
//   try {
//     const { data } = await client.query({ query });
//     // Process the data here
//     console.log(data);

//     return {
//       props: {
//         countries: data.countries,
//       },
//     };
//   } catch (error) {
//     // Handle any errors here
//     console.error(error);

//     return {
//       props: {
//         countries: [],
//       },
//     };
//   }
// }
