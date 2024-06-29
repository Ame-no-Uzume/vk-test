import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentList from "../CommentList/CommentList";
import classes from "./NewsId.module.css"

const NewsId = () => {

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const params = useParams()

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json`)
                const result = await response.json();
                setPost(result);

                if (result.kids) {
                    const commentsData = await fetchComments(result.kids);
                    setComments(commentsData);
                }

            } catch (error) {
                console.log('Ошибка при запросе к API:', error)
            } 
        }
        getPosts();
    }, [params.id])

    const fetchComments = async (kids) => {
        try {
          const commentsData = await Promise.all(
            kids.map(async (id) => {
              const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
              const comment = await response.json();
              if (comment.kids) {
                comment.kids = await fetchComments(comment.kids);
              }
              return comment;
            })
          );
          return commentsData.filter(comment => comment !== null);
        } catch (error) {
          console.error('Ошибка при запросе комментариев:', error);
          return [];
        }
      };

    return (
        <div className={classes.container}>
            <h1>{post.title}</h1>
            <a href={post.url}>Ссылка на новость</a>
            <div>Score: {post.score}</div>
            <div>Автор: {post.by}</div>
            <h2 className={classes.comments}>Коментарии</h2>
            <CommentList comments={comments} />
        </div>
    )
};

export default NewsId;
