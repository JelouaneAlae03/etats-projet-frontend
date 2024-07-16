import React, { useEffect } from 'react';
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


const EtatsContainer = ({ filtredEtats, getReservations, getEncaissements }) => {
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
  const determineAction = (etat) => {
    switch (etat.Nom_Etat) {
        case 'Etat des réservations':
            return getReservations;
        case 'Etat des encaissements':
            return getEncaissements;
        default:
            return null;
    }
};
useEffect(()=> {
  console.log('Filtered Etats: ', filtredEtats);
}, [filtredEtats]);
  return (
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
  );
};

export default EtatsContainer;
