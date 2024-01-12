import React from 'react';
import "./Widgets.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import SearchIcon from '@mui/icons-material/Search';

function Widgets() {
  return (
    <div className='widgets'>
     <div className="widgets__input">
      <SearchIcon className="widgets__searchIcon"/>
      <input placeholder="Search Storm" type="text"></input>
     </div>

     <div className="widgets__widgetContainer">
      <h2>What's happening</h2>

      <TwitterTweetEmbed tweetId={"858551177860055040"}/>
      <TwitterTimelineEmbed
          sourceType="profile"
          screenName="cleverqazi"
          options={{ height: 400 }}
        />

        <TwitterShareButton
          url={"https://www.facebook.com/wonderfulls1/"}
          options={{ text: "#reactjs is awesome", via: "kamari_med" }}
        />
     </div>
    </div>
  )
}

export default Widgets
