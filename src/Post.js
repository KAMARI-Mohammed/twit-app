import React, { forwardRef, useState, useEffect  } from 'react';
import "./Post.css";
import { Avatar } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import { doc, updateDoc, arrayUnion, arrayRemove, increment,runTransaction,onSnapshot, collection, addDoc, serverTimestamp    } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from "./AuthContext"
import CommentInput from './CommentInput';

const addCommentToTweet = async (tweetId, commentContent, userId) => {
  const commentRef = collection(db, 'tweets', tweetId, 'comments');
  const newComment = {
    content: commentContent,
    author: userId,
    createdAt: serverTimestamp()
  };

  await addDoc(commentRef, newComment);
};


const Post = forwardRef(({
  displayName,
  username,
  verified,
  text,
  image, 
  avatar,
  postId,
  likedByUsers = [],
  initialLikesCount,
}, ref) => {
  const { currentUser } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (!postId) return;

    const unsubscribe = onSnapshot(doc(db, 'posts', postId), (doc) => {
      const postData = doc.data();
      if (postData) {
        setLiked(postData.likedByUsers?.includes(currentUser?.uid));
        setLikesCount(postData.likesCount || 0);
      }
    });
        // Désabonner de l'écouteur lors du démontage du composant
        return unsubscribe;
      }, [postId, currentUser]);

    const handleCommentSubmit = async (comment) => {
        if (currentUser) {
          await addCommentToTweet(postId, comment, currentUser.uid);
        } else {
          console.error("L'utilisateur doit être connecté pour commenter");
        }
      };
  const handleLike = async () => {
    if (!currentUser || !postId) {
      console.error("Missing currentUser or postId");
      return;
    }

    const userId = currentUser.uid;
    const postRef = doc(db, 'posts', postId);
  
    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(postRef);
      if (!postDoc.exists()) {
        throw "Document does not exist!";
      }
    
      const data = postDoc.data();
      const likedByUsers = data.likedByUsers || [];
      const hasLiked = likedByUsers.includes(userId);
      const updatedLikesCount = hasLiked ? -1 : 1;
    
      transaction.update(postRef, {
        likesCount: increment(updatedLikesCount),
        likedByUsers: hasLiked ? arrayRemove(userId) : arrayUnion(userId),
      });
  
     // setLiked(!hasLiked);
      //setLikesCount(previousLikesCount => previousLikesCount + (hasLiked ? -1 : 1));
    }).catch((error) => {
      console.error("Transaction failed: ", error);
    });
  };

  return (
    <div className='post'ref={ref}>
    <div className='post__avatar'>
      <Avatar src={avatar}></Avatar>
    </div>
    <div className="post__body">
      <div className="post__header">
        <div className="post__headerText">
        <h3>{displayName}{" "} <span className="post__headerSpecial">
        {verified && <VerifiedUserIcon className="post__badge"></VerifiedUserIcon>} @{username}
        </span></h3>
        </div>
        <div className='post__headerDescription'>
          <p> {text} </p>
        </div>
        <img src={image} alt="">
        </img>
        <div className='post__footer'>
        <ChatBubbleOutlineIcon fontSize="small" onClick={handleCommentSubmit}></ChatBubbleOutlineIcon>
        <RepeatIcon fontSize="small"></RepeatIcon>
        <FavoriteBorderIcon fontSize="small" onClick={handleLike}></FavoriteBorderIcon>
        <span>{likesCount} likes</span> {/* Display the likes count here */}
        <PublishIcon fontSize="small"></PublishIcon>
        <div>
      {/* Contenu du tweet et autres éléments */}
      <CommentInput onCommentSubmit={handleCommentSubmit} />
      {/* Autres éléments de l'interface utilisateur */}
    </div>
        </div>
        </div>
        </div>
    </div>
  )
});

export default Post
