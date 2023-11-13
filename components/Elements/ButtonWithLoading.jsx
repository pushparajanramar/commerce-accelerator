import React from "react";

function ButtonWithLoading({ label = "Loading..." }) {
  return (
    <button
      disabled=""
      type="button"
      className="tm-button primary-outlined"
    >
      <i className="tm-loading-icon"></i>
      &nbsp;{label}
    </button>
  );
}

export default ButtonWithLoading;
