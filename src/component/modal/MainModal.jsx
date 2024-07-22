/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import Reservation from './Reservation/Reservation';
import Encaissement from './Encaissement/Encaissement';
import Stock from './Stock/Stock';

export default function MainModal(){
    const dispatch = useDispatch();
    const isShow = useSelector(state=>state.isShow);
    const currentEtat = useSelector(state=>state.currentEtat);
    const data = useSelector((state) => state.data);
    const selectedOptions = useSelector((state) => state.selectedOptions);

    const distinctValues = useSelector((state) => state.distinctValues);
    const isLoading = useSelector((state) => state.isLoading);

    /* ----------------- HANDLE FUNCTIONS ----------------------------- */

    const handleCloseModal = (value) => {
        dispatch({type: 'MODAL_SHOW', payload: {value: value}});
        dispatch({type: 'EMPTY_SELECTED'});
    }

    const handleSelectChange = (event, selectName) => {
        const value = event.target.value;
        dispatch({type: 'ADD_SELECTED', payload: {key: selectName, value: value}});
    };


    return(
        <>
            <Modal onHide={() => handleCloseModal(false)} dialogClassName="custom-modal-dialog" show={isShow} size='lg' className='the-main-modal' animation={true} backdropClassName="custom-backdrop" centered>
                <div className='modal-content custom-modal-content'>
                    <Modal.Header className='header'>
                        <Modal.Title className='main-header-title'>{currentEtat}</Modal.Title>
                        <div className='button-div'>
                            <button className='header-right-button' onClick={() => handleCloseModal(false)}><i className="bi bi-x-lg button-close"></i></button>
                        </div>
                    </Modal.Header>
                    {isLoading ? 
                        <Loading />
                    :
                        <Modal.Body className='body'>
                            <div className='modal-body-content-flex'>
                                <div className='select-container'>
                                    <label htmlFor='select-societe'>Societe</label>
                                    <select id='select-societe' className='form-select filtrage-select'             
                                        onChange={event => handleSelectChange(event, "Societe")}
                                        
                                    >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                            {distinctValues.Societe && distinctValues.Societe.length > 0 ? (
                                                distinctValues.Societe.map((data, index) => (
                                                <option key={index} value={data.Societe}>{data.Societe}</option>
                                                ))
                                            ) : (
                                                <option>Aucune donnée disponible</option>
                                            )}
                                    </select>
                                </div>

                                <div className='select-container'>
                                    <label htmlFor='select-programme'>Programme</label>
                                    <select id='select-programme' className='form-select filtrage-select'
                                        onChange={event => handleSelectChange(event, "Projet")}
                                    >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                    {distinctValues.Projet && distinctValues.Projet.length > 0 ? (
                                        distinctValues.Projet.map((data, index) => (
                                        <option key={index} value={data.Projet}>{data.Projet}</option>
                                        ))
                                    ) : (
                                        <option>Aucune donnée disponible</option>
                                    )}
                                    </select>
                                </div>
                                <div className='select-container'>
                                    <label htmlFor='select-tranche'>Tranche</label>
                                        <select id='select-tranche' className='form-select filtrage-select'
                                            onChange={event => handleSelectChange(event, "Tranche")}

                                        >
                                            <option value=""  hidden>
                                                choisir une option
                                            </option>
                                            <option value=""  >
                                                
                                            </option>
                                        {distinctValues.Tranche && distinctValues.Tranche.length > 0 ? (
                                            distinctValues.Tranche.map((data, index) => (
                                            <option key={index} value={data.Tranche}>{data.Tranche}</option>
                                            ))
                                        ) : (
                                            <option>Aucune donnée disponible</option>
                                        )}
                                        </select>
                                </div>
                                                            
                                <div className='select-container'>

            
                                    <label htmlFor='select-groupement'>Groupement</label>
                                    <select id='select-groupement' className='form-select filtrage-select'
                                        onChange={event => handleSelectChange(event, "GH")}

                                    >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                    {distinctValues.GH && distinctValues.GH.length > 0 ? (
                                        distinctValues.GH.map((data, index) => (
                                        <option key={index} value={data.GH}>{data.GH}</option>
                                        ))
                                    ) : (
                                        <option>Aucune donnée disponible</option>
                                    )}
                                    </select>

                                </div>
                                <div className='select-container'>
                                    <label htmlFor='select-immeuble'>Immeuble</label>
                                    <select id='select-immeuble' className='form-select filtrage-select'
                                        onChange={event => handleSelectChange(event, "Immeuble")}

                                    >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                        {distinctValues.Immeuble && distinctValues.Immeuble.length > 0 ? (
                                            distinctValues.Immeuble.map((data, index) => (
                                            <option key={index} value={data.Immeuble}>{data.Immeuble}</option>
                                            ))
                                        ) : (
                                            <option>Aucune donnée disponible</option>
                                        )}
                                    </select>
                                </div>
                                
                                <div className='select-container'>
                                    <label htmlFor='select-etage'>Etage</label>
                                    <select id='select-etage' className='form-select filtrage-select'
                                        onChange={event => handleSelectChange(event, "Etage")}

                                    >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                        {distinctValues.Etage && distinctValues.Etage.length > 0 ? (
                                            distinctValues.Etage.map((data, index) => (
                                            <option key={index} value={data.Etage}>{data.Etage}</option>
                                            ))
                                        ) : (
                                            <option>Aucune donnée disponible</option>
                                        )}
                                    </select>

                                </div>
                                <div className='select-container'>
                                    <label htmlFor='select-nature'>Nature de Bien</label>
                                    <select id='select-nature' className='form-select filtrage-select'
                                        onChange={event => handleSelectChange(event, "Nature")}

                                    >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                        {distinctValues.Nature && distinctValues.Nature.length > 0 ? (
                                            distinctValues.Nature.map((data, index) => (
                                            <option key={index} value={data.Nature}>{data.Nature}</option>
                                            ))
                                        ) : (
                                            <option>Aucune donnée disponible</option>
                                        )}
                                    </select>

                                </div>
                                <div className='select-container'>
                                    <label htmlFor='select-standing'>Standing</label>
                                    <select id='select-standing' className='form-select filtrage-select'
                                        onChange={event => handleSelectChange(event, "Standing")}

                                    >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                        {distinctValues.Standing && distinctValues.Standing.length > 0 ? (
                                            distinctValues.Standing.map((data, index) => (
                                            <option key={index} value={data.Standing}>{data.Standing}</option>
                                            ))
                                        ) : (
                                            <option>Aucune donnée disponible</option>
                                        )}
                                    </select>

                                </div>
                                

                                {currentEtat === 'Etat des réservations' 
                                ?
                                    <Reservation />
                                :
                                    null
                                }
                                {currentEtat === "Etat des encaissements"
                                ?
                                    <Encaissement />
                                :
                                    null
                                }
                                {currentEtat === "Etat de stock"
                                ?
                                    <Stock />
                                :
                                    null
                                }
                            </div>

                        </Modal.Body>
                    }
                </div>
            </Modal>
        </>
    )
}