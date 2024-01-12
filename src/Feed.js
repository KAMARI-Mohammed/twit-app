import React , {useState,useEffect} from 'react';
import "./Feed.css";
import TweetBox from './TweetBox';
import Post from './Post';
import { db, auth } from './firebase';
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(snapshot.docs.map((doc) => doc.data()))
    );
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
            key={post.text}
            displayName={post.displayName}
            username={post.username}
            verifed={post.verifed}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
          />
        ))}
      </FlipMove>
    </div>
  )
}

export default Feed
{/* Header */}

{/* */}