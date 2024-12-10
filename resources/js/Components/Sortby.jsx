function SortBy({ onSortChange, value }) {
    return (
        <div id="sort-by-wrapper">
            <div>sort by</div>
            <select
                name="sortBy"
                id="sort-by"
                defaultValue={value}
                onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="default">default</option>
                <option value="alphabetical">alphabetical</option>
            </select>
        </div>
    );
}

export default SortBy;
