import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  const search = () => {
    onSearch(term);
  };

  return (
    <div>
      <div className="container w-75 searchBar">
        <input
          type="text"
          className="form-control"
          placeholder="City..."
          aria-label="City..."
          aria-describedby="button-addon2"
          onChange={handleTermChange}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={search}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
