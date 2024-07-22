import React from 'react'
import './EtatCard.css';
import Rapportimg from '../Assets/images/Etats/Rapport.png'
import { useDispatch } from 'react-redux';
import axios from 'axios';
const EtatCard = ({etat, key}) => {
  const dispatch = useDispatch();
  const handleShowModal = (object) => {
    dispatch({type: 'MODAL_SHOW', payload: {show: object.value}});
    dispatch({type: 'CURRENT_ETAT', payload: {current_etat: object.etat}});
  }
  
  return (
    <div className="boxe" key={key}>
      <img src={Rapportimg} alt="rapport" className='rapport-imagesa'/>
      <h3>{etat.Nom_Etat}</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
      <button onClick={()=>{handleShowModal({value: true, etat: etat.Nom_Etat})}} className="btn">Select</button>
    </div>
  )
}

export default EtatCard