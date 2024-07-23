/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Datatable.css';
import OptionAffichage from '../OptionAffichage/OptionAffichage';
import exportToExcel from '../../Exportation/Excel';
import ExcelExportSVG from '../../../Assets/svg/excelExportSVG';

export default function EncaissementDatatable() {
    const dispatch = useDispatch();
    const dataFiltred = useSelector((state) => state.data);
    const selectedFields = useSelector((state) => state.selectedFields);
    const [processedData, setProcessedData] = useState([]);
    const searchTerm = useSelector((state)=>state.searchTerm);
    const [filteredData, setFilteredData] = useState([]);

    const filterData = (data, searchTerm) => {
        const lowercasedTerm = searchTerm.toLowerCase();
        return data.filter(item =>
            (item.Prix_Vente && item.Prix_Vente.toString().toLowerCase().includes(lowercasedTerm)) ||
            (item.Bien && item.Bien.toLowerCase().includes(lowercasedTerm)) ||
            (item.client && item.client.toLowerCase().includes(lowercasedTerm)) ||
            (item.date_encaissement && item.date_encaissement.toLowerCase().includes(lowercasedTerm)) ||
            (item.Num_Recu && item.Num_Recu.toLowerCase().includes(lowercasedTerm)) ||
            (item.Nature && item.Nature.toLowerCase().includes(lowercasedTerm)) ||
            (item.Lib_Banque && item.Lib_Banque.toLowerCase().includes(lowercasedTerm)) ||
            (item.Lib_Agence && item.Lib_Agence.toLowerCase().includes(lowercasedTerm)) ||
            (item.Lib_Ville && item.Lib_Ville.toLowerCase().includes(lowercasedTerm)) ||
            (item.Date_Systeme && item.Date_Systeme.toLowerCase().includes(lowercasedTerm)) ||
            (item.montant && item.montant.toString().toLowerCase().includes(lowercasedTerm)) ||
            (item.difference && item.difference.toString().toLowerCase().includes(lowercasedTerm)) ||
            (item.percentage && item.percentage.toString().toLowerCase().includes(lowercasedTerm))
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
        console.log("processed: ", processedData);
    }, [dataFiltred]);

    useEffect(() => {
        if (searchTerm) {
            const filteredData = filterData(processedData, searchTerm);
            setFilteredData(filteredData);
        } else {
            setFilteredData(processedData);
        }
    }, [searchTerm, processedData]);

    const handleFieldChange = (e) => {
        dispatch({ type: 'CHANGE_SELECTED_FIELDS', payload: { key: e.target.name, value: e.target.checked } });
    };

    const Headers = ["Bien", "Nom & Prénom", "P.Vente", "Encaiss", "Reliquat", "%", "Date", "Reçu", "N°", "Nature", "Banque", "Agence", "Ville", "Création"];
    const Keys = ["Bien", "client", "Prix_Vente", "montant", "difference", "percentage", "date_encaissement", "Num_Recu", "Numero", "Nature", "Lib_Banque", "Lib_Agence", "Lib_Ville", "Date_Systeme"];

    return (
        <div>
            <div className='datatable-header'>
                <div className='datatable-header-left'>
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className='search-input'
                        value={searchTerm}
                        onChange={(e) => dispatch({type: 'CHANGE_SEARCH_TERM', payload: {value: e.target.value}})}
                    />
                </div>
                <div className='datatable-header-right'>
                    <button class="container-btn-file" onClick={() => exportToExcel(filteredData, Headers, Keys, 'Encaissement-table')}>
                        <ExcelExportSVG />
                        Export
                    </button>
                    <OptionAffichage handleFieldChange={handleFieldChange} />
                </div>
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
