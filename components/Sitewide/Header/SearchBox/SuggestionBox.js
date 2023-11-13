import React from "react";
import ProductList from "./ProductList/ProductList";
import SuggestionList from "./Suggestions/SuggestionList";
import route from "../../../../constants/route";
import PropTypes from "prop-types";
import Link from "next/link";

function SuggestionBox({
  products,
  suggestions,
  handleCloseResultBox,
  query,
  viewAllLabel,
  topSuggestionLabel,
}) {
  return (
    <div className="modal">
      <div className="modal-body">
        <div className="top-suggestions">
          <h5 className="title">{topSuggestionLabel}</h5>
          <div className="suggestions-list" onClick={handleCloseResultBox}>
            <ProductList products={products} />
            <Link
              href={route.searchPage + "?q=" + encodeURIComponent(query)}
              role="button"
              className="p-md"
            >
              {viewAllLabel}
            </Link>
          </div>
        </div>
        <div className="list-suggestions">
          <button
            type="button"
            className="btn closes"
            onClick={handleCloseResultBox}
          ></button>
          <div className="" onClick={handleCloseResultBox}>
            <SuggestionList list={suggestions} query={query} />
          </div>
        </div>
      </div>
    </div>
  );
}

SuggestionBox.prototype = {
  query: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      sale_price: PropTypes.number,
      price: PropTypes.number,
      url: PropTypes.string,
      pid: PropTypes.string,
      title: PropTypes.string,
      thumb_image: PropTypes.string,
    })
  ),
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      q: PropTypes.string,
    })
  ),
  handleCloseResultBox: PropTypes.func,
};

export default SuggestionBox;
