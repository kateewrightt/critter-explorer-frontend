import React from "react";
import { FaTimes } from "react-icons/fa";

const InfoBar = ({
  search,
  formattedDateTime,
  hemisphere,
  clearSearch,
}) => {
  if (!formattedDateTime) {
    return null;
  }

  return (
    <div className="info-bar" role="region" aria-label="City Information">
      <div>
        <strong>{search.label}</strong>
      </div>
      <div>
        <strong>{formattedDateTime}</strong>
      </div>
      <div>
        <strong>{hemisphere}</strong>
      </div>
      <FaTimes
        onClick={clearSearch}
        className="clear-icon"
        tabIndex="0"
        role="button"
        aria-label="Clear search"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            clearSearch();
            e.preventDefault();
          }
        }}
      />
    </div>
  );
};

export default InfoBar;