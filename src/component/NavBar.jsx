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
import useExportToExcel from './Exportation/Excel';
import { useDispatch, useSelector } from 'react-redux';


const NavBar = ({handleSearch}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentEtat = useSelector((state)=>state.currentEtat);
  const exportToExcel = useExportToExcel();
  const searchTerm = useSelector((state)=> state.searchTerm);
  const processedData = useSelector((state)=> state.processedData);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filterData = (data, searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    switch(currentEtat){
      case "Etat des encaissements":
        return data.filter(item =>
          (item.Prix_Vente && item.Prix_Vente.toString().toLowerCase().includes(lowercasedTerm)) ||
          (item.Bien && item.Bien.toLowerCase().includes(lowercasedTerm)) ||
          (item.client && item.client.toLowerCase().includes(lowercasedTerm)) ||
          (item.date_encaissement && item.date_encaissement.toLowerCase().includes(lowercasedTerm)) ||
          (item.Num_Recu && item.Num_Recu.toLowerCase().includes(lowercasedTerm)) ||
          (item.Nature && item.Nature.toLowerCase().includes(lowercasedTerm)) ||
          (item.Lib_Banque && item.Lib_Banque.toLowerCase().includes(lowercasedTerm)) ||
          (item.Lib_Agence && item.Lib_Agence.toLowerCase().includes(lowercasedTerm)) ||
          (item.Lib_Ville && item.Lib_Ville.toLowerCase().includes(lowercasedTerm)) ||
          (item.Date_Systeme && item.Date_Systeme.toLowerCase().includes(lowercasedTerm)) ||
          (item.montant && item.montant.toString().toLowerCase().includes(lowercasedTerm)) ||
          (item.difference && item.difference.toString().toLowerCase().includes(lowercasedTerm)) ||
          (item.percentage && item.percentage.toString().toLowerCase().includes(lowercasedTerm))
        );
      case "Etat des réservations":
        return data.filter(item =>
          (item.Prix_Vente && item.Prix_Vente.toString().toLowerCase().includes(lowercasedTerm)) ||
          (item.Bien && item.Bien.toLowerCase().includes(lowercasedTerm)) ||
          (item.client && item.client.toLowerCase().includes(lowercasedTerm)) ||
          (item.num_dossier && item.num_dossier.toLowerCase().includes(lowercasedTerm)) ||
          (item.Standing && item.Standing.toLowerCase().includes(lowercasedTerm)) ||
          (item.Nature && item.Nature.toLowerCase().includes(lowercasedTerm)) ||
          (item.Etage && item.Etage.toLowerCase().includes(lowercasedTerm)) ||
          (item.date_reservation && item.date_reservation.toLowerCase().includes(lowercasedTerm)) ||
          (item.Date_concretisation && item.Date_concretisation.toLowerCase().includes(lowercasedTerm)) ||
          (item.Date_Validation && item.Date_Validation.toLowerCase().includes(lowercasedTerm)) ||
          (item.total && item.total.toString().toLowerCase().includes(lowercasedTerm)) ||
          (item.Reliquat && item.Reliquat.toString().toLowerCase().includes(lowercasedTerm)) ||
          (item.Commercial && item.Commercial.toString().toLowerCase().includes(lowercasedTerm))
        );
      case "Etat de stock":
        return data.filter(item =>
          (item.prix_Vente && item.prix_Vente.toString().toLowerCase().includes(lowercasedTerm)) ||
          (item.Bien && item.Bien.toLowerCase().includes(lowercasedTerm)) ||
          (item.etat && item.etat.toLowerCase().includes(lowercasedTerm)) ||
          (item.Standing && item.Standing.toLowerCase().includes(lowercasedTerm)) ||
          (item.Nature && item.Nature.toLowerCase().includes(lowercasedTerm)) ||
          (item.Etage && item.Etage.toLowerCase().includes(lowercasedTerm))   )
};
}

  useEffect(() => {
    if (searchTerm) {
      const filteredData = filterData(processedData, searchTerm);
      dispatch({ type: 'ADD_FILTERED_DATA', payload: { value: filteredData } });
    } else {
      dispatch({ type: 'ADD_FILTERED_DATA', payload: { value: processedData } });
    }
}, [searchTerm, processedData]);

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
                placeholder="Rechercher..."
                className='form-control mr-2 flex-grow-1'
                value={searchTerm}
                onChange={(e) => dispatch({type: 'CHANGE_SEARCH_TERM', payload: {value: e.target.value}})}
            />
            <div>
              <button class="container-btn-file" onClick={exportToExcel}>
              <ExcelExportSVG />
              Export
              </button>
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