function Search({ onSearchChange }) {
    return (
        <div id="search">
            <label htmlFor="search-input">search</label>
            <input
                id="search-input"
                type="text"
                placeholder="search a name..."
                onChange={(e) => onSearchChange(e.target.value)}
            ></input>
        </div>
    );
}

export default Search;
