//***** Search box *****//
// Description: Site search box for navigation component (used in Header)
// Usage: Main navigation menu
//****************//
"use client";
import React, { useCallback, useState } from "react";
import { getAutoSuggestResult } from "../../../../lib/methods";
import { _debounce, getSpecificLabel } from "../../../../lib/Common";
import configuration from "../../../../constants/configuration";
import SuggestionBox from "./SuggestionBox";
import { useSelector } from "react-redux";
import { selectPLPLabel } from "../../../../store/slices/labelsSlice";

const SearchBox = ({ }) => {
  const [showResult, setShowResult] = useState(false);
  const [query, setQuery] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const PLPLabels = useSelector(selectPLPLabel);

  const handleSearch = _debounce((event) => {
    const keyword = event.target.value || "";
    setQuery(keyword);
    handleQuerySearch(keyword);
  }, 200);

  const handleQuerySearch = useCallback(
    async (keyword) => {
      if (String(keyword).length >= configuration.minimumQueryLength) {
        const { response, status } = await getAutoSuggestResult(keyword);
        if (status === 200) {
          if (response.suggestions) {
            setSuggestions(response.suggestions);
            setProducts(response.products);
          } else {
            setSuggestions([]);
            setProducts([]);
          }
          setShowResult(true);
        }
      } else {
        setShowResult(false);
      }
    },
    [query]
  );

  const handleCloseResultBox = () => {
    setQuery(null);
    setShowResult(false);
  };

  return (
    <>
      <div className={`search-box ${showResult && "active"}`}>
        <input
          type="text"
          className="form-control search-field"
          autoComplete="off"
          aria-label={getSpecificLabel(
            PLPLabels,
            "type_to_search",
            "Type to search"
          )}
          placeholder={getSpecificLabel(PLPLabels, "search", "Search")}
          defaultValue={query}
          onKeyUp={handleSearch}
        />
      </div>
      {showResult && (
        <>
          <div className="quick-search">
            {products.length > 0 ? (
              <SuggestionBox
                products={products}
                suggestions={suggestions}
                handleCloseResultBox={handleCloseResultBox}
                query={query}
                viewAllLabel={getSpecificLabel(
                  PLPLabels,
                  "view_all",
                  "View All"
                )}
                topSuggestionLabel={getSpecificLabel(
                  PLPLabels,
                  "top_suggestion",
                  "TOP SUGGESTIONS"
                )}
              />
            ) : (
              <div className="model no-data">
                <button
                  type="button"
                  className="btn closes"
                  onClick={handleCloseResultBox}
                ></button>
                <p>
                  {getSpecificLabel(
                    PLPLabels,
                    "no_records_exists",
                    "No records exists"
                  )}
                </p>
              </div>
            )}
          </div>
          <div className="overlay"></div>
        </>
      )}
    </>
  );
};

export default SearchBox;
