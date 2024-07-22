/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Datatable.css';
import OptionAffichage from '../OptionAffichage/OptionAffichage';
import exportToExcel from '../../Exportation/Excel';

export default function EncaissementDatatable() {
    const dispatch = useDispatch();
    const dataFiltred = useSelector((state) => state.data);
    const selectedFields = useSelector((state) => state.selectedFields);
    const [processedData, setProcessedData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const filterData = (data, searchTerm) => {
        const lowercasedTerm = searchTerm.toLowerCase();
        return data.filter(item =>
            item.Prix_Vente.toLowerCase().includes(lowercasedTerm) ||
            item.Bien.toLowerCase().includes(lowercasedTerm) ||
            item.client.toLowerCase().includes(lowercasedTerm) ||
            item.date_encaissement.toLowerCase().includes(lowercasedTerm) ||
            item.Num_Recu.toLowerCase().includes(lowercasedTerm) ||
            item.Nature.toLowerCase().includes(lowercasedTerm) ||
            item.Lib_Banque.toLowerCase().includes(lowercasedTerm) ||
            item.Lib_Agence.toLowerCase().includes(lowercasedTerm) ||
            item.Lib_Ville.toLowerCase().includes(lowercasedTerm) ||
            item.Date_Systeme.toLowerCase().includes(lowercasedTerm) ||
            item.montant.toLowerCase().includes(lowercasedTerm) ||
            item.difference.toString().toLowerCase().includes(lowercasedTerm) ||
            item.percentage.toLowerCase().includes(lowercasedTerm)
        );
    };

    useEffect(() => {
        dispatch({
            type: 'ADD_SELECTED_FIELDS',
            payload: {
                fields: {
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
                }
            }
        });
        dispatch({ type: 'ADD_DATA', payload: { data: processedData } });
    }, []);

    useEffect(() => {
        const processedData = dataFiltred.map(item => ({
            ...item,
            difference: parseInt(item.Prix_Vente) - parseInt(item.montant),
            percentage: (((parseInt(item.montant) / parseInt(item.Prix_Vente)) * 100).toFixed(2)),
        }));
        setProcessedData(processedData);
    }, [dataFiltred]);

    useEffect(() => {
        const filteredData = filterData(processedData, searchTerm);
        setFilteredData(filteredData);
    }, [searchTerm, processedData]);

    const handleFieldChange = (e) => {
        dispatch({ type: 'CHANGE_SELECTED_FIELDS', payload: { key: e.target.name, value: e.target.checked } });
    };

    const Headers = ["Bien", "Nom & Prénom", "P.Vente", "Encaiss", "Reliquat", "%", "Date", "Reçu", "N°", "Nature", "Banque", "Agence", "Ville", "Création"];
    const Keys = ["Bien", "client", "Prix_Vente", "montant", "difference", "percentage", "date_encaissement", "Num_Recu", "Numero", "Nature", "Lib_Banque", "Lib_Agence", "Lib_Ville", "Date_Systeme"];

    return (
        <div>
            <div className='datatable-header'>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className='search-input'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button class="container-btn-file" onClick={() => exportToExcel(filteredData, Headers, Keys, 'Encaissement-table')}>
            <svg
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 50 50"
            >
                <path
                d="M28.8125 .03125L.8125 5.34375C.339844 
                5.433594 0 5.863281 0 6.34375L0 43.65625C0 
                44.136719 .339844 44.566406 .8125 44.65625L28.8125 
                49.96875C28.875 49.980469 28.9375 50 29 50C29.230469 
                50 29.445313 49.929688 29.625 49.78125C29.855469 49.589844 
                30 49.296875 30 49L30 1C30 .703125 29.855469 .410156 29.625 
                .21875C29.394531 .0273438 29.105469 -.0234375 28.8125 .03125ZM32 
                6L32 13L34 13L34 15L32 15L32 20L34 20L34 22L32 22L32 27L34 27L34 
                29L32 29L32 35L34 35L34 37L32 37L32 44L47 44C48.101563 44 49 
                43.101563 49 42L49 8C49 6.898438 48.101563 6 47 6ZM36 13L44 
                13L44 15L36 15ZM6.6875 15.6875L11.8125 15.6875L14.5 21.28125C14.710938 
                21.722656 14.898438 22.265625 15.0625 22.875L15.09375 22.875C15.199219 
                22.511719 15.402344 21.941406 15.6875 21.21875L18.65625 15.6875L23.34375 
                15.6875L17.75 24.9375L23.5 34.375L18.53125 34.375L15.28125 
                28.28125C15.160156 28.054688 15.035156 27.636719 14.90625 
                27.03125L14.875 27.03125C14.8125 27.316406 14.664063 27.761719 
                14.4375 28.34375L11.1875 34.375L6.1875 34.375L12.15625 25.03125ZM36 
                20L44 20L44 22L36 22ZM36 27L44 27L44 29L36 29ZM36 35L44 35L44 37L36 37Z"
                ></path>
            </svg>
            Export
        </button>
                <OptionAffichage handleFieldChange={handleFieldChange} />
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
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                {selectedFields.Bien && <td>{item.Bien}</td>}
                                {selectedFields.Client && <td>{item.client}</td>}
                                {selectedFields["Prix de Vente"] && <td>{item.Prix_Vente}</td>}
                                {selectedFields.Montant && <td>{item.montant}</td>}
                                {selectedFields.Reliquat && <td>{item.difference}</td>}
                                {selectedFields.Pourcentage && <td>{item.percentage}</td>}
                                {selectedFields.Date && <td>{item.date_encaissement}</td>}
                                {selectedFields["Numero de Reçu"] && <td>{item.Num_Recu}</td>}
                                {selectedFields.Numero && <td>{item.Numero}</td>}
                                {selectedFields.Nature && <td>{item.Nature}</td>}
                                {selectedFields["Lib de Banque"] && <td>{item.Lib_Banque}</td>}
                                {selectedFields["Lib d'Agence"] && <td>{item.Lib_Agence}</td>}
                                {selectedFields["Lib de Ville"] && <td>{item.Lib_Ville}</td>}
                                {selectedFields["Date du Création"] && <td>{item.Date_Systeme}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
