import React from 'react'
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { FunnelSimple, X } from '@phosphor-icons/react';
import axios from "axios";
import Loading from "../Loading";
import './ModalAffectation.css';
const ModalAffectation = ({isShow, setIsShow,fltrRights,Code_Utilisateur}) => {
    const [selectedRights, setSelectedRights] = useState([]);

    const handleCheckboxChange = (item, isChecked) => {
        if (isChecked) {
            if (Code_Utilisateur){
                setSelectedRights(prevState => [
                    ...prevState,
                    { Code_Droit: item.Cle, Code_Formulaire: item.Cle_formulaire, Code_Utilisateur: Code_Utilisateur }
                ]);  
            }

        } else {
            // Remove the selected item from the array
            setSelectedRights(prevState =>
                prevState.filter(right => 
                    right.Code_Droit !== item.Cle || right.Code_Formulaire !== item.Cle_formulaire
                )
            );
        }
    };
    
      useEffect(()=>{
        console.log(selectedRights);
      },[selectedRights])
      useEffect(()=>{
        if(!isShow){
            setSelectedRights([])
        }
    },[isShow])
    const AddRightsToUser = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/affect/addrightstouser', {
            rights : selectedRights
          }, {
            withCredentials: true,
          });
          console.log(response.data.message);
          window.location.reload();
        } catch (err) {
          console.error(err);
        }
      };


  return (
    <>
                <Modal dialogClassName="custom-modal-dialog" show={isShow} size='lg' className='the-main-modal' animation={true} backdropClassName="custom-backdrop" centered>
                <div className='modal-content custom-modal-content'>
                    <Modal.Header className='header'>
                        <div className='upper-header'>
                            <div>
                                <div className='upper-header-left'>
                                    <FunnelSimple size={32} weight="bold" />
                                </div>
                                <div className='bottom-header'>
                                    <Modal.Title className='main-header-title'>Ajouter Un Droit</Modal.Title>
                                </div>
                            </div>
                            <div className='button-div'>
                                <button className='header-right-button' onClick={() => setIsShow(false)}><X size={30} weight="bold" /></button>
                            </div>
                        </div>
                    </Modal.Header>
                    
                    <Modal.Body className='body'>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Cle Droit</th>
                                        <th>Nom Droit</th>
                                        <th>Cle Formulaire</th>
                                        <th>Nom Formulaire</th>
                                    </tr>
                                </thead>
                                <tbody className='tbody-affectattionModal'>
                                    {fltrRights.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='td-AM'>
                                                    <input type="checkbox" name="check" 
                                                    value={`${item.Cle}-${item.Cle_formulaire}`}
                                                    onChange={(e) => handleCheckboxChange(item, e.target.checked)}/>
                                                </td>
                                                <td className='td-AM'>
                                                    {item.Cle}
                                                </td>
                                                <td className='td-AM'>
                                                    {item.Droit}
                                                </td>
                                                <td className='td-AM'>
                                                    {item.Cle_formulaire}
                                                </td>
                                                <td className='td-AM'>
                                                    {item.Formulaire}
                                                </td>
                                            </tr>
                                        )})
                                    }
                                </tbody>


                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            <button className='btn btn-primary' disabled={selectedRights.length === 0} onClick={()=>{AddRightsToUser()}}>ajouter</button>
                        </div>
                    </Modal.Footer>
                </div>
            </Modal>
    </>
  )
}

export default ModalAffectation