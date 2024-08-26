import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from './SideBar';
import DbConfig from './DbConfig';
import Droits from './Droits';
import './Settings.css';

export const Settings = () => {
    const [activeMenuItem, setActiveMenuItem] = useState('profile');

  return (
    <div className="parent-settings">
        <div className="child-sidebar">
            <Sidebar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem}/>
        </div>
        <div className="child-content">
            {activeMenuItem === 'database' && <DbConfig />}
            {activeMenuItem === 'roles' && <Droits />}
        </div>
    </div>
  )
}
