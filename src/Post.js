import React, { forwardRef, useState, useEffect  } from 'react';
import "./Post.css";
import { Avatar } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import { doc,getDoc, onSnapshot, runTransaction, increment, arrayRemove, arrayUnion, collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';import { db } from './firebase';
import { useAuth } from "./AuthContext"
import CommentInput from './CommentInput';
import Comment from './Comment';

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
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const { currentUser } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  // Gestionnaire pour basculer l'affichage des commentaires
  const handleToggleComments = () => {
    setShowComments(!showComments);
    if (!showComments && comments.length === 0) {
      // Charge les commentaires seulement s'ils n'ont pas encore été chargés
      const commentsQuery = query(collection(db, 'tweets', postId, 'comments'), orderBy('createdAt', 'desc'));
      onSnapshot(commentsQuery, (snapshot) => {
        setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    }
  };

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

      const handleCommentSubmit = async (commentContent) => {
        if (currentUser) {
          const userRef = doc(db, 'users', currentUser.uid); // Chemin vers le document de l'utilisateur
          const userDoc = await getDoc(userRef);
          const userName = currentUser.displayName || "Utilisateur anonyme";

          const commentRef = collection(db, 'tweets', postId, 'comments');
          const newComment = {
            content: commentContent,
            author: currentUser.uid,
            authorName: userName, // Stockez le nom d'utilisateur ici
            createdAt: serverTimestamp()
          };
          await addDoc(commentRef, newComment);
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
    <div className='post' ref={ref}>
      <div className='post__avatar'>
        <Avatar src={avatar}></Avatar>
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {displayName}{" "}
              <span className="post__headerSpecial">
                {verified && <VerifiedUserIcon className="post__badge" />} @{username}
              </span>
            </h3>
          </div>
          <div className='post__headerDescription'>
            <p>{text}</p>
          </div>
        </div>
        {image && <img src={image} alt="Post" />}
        <div className='post__footer'>
          <ChatBubbleOutlineIcon fontSize="small" onClick={handleToggleComments} />
          <RepeatIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" onClick={handleLike} />
          <span>{likesCount} likes</span>
          <PublishIcon fontSize="small" />
        </div>
        {showComments && (  
          <div className="post__comments">
            <CommentInput onCommentSubmit={handleCommentSubmit} />
            {comments.map(comment => (
              <Comment key={comment.id} content={comment.content} authorName={comment.authorName} createdAt={comment.createdAt} />            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default Post

const addCommentToTweet = async (tweetId, commentContent, userId) => {
  const commentRef = collection(db, 'tweets', tweetId, 'comments');
  const newComment = {
    content: commentContent,
    author: userId,
    createdAt: serverTimestamp()
  };

  await addDoc(commentRef, newComment);
};
