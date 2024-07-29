/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React ,{useEffect, useState}from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import GCLogo from '../Assets/images/GC-full-logo.png';
import userLogo from '../Assets/images/user.png'
import './NavBar.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ExcelExportSVG from '../Assets/svg/excelExportSVG';
import exportToExcel from './Exportation/Excel'; 
import exportToPDF from './Exportation/Pdf';
import { useDispatch, useSelector } from 'react-redux';
import { Export } from '@phosphor-icons/react';


const NavBar = ({handleSearch}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [issOpen, setIssOpen] = useState(false);
  const location = useLocation();
  const searchTerm = useSelector((state)=> state.searchTerm);
  const filteredData = useSelector((state) => state.filteredData);
  const columns = useSelector((state) => state.columns);
  const visibleColumns = useSelector((state) => state.visibleColumns);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDroppdown = () => {
    setIssOpen(!issOpen);
  };
  const handleExportToExcel = () => {
    exportToExcel(filteredData, columns, visibleColumns);
};

const handleExportToPDF = () => {
    exportToPDF(filteredData, columns, visibleColumns);
};

  return (
    <>
       {location.pathname !== '/login' && (
  <nav className="navbar navbar-light nv-bar">
    <Link to='/'><img src={GCLogo} alt="Gecimmo logo" className='GC-logo'/></Link>
    <div className="d-flex">
      {location.pathname === '/' && (
          <input className="form-control mr-2 flex-grow-1" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{handleSearch(e.target.value)}}/>
      )}

      {location.pathname === '/datatable' && (
        <div className='dt-nav-container'>
            <input
              type="text"
              placeholder="Search..."
              className='form-control mb-3'
              value={searchTerm}
              onChange={(e) => dispatch({type: 'CHANGE_SEARCH_TERM', payload: {value: e.target.value}})}
            />
            <div className="datatable-controls">
                    <button type="button" className="custom-dropdown-toggle2" onClick={toggleDroppdown}>
                      <Export size={32} />
                      Export
                    </button>
                    {issOpen && (
                      <div className="custom-dropdown-menu2">
                        <a className="custom-dropdown-item" onClick={handleExportToExcel}>Export to Excel</a>
                        <div className="custom-dropdown-divider"></div>
                        <a className="custom-dropdown-item" onClick={handleExportToPDF}>Export to PDF</a>
                      </div>
                    )}
                </div>
        </div>
      )}
      

    { /* <button className="btn btn-outline-primary" type="submit">Search</button> */}
      <div className="custom-btn-group">
        <button
          type="button"
          className="custom-dropdown-toggle"
          onClick={toggleDropdown}
        >
        <img src={userLogo} alt="user" className='user-logo'/>
      </button>
      {isOpen && (
        <div className="custom-dropdown-menu">
          <a className="custom-dropdown-item" href="#">Liste d'utilisateur</a>
          <a className="custom-dropdown-item" href="#">Action</a>
          <div className="custom-dropdown-divider"></div>
          <a className="custom-dropdown-item" href="#">Déconnexion</a>
        </div>
      )}
    </div>
    </div>
  </nav>)}
    </>
   
    
  )
}

export default NavBar