import React from "react";
import classes from "../pagination/Pagination.module.css"

const Pagination = ({ postPerPage, totalPosts, paginate}) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <div className={classes.pagination}>
            {pageNumbers.map(number => (
                <span key={number} className={classes.number}>
                    <a href="#" onClick={() => paginate(number)}>{number}</a>
                </span>
            ))}
        </div>
    )
};

export default Pagination;
