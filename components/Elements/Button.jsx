import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary,
  type = "primary-black",
  label = "shop now",
  url = "/",
  ...props
}) => {
  return (
    <Link href={url} className={[`tm-button ${type}`].join(" ")} {...props}>
      {label}
    </Link>
  );
};

Button.propTypes = {
  /**
   * TM Button variants
   */
  type: PropTypes.oneOf([
    "primary-black",
    "primary-white",
    "primary-outlined",
    "secondary-black",
    "secondary-white",
    "cta-black",
    "cta-white",
    "text-link",
  ]),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  url: PropTypes.string,
};

// Button.defaultProps = {
//   label: "shop now",
//   type: "primary-black",
//   url: "/",
// };
