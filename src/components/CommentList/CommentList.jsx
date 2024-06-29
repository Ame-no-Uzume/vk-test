import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import classes from "./CommentList.module.css"

const CommentList = ({ comments }) => {
  const [showChildren, setShowChildren] = useState(false);

  const toggleChildren = () => {
    setShowChildren(!showChildren);
  };

  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id} className={classes.container}>
            <div >
                <p><strong>{comment.by}</strong>: {comment.text}</p>
                {comment.kids && comment.kids.length > 0 && (
                <button onClick={toggleChildren}>
                    {showChildren ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                )}
            </div>
            <div className={classes.container_1}>
                {showChildren && comment.kids && comment.kids.length > 0 && (
                    <CommentList comments={comment.kids} />
                )}
            </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
