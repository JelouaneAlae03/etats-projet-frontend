/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Reservation(){
    const dispatch = useDispatch();
    const distinctValues = useSelector((state) => state.distinctValues);
    const selectedOptions = useSelector((state) => state.selectedOptions);
    const data = useSelector((state) => state.data);

    const getReservations = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/etats/reservations');
            dispatch({type: 'ADD_DATA', payload: {data: response.data}});
            dispatch({type: 'LOADING', payload: {value: false}});
            const keys = response.data.reduce((keys, obj) => {
                Object.keys(obj).forEach(key => {
                  if (!keys.includes(key)) {
                    keys.push(key);
                  }
                });
                return keys;
              }, []);
              console.log("Reservation keys: ", keys);
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    }

    const PostReservations = async (conditions) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/etats/getreservationsdata', {conditions});
            console.log(response.data);
            dispatch({type: 'ADD_DATA', payload: {data: response.data}});
            dispatch({type: 'EMPTY_SELECTED'});
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    }

    const handleApercu = () =>{
        PostReservations(selectedOptions);
        dispatch({type: 'MODAL_SHOW', payload: {show: false}});
    }

    useEffect(()=>{
        dispatch({type: 'LOADING', payload: {value: true}});
        getReservations();
        dispatch({type: 'LOADING', payload: {value: false}});
        dispatch({type: 'ADD_SELECTED', payload: {key: "fSelectEntre", value: "Prix_Vente"}});
        dispatch({type: 'ADD_SELECTED', payload: {key: "sSelectEntre", value: "date_reservation"}});
    }, [])

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        console.log("value", value);
        dispatch({type: 'ADD_SELECTED', payload: {key: id, value: value}});
    }

    useEffect(()=>{
        dispatch({type: 'DISTINCT_VALUES', payload: {array: data, keys: ['Societe','Projet','Tranche','GH','Immeuble','Etage','Nature','Standing','Commercial','Ville_Adresse']}});
        console.log("Distinct: ", distinctValues);
    },[data]);

    return(
        <>
            <div className='reservation-container'>
                <div className='reservation-container-scon'>
                    <div className='select-container'>
                        <label htmlFor='select-commercial' className='lbl'>Commercial</label>
                        <select id='select-commercial' className='form-select filtrage-select'
                            onChange={event => dispatch({type: 'ADD_SELECTED', payload: {key: "Commercial", value: event.target.value}})}

                        >
                        <option value=""  hidden>
                            choisir une option
                        </option>
                        <option value=""  >
                            
                        </option>
                        {distinctValues.Commercial && distinctValues.Commercial.length > 0 ? (
                            distinctValues.Commercial.map((data, index) => (
                            <option key={index} value={data.Commercial}>{data.Commercial}</option>
                            ))
                        ) : (
                            <option>Aucune donnée disponible</option>
                        )}
                        </select>
                    </div>
                    <div className='select-container'>
                        <label htmlFor='select-ville' className='lbl'>Ville</label>
                        <select id='select-ville' className='form-select filtrage-select'
                            onChange={event => dispatch({type: 'ADD_SELECTED', payload: {key: "Ville_Adresse", value: event.target.value}})}
                        >
                        <option value=""  hidden>
                            choisir une option
                        </option>
                        <option value=""  >
                            
                        </option>
                            {distinctValues.Ville_Adresse && distinctValues.Ville_Adresse.length > 0 ? (
                                distinctValues.Ville_Adresse.map((data, index) => (
                                <option key={index} value={data.Ville_Adresse}>{data.Ville_Adresse}</option>
                                ))
                            ) : (
                                <option>Aucune donnée disponible</option>
                            )}
                        </select>
                    </div>
                </div>
                

                <div className="modal-body-content-bottom">
                    <div className="div-select-entre">
                        <select id='fSelectEntre' className='form-select entre-select' onChange={(e) => handleInputChange(e)} >
                            <option value="Prix_Vente">Prix de vente</option>
                            <option value="Reliquat">Reliquat</option>
                        </select>
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            id="fEntre"
                            onChange={(e) => handleInputChange(e)}
                        />
                        <label htmlFor="fEntre" className='lbl'>Entre</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            id="fEt"
                            onChange={(e) => handleInputChange(e)}
                        />
                        <label htmlFor="fEt" className='lbl'>Et</label>
                    </div>
                </div>

                <div className="modal-body-content-bottom">
                    <div className="div-select-entre">
                        <select id='sSelectEntre' className='form-select entre-select' onChange={(e) => handleInputChange(e)} >
                            <option value="date_reservation">Date de Réservation</option>
                            <option value="Date_fin_reservation">Date fin de Réservation</option>
                            <option value="Date_concretisation">Date de Concrétisation</option>
                            {/* <option value="Date_concretisation">Date de Vente</option> */}
                            <option value="Date_Creation">Date Creation</option>
                        </select>
                    </div>
                    <div className="input-field">
                        <input
                            type="date"
                            id="sEntre"
                            onChange={(e) => handleInputChange(e)}
                        />
                        <label htmlFor="sEntre" className='lbl'>Entre</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="date"
                            id="sEt"
                            onChange={(e) => handleInputChange(e)}
                        />
                        <label htmlFor="sEt" className='lbl'>Et</label>
                    </div>
                </div>
            </div>

            <div className='btn-parent'>
                <Link to="/reservation_datatable" className='modal-submit-btn'onClick={()=>{handleApercu()}}>Aperçu</Link>
            </div>
        </>
    )
}