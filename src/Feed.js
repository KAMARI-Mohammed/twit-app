import React , {useState,useEffect} from 'react';
import "./Feed.css";
import TweetBox from './TweetBox';
import Post from './Post';
import { db } from './firebase';
import FlipMove from "react-flip-move";
import { collection, onSnapshot, query, orderBy  } from 'firebase/firestore';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  
    // S'abonner aux mises à jour de la collection de posts
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    }, (error) => {
      // Afficher les erreurs de requête dans la console
      console.error("Erreur lors de l'écoute des mises à jour des posts: ", error);
    });
  
    // Retourner une fonction pour se désabonner de l'écouteur
    return () => unsubscribe();
  }, []);
  

  return (
    <div className='feed'>
      {/* Header */}
      <div className='feed__header'></div>

      {/* TweetBox*/}
      <TweetBox/>

      {/* Post */}
      <FlipMove>
      {posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
            initialLikesCount={post.likesCount}
          />
        ))}
      </FlipMove>
    </div>
  )
}

export default Feed
{/* Header */}

{/* */}