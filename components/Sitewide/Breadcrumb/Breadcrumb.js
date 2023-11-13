import Link from "next/link";
import React from "react";
import PropTypes from "prop-types";
import { toTitleCase } from "../../../lib/Common";

function Breadcrumb({ list }) {
  return (
    <nav className="breadcrumb tm-width" aria-label="Breadcrumb">
      <ul>
        {list?.map((item, index) => {
          const originalTitle = item.title;
          const title = originalTitle?.replaceAll("-", " ");
          const heading = toTitleCase(title);
          return (
            <li key={"bitem" + index}>
              {item.isActive ? (
                <span className="p-sm">{heading}</span>
              ) : (
                <Link href={item.url}>{heading}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

Breadcrumb.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      isActive: PropTypes.bool,
    })
  ),
};

export default Breadcrumb;
