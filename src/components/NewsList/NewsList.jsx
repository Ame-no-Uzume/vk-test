import React, { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import "../../style/App.css"
import classes from "./NewsList.module.css"
import MySelect from "../select/MySelect";
import { useNavigate } from "react-router-dom";

function NewsList () {
    const [posts, setPost] = useState([]);
    const [sortOrder, setSortOrder] = useState('topstories');
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(15);

    const navigate = useNavigate()
    function transitToPost(id) {
      navigate(`/item/${id}`, { replace: true })
    }

    useEffect(() => {
        async function getPosts(sortOrder) {
            const url = `https://hacker-news.firebaseio.com/v0/${sortOrder}.json`;
            try {
                const response = await fetch(url)
                const responseJson= await response.json()
                const listNews = responseJson.slice(0,100).map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
                    response => response.json()
                ))
                const result = await Promise.all(listNews)
                setPost(result)
            } catch (error) {
                console.log('Ошибка при запросе к API:', error)
            } 
        }
        getPosts(sortOrder);
    }, [sortOrder])

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
      };

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = posts.slice(firstPostIndex, lastPostIndex)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <div className="App">
            <h1>Hacker News</h1>
            <div style={{marginTop: "15px"}}>
                <MySelect
                    sortOrder ={sortOrder}
                    onSortChange={handleSortChange}
                />
            </div>
            <div>
                <ul>
                    {currentPost.map(post => (
                        <li key={post.id} className={classes.post}>
                            <a href="#" onClick={() => transitToPost(post.id)}>{post.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <Pagination 
                postPerPage = {postPerPage}
                totalPosts = {posts.length}
                paginate = {paginate}
            />
        </div>
    )
};

export default NewsList;
