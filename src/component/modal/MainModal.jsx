/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

export default function MainModal(){
    const dispatch = useDispatch();
    const isShow = useSelector(state=>state.isShow);
    const currentEtat = useSelector(state=>state.currentEtat);
    const FiltreData = useSelector((state) => state.dataFiltre);

    const handleCloseModal = (value) => {
        dispatch({type: 'MODAL_SHOW', payload: {value: value}});
    }
    const data = [
        {id: 1, name: "mehdi", options: [{id: "M1", name: "XXX"}, {id: "M2", name: "YYY"}, {id: "M3", name: "ZZZ"}]},
        {id: 2, name: "walid", options: [{id: "W1", name: "XXX"}, {id: "W2", name: "YYY"}, {id: "W3",name: "ZZZ"}]},
    ]
    const getReservations = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/etats/reservations');
          dispatch({type: 'ADD_DATA', payload: {data: response.data}});
          console.log(response.data);
    
        } catch (error) {
          console.error("There was an error fetching the data!", error);
        }
      }
    
    
    useEffect(()=>{
        if(currentEtat === 'Etat des réservations'){
            getReservations();
        }
        
    }, [currentEtat])

    return(
        <>
            <Modal onHide={() => handleCloseModal(false)} dialogClassName="custom-modal-dialog" show={isShow} size='m' className='the-main-modal' animation={true} backdropClassName="custom-backdrop" centered>
                <div className='modal-content custom-modal-content'>
                    <Modal.Header className='header'>
                        <Modal.Title className='main-header-title'>{currentEtat}</Modal.Title>
                        <div className='button-div'>
                            <button className='header-right-button' onClick={() => handleCloseModal(false)}><i className="bi bi-x-lg button-close"></i></button>
                        </div>
                    </Modal.Header>
                    <Modal.Body className='body'>
                        <div className='modal-body-content'>
                            <label htmlFor='select-societe'>Societe</label>
                            <select id='select-societe' className='form-select filtrage-select'>
                            {FiltreData.map((data, index) => (
                                        <option key={index} value={data.Societe}>{data.Societe}</option>
                            ))}
                            </select>

                            <label htmlFor='select-programme'>Programme</label>
                            <select id='select-programme' className='form-select filtrage-select'>
                            {FiltreData.map((data, index) => (
                                        <option key={index} value={data.Projet}>{data.Projet}</option>
                            ))}
                            </select>

                            <label htmlFor='select-tranche'>Tranche</label>
                            <select id='select-tranche' className='form-select filtrage-select'>
                            {FiltreData.map((data, index) => (
                                        <option key={index} value={data.Tranche}>{data.Tranche}</option>
                            ))}
                            </select>

                            <label htmlFor='select-groupement'>Groupement</label>
                            <select id='select-groupement' className='form-select filtrage-select'>
                            {FiltreData.map((data, index) => (
                                        <option key={index} value={data.GH}>{data.GH}</option>
                            ))}
                            </select>

                            <label htmlFor='select-immeuble'>Immeuble</label>
                            <select id='select-immeuble' className='form-select filtrage-select'>
                            {FiltreData.map((data, index) => (
                                        <option key={index} value={data.Immeuble}>{data.Immeuble}</option>
                            ))}
                            </select>

                            <label htmlFor='select-etage'>Etage</label>
                            <select id='select-etage' className='form-select filtrage-select'>
                            {FiltreData.map((data, index) => (
                                        <option key={index} value={data.Etage}>{data.Etage}</option>
                            ))}
                            </select>

                            <label htmlFor='select-nature'>Nature de Bien</label>
                            <select id='select-nature' className='form-select filtrage-select'>
                            {FiltreData.map((data, index) => (
                                        <option key={index} value={data.Nature}>{data.Nature}</option>
                            ))}
                            </select>

                            <label htmlFor='select-standing'>Standing</label>
                            <select id='select-standing' className='form-select filtrage-select'>
                            {FiltreData.map((data, index) => (
                                        <option key={index} value={data.Stading}>{data.Standing}</option>
                            ))}
                            </select>

                            {currentEtat === 'Etat des réservations' 
                            ?
                                <>
                                <label htmlFor='select-commercial'>Commercial</label>
                                <select id='select-commercial' className='form-select filtrage-select'>
                                {FiltreData.map((data, index) => (
                                            <option key={index} value={data.Commercial}>{data.Commercial}</option>
                                ))}
                                </select>

                                <label htmlFor='select-ville'>Ville</label>
                                <select id='select-ville' className='form-select filtrage-select'>
                                {FiltreData.map((data, index) => (
                                            <option key={index} value={data.Ville_Adresse}>{data.Ville_Adresse}</option>
                                ))}
                                </select>
                                </>
                            :
                            null
                            }
                            <div className='btn-parent'>
                                <button className='modal-submit-btn'>Aperçu</button>
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    )
}