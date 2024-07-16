import React from 'react'
import './EtatCard.css';
import MainModal from './modal/MainModal';
import Rapportimg from '../Assets/images/Etats/Rapport.png'
const EtatCard = ({etat,isShow,setIsShow,handleShow,key}) => {
  return (
    <div className="box">
    <img src={Rapportimg} alt="rapport" className='rapport-image'/>
    <h3>{etat.Nom_Etat}</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
    <button onClick={()=>{handleShow(true)}} className="btn">Select</button>
    <MainModal  isShow={isShow} setIsShow={setIsShow} handleShow={handleShow}/>
</div>
  )
}

export default EtatCard