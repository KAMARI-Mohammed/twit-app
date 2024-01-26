import React from "react";
import "./Sidebar.css"
import StormIcon from '@mui/icons-material/Storm';import HomeIcon from '@mui/icons-material/Home';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MessageIcon from '@mui/icons-material/Message';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FaceIcon from '@mui/icons-material/Face';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button } from "@mui/material";
import SidebarOption from "./SidebarOption";
import { useAuth } from "./AuthContext"
import {useNavigate } from "react-router-dom"

function Sidebar(){   
    const { logout } = useAuth(); // Utilisez useAuth pour accéder à la fonction logout
    const Navigate = useNavigate();
    const handleLogout = () => {
      logout().then(() => {
        // Gérer la déconnexion réussie, comme rediriger vers la page de connexion
        Navigate("/login")
      }).catch((error) => {
        // Gérer les erreurs de déconnexion
        console.error('Erreur lors de la déconnexion :', error);
      });
    };

    return(
        <div className="sidebar">
            {/* Twitter Icon */}
            <StormIcon className="sidebar__stromIcon"/>

            <SidebarOption active Icon={HomeIcon} text="Home"/>
            <SidebarOption Icon={QueryStatsIcon} text="Explore"/>
            <SidebarOption Icon={NotificationsActiveIcon} text="Notification"/>
            
            <SidebarOption Icon={MessageIcon} text="Messages"/>
            <SidebarOption Icon={FolderSpecialIcon} text="Bookmarks"/>
            <SidebarOption Icon={FormatListBulletedIcon} text="Lists"/>
            
            <SidebarOption Icon={FaceIcon} text="Profile"/>
            <SidebarOption Icon={MoreHorizIcon} text="More"/>
            {/* Button */}
            <Button variant ="outlined" className="sidebar__strom" fullWidth>Tweet</Button>
            <Button variant ="outlined" className="sidebar__strom" fullWidth onClick={handleLogout}>Se deconnecter</Button>
        </div>
    )
}

export default Sidebar