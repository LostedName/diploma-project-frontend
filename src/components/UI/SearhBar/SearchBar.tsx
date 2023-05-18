import React from 'react';
import './searchBar.scss';

const SearchBar: React.FC = () => {
    return (
    <div className="searchbar">
        <img src="/assets/search.png" alt="lens"/>
        <input type="text" placeholder="Search..." />
    </div>
    );
}

export default SearchBar;