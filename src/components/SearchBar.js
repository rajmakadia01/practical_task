import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search for movies..."
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;
