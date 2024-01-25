import React , {useState,useEffect} from 'react';
import "./Feed.css";
import TweetBox from './TweetBox';
import Post from './Post';
import { db } from './firebase';
import FlipMove from "react-flip-move";
import { collection, getDocs } from 'firebase/firestore';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // Récupère les documents de la collection 'posts' de Firestore
      const querySnapshot = await getDocs(collection(db, 'posts'));
      // Mappe chaque document en un objet avec un id et le reste des données du document
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // L'ID du document Firebase
        ...doc.data() // Les données du document
      }));
      setPosts(postsData); // Met à jour l'état avec les données des posts récupérés
    };

    fetchPosts();
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