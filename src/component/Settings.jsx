import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from './SideBar';
import DbConfig from './DbConfig';
export const Settings = () => {
    const [activeMenuItem, setActiveMenuItem] = useState('profile');

  return (
    <>
        <div>
            <Sidebar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem}/>
        </div>
        <div>
            {activeMenuItem === 'database' && <DbConfig />}
        </div>
    </>
  )
}
