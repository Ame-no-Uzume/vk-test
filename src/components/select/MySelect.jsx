import React from "react";

const MySelect = ({ sortOrder, onSortChange }) => {
    return (
        <select value={sortOrder} onChange={onSortChange}>
            <option value="topstories">Topstories</option>
            <option value="newstories">Newstories</option>
            <option value="beststories">Beststories</option>
        </select>
    )
};

export default MySelect;
