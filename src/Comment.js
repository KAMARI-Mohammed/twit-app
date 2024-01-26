import React from 'react';

const Comment = ({ content, authorName, createdAt }) => {
    // Formatez la date comme vous le souhaitez
    const displayDate = createdAt?.toDate().toLocaleString();
  
    return (
      <div className="comment">
        <div className="comment-header">
          <strong>{authorName}</strong> <span>{displayDate}</span>
        </div>
        <p>{content}</p>
      </div>
    );
  };
  

export default Comment;
