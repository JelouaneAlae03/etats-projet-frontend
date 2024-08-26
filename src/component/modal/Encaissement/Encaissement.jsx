/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../Loading';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

export default function Encaissement(){
    const dispatch = useDispatch();
    const distinctValues = useSelector((state) => state.distinctValues);
    const selectedOptions = useSelector((state) => state.selectedOptions);
    const data = useSelector((state) => state.data);
    const isLoading = useSelector((state) => state.isLoading);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        console.log("value", value, id);
        dispatch({type: 'ADD_SELECTED', payload: {key: id, value: value}});
    }

    const getEncaissements = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/etats/encaissements',{
                withCredentials: true
            });
            console.log("encaissement", response.data)
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
              console.log("Encaissement keys: ", keys);
    
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    }

    const PostEncaissements = async (conditions) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/etats/postencaissementsdata', {conditions},{
                withCredentials: true

            });
            console.log("data post encaiss: ", response.data);
            dispatch({type: 'ADD_DATA', payload: {data: response.data}});
            dispatch({type: 'EMPTY_SELECTED'});
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    }

    const handleApercu = () =>{
        PostEncaissements(selectedOptions);
        dispatch({type: 'MODAL_SHOW', payload: {show: false}});
    }

    useEffect(()=>{
        dispatch({type: 'LOADING', payload: {value: true}});
        getEncaissements();
        dispatch({type: 'LOADING', payload: {value: false}});
        dispatch({type: 'ADD_SELECTED', payload: {key: "fSelectEntre", value: "date_encaissement"}});
        dispatch({type: 'ADD_SELECTED', payload: {key: "sSelectEntre", value: "montant"}});
        console.log(selectedOptions)
    }, []);

    useEffect(()=>{
        dispatch({type: 'DISTINCT_VALUES', payload: {array: data, keys: ['Societe','Projet','Tranche','GH','Immeuble','Etage','Nature','Standing','Commercial','Ville_Adresse']}});
        console.log("Distinct: ", distinctValues);
    },[data]);

    return(
        <>
            {isLoading ?
                <Loading />
            :
            <>
                <div className="encaissement-container">
                    <div className="modal-body-content-bottom">
                        <div className="div-select-entre">
                            <select id='fSelectEntre' className='form-select entre-select' onChange={(e) => handleInputChange(e)} >
                                <option value="date_encaissement">Date Encaissement</option>
                                <option value="Date_Sort">Date Sort</option>
                                {/* <option value="">Date Création</option> */}
                                <option value="Date_Prev_Enc">Date Prévu Encaissement</option>
                                <option value="Date_Remise">Date Remise</option>
                            </select>
                        </div>

                        <div className="input-field">
                            <input
                                type="date"
                                id="fEntre"
                                onChange={(e) => handleInputChange(e)}
                            />
                            <label htmlFor="fEntre" className='lbl'>Entre</label>
                        </div>
                        <div className="input-field">
                            <input
                                type="date"
                                id="fEt"
                                onChange={(e) => handleInputChange(e)}
                            />
                            <label htmlFor="fEt" className='lbl'>Et</label>
                        </div>
                    </div>

                    <div className="modal-body-content-bottom">
                        <div className='modal-body-content-bottom-container-lbl'>
                            <label htmlFor="sEntre" className='lbl'>Montant: </label>
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                id="sEntre"
                                onChange={(e) => handleInputChange(e)}
                            />
                            <label htmlFor="sEntre" className='lbl'>Entre</label>
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                id="sEt"
                                onChange={(e) => handleInputChange(e)}
                            />
                            <label htmlFor="sEt" className='lbl'>Et</label>
                        </div>
                    </div>

                    
                </div>
                <div className='btn-parent'>
                    <Link to="/datatable" className='modal-submit-btn'onClick={()=>{handleApercu()}}>Aperçu</Link>
                </div>
            </>
            }                  
        </>
    )
}