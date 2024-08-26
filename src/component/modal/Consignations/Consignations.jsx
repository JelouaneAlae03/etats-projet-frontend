/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Consignations(){
    const dispatch = useDispatch();
    const distinctValues = useSelector((state) => state.distinctValues);
    const selectedOptions = useSelector((state) => state.selectedOptions);
    const data = useSelector((state) => state.data);

    const getConsignations = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/etats/consignations', {
                withCredentials: true
            });
            dispatch({type: 'ADD_DATA', payload: {data: response.data}});
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    }
    
    const PostConsignations = async (conditions) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/etats/postConsignationsdata', {conditions}, {
                withCredentials: true
            });
            console.log(response.data);
            dispatch({type: 'ADD_DATA', payload: {data: response.data}});
            dispatch({type: 'EMPTY_SELECTED'});
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    }
    

    const handleApercu = () =>{
        PostConsignations(selectedOptions);
        dispatch({type: 'MODAL_SHOW', payload: {show: false}});
    }

    useEffect(()=>{
        dispatch({type: 'LOADING', payload: {value: true}});
        getConsignations();
        dispatch({type: 'LOADING', payload: {value: false}});
        dispatch({type: 'ADD_SELECTED', payload: {key: "fSelectEntre", value: "Date_Consignation"}});
        dispatch({type: 'ADD_SELECTED', payload: {key: "sSelectMontant", value: ""}});
    }, [])

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        console.log("value", value);
        dispatch({type: 'ADD_SELECTED', payload: {key: id, value: value}});
    }

    useEffect(()=>{
        dispatch({type: 'DISTINCT_VALUES', payload: {array: data, keys: ['Societe','Projet','Tranche','GH','Immeuble','Etage','Nature','Standing']}});
        console.log("Distinct: ", distinctValues);
    },[data]);

    return(
        <>
            <div className="div-select-entre2">

            <div className='select-container2'>
                <div >
                    <label htmlFor="sSelectMontant">consignations</label>
                    <select id='sSelectMontant' className='form-select entre-select' onChange={(e) => handleInputChange(e)} >
                            <option value="">Tous</option>
                            <option value="R">Totalement réguliarisées</option>
                            <option value="N">Non réguliarisées</option>
                            {/* <option value="SupJardin">Partielement réguliarisées</option> */}
                    </select> 
                </div>       

            </div>
            <div className="modal-body-content-bottom">
                
                <div className="div-label">
                    <label htmlFor="">Date</label>
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


            </div>

            <div className='btn-parent'>
                <Link to="/datatable" className='modal-submit-btn'onClick={()=>{handleApercu()}}>Aperçu</Link>
            </div>
        </>
    )
}