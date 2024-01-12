import React,{forwardRef} from 'react';
import "./Post.css";
import { Avatar } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
const  Post= forwardRef(({
    displayName,
    username,
    verifed,
    text,
    image,
    avatar
},ref)=> {
  return (
    <div className='post'ref={ref}>
    <div className='post__avatar'>
      <Avatar src={avatar}></Avatar>
    </div>
    <div className="post__body">
      <div className="post__header">
        <div className="post__headerText">
        <h3>{displayName}{" "} <span className="post__headerSpecial">
        {verifed && <VerifiedUserIcon className="post__badge"></VerifiedUserIcon>} @{username}
        </span></h3>
        </div>
        <div className='post__headerDescription'>
          <p> {text} </p>
        </div>
        <img src={image} alt="">
        </img>
        <div className='post__footer'>
        <ChatBubbleOutlineIcon fontSize="small"></ChatBubbleOutlineIcon>
        <RepeatIcon fontSize="small"></RepeatIcon>
        <FavoriteBorderIcon fontSize="small"></FavoriteBorderIcon>
        <PublishIcon fontSize="small"></PublishIcon>
        </div>
        </div>
        </div>
    </div>
  )
});

export default Post
