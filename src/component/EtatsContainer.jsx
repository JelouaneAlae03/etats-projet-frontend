/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react';
import EtatCard from './EtatCard';
import './EtatCard.css';
import './EtatsContainer.css';
import pilotageimg from "../Assets/images/Modules/Pilotage.png";
import advimg from "../Assets/images/Modules/ADV.png";
import crmimg from "../Assets/images/Modules/crm.png";
import stockimg from "../Assets/images/Modules/Stock.png";
import reservationimg from "../Assets/images/Modules/Réservation.png";
import encaissementimg from "../Assets/images/Modules/Encaissement.png";
import clientimg from "../Assets/images/Modules/Client.png";
import recouverementimg from "../Assets/images/Modules/Recouvrement.png";
import opportuniteimg from "../Assets/images/Modules/Opportunité.png";
import suivireservationimg from "../Assets/images/Modules/suivireservation.png";
import gestionimprevusimg from "../Assets/images/Modules/gestionImprevue.png";
import postimg from "../Assets/images/Modules/postconcretisation.png";
import { useSelector , useDispatch } from 'react-redux';
import Loading from './Loading';
import axios from 'axios';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import SuccessNotif from './Functions/SuccessNotif';
import { useNavigate } from 'react-router-dom';

const EtatsContainer = () => {
  const isLoading = useSelector((state)=>state.isLoading);
  const dispatch = useDispatch()
  const [groupedEtats, setGroupedEtats] = useState([]);
  const [filtredEtats,setFiltredEtats] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const hasNotificationBeenShown = localStorage.getItem('notificationShown');
  const [hasShownMessage, setHasShownMessage] = useState(false);

  const getEtats = async () => {
    try {
      dispatch({type: 'LOADING', payload: {value: true}});
      
      const response = await axios.get('http://127.0.0.1:8000/api/etats', {
        withCredentials: true, 
      });
  
      console.log("Response Data:", response.data); 
      
      const data = groupBy(response.data, 'Module');
      console.log("Grouped Data:", data); 
      
      setGroupedEtats(data);
      setFiltredEtats(data);
      
      dispatch({type: 'LOADING', payload: {value: false}});
    } catch (error) {
      console.error("Error Fetching Data:", error.message);
      if (error.response) {
        console.error("Response Status:", error.response.status);
        console.error("Response Data:", error.response.data);
        console.error("Response Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request Data:", error.request);
      } else {
        console.error("Error Message:", error.message);
      }
      if(error.response.data.message){
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    if(hasNotificationBeenShown === 'false'){
      localStorage.setItem('notificationShown', 'true');
      NotificationManager.success(location.state?.successMessage, 'Success', 3000);
    }
  }, [hasNotificationBeenShown]);

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
     
      if (currentValue[key] !== null) {
          const groupKey = currentValue[key];

          if (!result[groupKey]) {
              result[groupKey] = [];
          }

          result[groupKey].push(currentValue);
      }
      return result;
  }, {});
};
  const handleSearch = (search) => {
    const newFilteredData = {};

    if (search !== null) {
      Object.keys(groupedEtats).forEach(key => {
        if (Array.isArray(groupedEtats[key])) {
          newFilteredData[key] = groupedEtats[key].filter(item =>
            Object.values(item).some(value =>
              typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())
            )
          );
        } else {
          newFilteredData[key] = groupedEtats[key];
        }
      });
    } else {
      setFiltredEtats(groupedEtats);
    }

    setFiltredEtats(newFilteredData);
  };

  useEffect(() => {
    getEtats();
  }, []);

  const renderimages = (module) => {
    switch (module) {
      case 'Pilotage':
        return <img src={pilotageimg} alt="pilotage " className='module-icons'/>;
      case 'Tableaux de bord ADV':
        return <img src={advimg} alt="ADV " className='module-icons'/>;
      case 'Tableaux de bord CRM':
        return <img src={crmimg} alt="CRM " className='module-icons'/>;
      case 'Stock':
        return <img src={stockimg} alt="Stock " className='module-icons'/>;
      case 'Réservation':
        return <img src={reservationimg} alt="Reservation " className='module-icons'/>;
      case 'Encaissement':
        return <img src={encaissementimg} alt="Encaissement " className='module-icons'/>;
      case 'Client':
        return <img src={clientimg} alt="Client " className='module-icons'/>;
      case 'Recouvrement':
        return <img src={recouverementimg} alt="Recouvrement " className='module-icons'/>;
      case 'Opportunité':
        return <img src={opportuniteimg} alt="Opportunité " className='module-icons'/>;
      case 'Suivi réservation':
        return <img src={suivireservationimg} alt="Recouvrement " className='module-icons'/>;
      case 'Gestion des imprévus':
        return <img src={gestionimprevusimg} alt="Gestion Des Imprévus " className='module-icons'/>;
      case 'TDB – POST CONCRETISATION':
        return <img src={postimg} alt="POST CONCRETISATION " className='module-icons'/>;
      default:
        return null;
    }
  };

  return (
    <>
    <NotificationContainer />
          <NavBar handleSearch={handleSearch}/>
          

      {
        isLoading ?
          <Loading />
          :
          <div>
          {Object.keys(filtredEtats).map((Module) => {
            const etatsArray = filtredEtats[Module];
            if (etatsArray.length === 0) return null; 
    
            return (
              <div key={Module} className='container'>
                <div className='d-flex'>
                  {renderimages(Module)}
                  <h2 className='h2-moduleName'>{Module}</h2>
                </div>
    
                <div className="box-container">
                  {etatsArray.map((etat) => (
                    <EtatCard key={etat.id} etat={etat} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      }
    </>
  );
};

export default EtatsContainer;
