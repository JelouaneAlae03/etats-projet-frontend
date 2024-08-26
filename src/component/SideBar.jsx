import React from 'react';
import { FaUser, FaCog, FaLock, FaSignOutAlt , FaDatabase , FaUserShield } from 'react-icons/fa';

const Sidebar = ({activeMenuItem,setActiveMenuItem}) => {

  const menuItems = [
    { id: 'profile', name: 'Profile', icon: <FaUser /> },
    { id: 'account', name: 'Account Settings', icon: <FaCog /> },
    { id: 'privacy', name: 'Privacy', icon: <FaLock /> },
    { id: 'database', name: 'Database Settings', icon: <FaDatabase /> },
    { id: 'roles', name: 'Roles & Rights', icon: <FaUserShield /> }, 
    { id: 'logout', name: 'Logout', icon: <FaSignOutAlt /> }
  ];

  const handleMenuClick = (id) => {
    setActiveMenuItem(id);
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Configuration</h2>
      <ul style={styles.menu}>
        {menuItems.map((item) => (
          <li
            key={item.id}
            style={{
              ...styles.menuItem,
              backgroundColor: activeMenuItem === item.id ? '#001D3D' : 'transparent',
              color: activeMenuItem === item.id ? '#fff' : '#333',
            }}
            onClick={() => handleMenuClick(item.id)}
          >
            <span style={styles.icon}>{item.icon}</span>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
    sidebar: {
      width: '250px',
      height: 'calc(100vh - 80px)', 
      backgroundColor: '#f8f9fa',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      left: '0',
      top: '80px', 
      zIndex: '1', 
      fontSize: '14px',
    },
    title: {
      marginBottom: '30px',
      fontSize: '20px',
      color: '#333',
    },
    menu: {
      listStyle: 'none',
      padding: '0',
    },
    menuItem: {
      padding: '15px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      borderRadius: '4px',
      marginBottom: '10px',
      transition: 'background-color 0.3s, color 0.3s',
    },
    icon: {
      marginRight: '10px',
    },
  };
  


export default Sidebar;
