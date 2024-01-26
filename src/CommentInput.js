import React, { useState } from 'react';
import "./CommentInput.css";

const CommentInput = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommentSubmit(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-input-container">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Ajouter un commentaire..."
        className="comment-input-textarea"
      />
      <button type="submit" className="comment-input-button">
        Commenter
      </button>
    </form>
  );
};


export default CommentInput;
