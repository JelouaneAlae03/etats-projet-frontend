/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Datatable.css';
import OptionAffichage from './OptionAffichage/OptionAffichage';
import exportToExcel from '../Exportation/Excel';
import ExcelExportSVG from '../../Assets/svg/excelExportSVG';
import Encaissement from './Encaiss-Datatable/Encaissement';
import Reservation from './Reserv-Datatable/Reservation';
import Stock from './Stock-Datatable/Stock';

export default function Datatable() {
    const dispatch = useDispatch();
    const currentEtat = useSelector((state)=>state.currentEtat);
    const data = useSelector((state) => state.data);
    const selectedFields = useSelector((state) => state.selectedFields);
    const processedData = useSelector((state) => state.processedData);
    const searchTerm = useSelector((state)=>state.searchTerm);
    const [filteredData, setFilteredData] = useState([]);
    
    const selectedFieldsFill = () => {
        switch(currentEtat){
            case "Etat des encaissements":
                return {
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
            case "Etat des réservations":
                return {
                    Bien: true,
                    Nature: true,
                    Etage: true,
                    Standing: true,
                    Client: true,
                    Dossier: true,
                    "Date de Réservation": true,
                    "Date de Conc": true,
                    "Date du Vente": true,
                    "Prix de Vente": true,
                    Encaiss: true,
                    Reliquat: true,
                    Commercial: true,
                }
            case "Etat de stock":
                return {
                    Bien: true,
                    Nature: true,
                    Etage: true,
                    Status: true,
                    Surface: true,
                    Standing: true,
                    "N° TF": true,
                    "Prix de Vente": true,
                }
        }
    }

    const processedDataFill = () => {
        switch(currentEtat){
            case "Etat des encaissements":{
                const functionWork = data.map(item => ({
                    ...item,
                    difference: parseInt(item.Prix_Vente) - parseInt(item.montant),
                    percentage: (((parseInt(item.montant) / parseInt(item.Prix_Vente)) * 100).toFixed(2)),
                }));
                return functionWork;
            }
            default:
                return data;
        }
    }

    useEffect(() => {
        const fields = selectedFieldsFill();
        dispatch({
            type: 'ADD_SELECTED_FIELDS',
            payload: {
                fields: fields
            }
        });
        dispatch({ type: 'ADD_DATA', payload: { data: processedData } });
    }, []);

    useEffect(() => {
        const processedData = processedDataFill();
        dispatch({ type: 'ADD_PROCESSED_DATA', payload: { data: processedData } });
    }, [data]);

    

    const handleFieldChange = (e) => {
      dispatch({ type: 'CHANGE_SELECTED_FIELDS', payload: { key: e.target.name, value: e.target.checked } });
    };

    const display = () => {
      switch(currentEtat){
          case "Etat des encaissements":
            return <Encaissement handleFieldChange={handleFieldChange}/>
          case "Etat des réservations":
            return <Reservation handleFieldChange={handleFieldChange}/>
          case "Etat de stock":
            return <Stock handleFieldChange={handleFieldChange}/>
      }
    }
    return (
        <div>
            <div className='datatable'>
                <table>
                    {display()}
                </table>
            </div>
        </div>
    )
}