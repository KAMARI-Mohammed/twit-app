import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';
function Home() {
  return (
    // BEM
    <div className="app">
     <h1></h1>
      
    {/* SideBar */}
    <Sidebar/>
    {/* Feed */}
    <Feed/>

    {/* Widget */} 
    <Widgets/>
    </div>
  );
}

export default Home;
