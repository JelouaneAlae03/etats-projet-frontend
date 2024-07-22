/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Datatable.css';
import OptionAffichage from '../OptionAffichage/OptionAffichage';


export default function EncaissementDatatable() {
    const dispatch = useDispatch();
    const dataFiltred = useSelector((state) => state.data);
    const selectedFields = useSelector((state) => state.selectedFields);

    useEffect(()=>{
        dispatch({type: 'ADD_SELECTED_FIELDS', payload: {fields: {
            Bien: true,
            Client: true,
            "Prix de Vente": true,
            Montant: true,
            Reliquat: true,
            Pourcentage: true,
            Date: true,
            "Numero de Reçu": true,
            Numero: true,
            Nature: true,
            "Lib de Banque": true,
            "Lib d'Agence": true,
            "Lib de Ville": true,
            "Date du Création": true,
        }}});
    }, [])

    const handleFieldChange = (e) => {
        dispatch({type: 'CHANGE_SELECTED_FIELDS', payload: {key: e.target.name, value: e.target.checked}});
    };

    return(
        <div>
            <div>
                <OptionAffichage />
            </div>
            <div className='datatable'>
                <table>
                    <thead>
                        <tr>
                            {selectedFields.Bien && <th>Bien</th>}
                            {selectedFields.Client && <th>Nom & Prénom</th>}
                            {selectedFields["Prix de Vente"] && <th>P.Vente</th>}
                            {selectedFields.Montant && <th>Encaiss</th>}
                            {selectedFields.Reliquat && <th>Reliquat</th>}
                            {selectedFields.Pourcentage && <th>%</th>}
                            {selectedFields.Date && <th>Date</th>}
                            {selectedFields["Numero de Reçu"] && <th>Reçu</th>}
                            {selectedFields.Numero && <th>N°</th>}
                            {selectedFields.Nature && <th>Nature</th>}
                            {selectedFields["Lib de Banque"] && <th>Banque</th>}
                            {selectedFields["Lib d'Agence"] && <th>Agence</th>}
                            {selectedFields["Lib de Ville"] && <th>Ville</th>}
                            {selectedFields["Date du Création"] && <th>Création</th>}
                        </tr>
                    </thead>
                    <tbody>
                    {dataFiltred.map((data, index) => (
                            <tr key={index}>
                                {selectedFields.Bien && <td>{data.Bien}</td>}
                                {selectedFields.Client && <td>{data.client}</td>}
                                {selectedFields["Prix de Vente"] && <td>{data.Prix_Vente}</td>}
                                {selectedFields.Montant && <td>{data.montant}</td>}
                                {selectedFields.Reliquat && <td>{parseInt(data.Prix_Vente) - parseInt(data.montant)}</td>}
                                {selectedFields.Pourcentage && <td>{((parseInt(data.montant) / parseInt(data.Prix_Vente)) * 100).toFixed(2)}</td>}
                                {selectedFields.Date && <td>-</td>}
                                {selectedFields["Numero de Reçu"] && <td>{data.Num_Recu}</td>}
                                {selectedFields.Numero && <td>{data.Numero}</td>}
                                {selectedFields.Nature && <td>{data.Nature}</td>}
                                {selectedFields["Lib de Banque"] && <td>{data.Lib_Banque}</td>}
                                {selectedFields["Lib d'Agence"] && <td>{data.Lib_Agence}</td>}
                                {selectedFields["Lib de Ville"] && <td>{data.Lib_Ville}</td>}
                                {selectedFields["Date du Création"] && <td>{data.Date_Systeme}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
       
    )
}