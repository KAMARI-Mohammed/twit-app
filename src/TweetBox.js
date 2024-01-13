import React, { useState } from 'react';
import "./TweetBox.css";
import { Avatar,Button } from '@mui/material';
import { db, auth } from './firebase';
import { useAuth } from "./AuthContext"


function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const { currentUser, logout } = useAuth()


  const sendTweet = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      displayName: currentUser.email,
      username: currentUser.email,
      verified: true,
      text: tweetMessage,
      image: tweetImage,
      avatar:
        "",
      likesCount:0,
      likeByUsers:[],
    });

    setTweetMessage("");
    setTweetImage("");
  };
return  <div className='tweetBox'>
    <form>
        <div className='tweetBox__input'>
        <Avatar src=''></Avatar>
        <input 
        onChange={e=> setTweetMessage(e.target.value)}
        value={tweetMessage} placeholder="What is happening ?!"></input>
        </div>
        <input 
        onChange={e => setTweetImage(e.target.value)}
        className="tweetBox__URL" 
        placeholder="insert URL"></input>
       
        <Button onClick={sendTweet} type='submit' className="tweetBox__button">Tweet</Button>
    </form>
  </div>
  
}

export default TweetBox
