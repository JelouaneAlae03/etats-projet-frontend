/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Encaissement(){
    const dispatch = useDispatch();
    const distinctValues = useSelector((state) => state.distinctValues);
    const selectedOptions = useSelector((state) => state.selectedOptions);
    const data = useSelector((state) => state.data);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        console.log("value", value, id);
        dispatch({type: 'ADD_SELECTED', payload: {key: id, value: value}});
    }

    const getEncaissements = async () => {
        try {
            dispatch({type: 'LOADING', payload: {value: true}});
            const response = await axios.get('http://127.0.0.1:8000/api/etats/encaissements');
            console.log("encaissement", response.data)
            dispatch({type: 'ADD_DATA', payload: {data: response.data}});
            dispatch({type: 'LOADING', payload: {value: false}});
    
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    }

    const PostEncaissements = async (conditions) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/etats/postencaissementsdata', {conditions});
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
                
                <div className="form-floating">
                    <input type="date" className="form-control" id="fEntre" onChange={(e) => handleInputChange(e)}/>
                    <label htmlFor="fEntre">Entre</label>
                </div>
                <div className="form-floating">
                    <input type="date" className="form-control" id="fEt" onChange={(e) => handleInputChange(e)} />
                    <label htmlFor="fEt">Et</label>
                </div>
            </div>

            <div className="modal-body-content-bottom">
                <label htmlFor="sEntre">Montant</label>
                <div className="form-floating">
                    <input type="text" className="form-control" id="sEntre" onChange={(e) => handleInputChange(e)}/>
                    <label htmlFor="sEntre">Entre</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="sEt" onChange={(e) => handleInputChange(e)} />
                    <label htmlFor="sEt">Et</label>
                </div>
            </div>

            <div className='btn-parent'>
                <Link to="/encaissement_datatable" className='modal-submit-btn'onClick={()=>{handleApercu()}}>Aperçu</Link>
            </div>
        </>
    )
}