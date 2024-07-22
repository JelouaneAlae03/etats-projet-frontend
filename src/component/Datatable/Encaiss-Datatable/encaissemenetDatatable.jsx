/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../Datatable.css';
import exportToExcel from '../../Exportation/Excel';


export default function EncaissementDatatable() {
    const dataFiltred = useSelector((state) => state.data)
    const Headers = ["Bien","Nom & Prénom","P.Vente","Encaiss","Reliquat"];
    const Keys = ["Bien","client","Prix_Vente","montant",];
    return(
        <div>
            <div>
                <button onClick={() => exportToExcel(dataFiltred, Headers, Keys, 'Encaissement-table')}>Export to Excel</button>
            </div>
            <div className='datatable'>
                <table>
                    <thead>
                        <tr>
                            <th>Bien</th>
                            <th>Nom & Prénom</th>
                            <th>P.Vente</th>
                            <th>Encaiss</th>
                            <th>Reliquat</th>
                            <th>%</th>
                            <th>Date</th>
                            <th>Reçu</th>
                            <th>N°</th>
                            <th>Montant</th>
                            <th>Nature</th>
                            <th>N° piece</th>
                            <th>Banque</th>
                            <th>Agence</th>
                            <th>Ville</th>
                            <th>Création</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataFiltred.map((data, index) => (
                            <tr key={index}>
                                <td>{data.Bien}</td>
                                <td>{data.client}</td>
                                <td>{data.Prix_Vente}</td>
                                <td>{data.montant}</td>
                                <td>{parseInt(data.Prix_Vente) - parseInt(data.montant)}</td>
                                <td>{((parseInt(data.montant) / parseInt(data.Prix_Vente)) * 100).toFixed(2)}</td>
                                <td>-</td>
                                <td>{data.Num_Recu}</td>
                                <td>{data.Numero}</td>
                                <td>{data.montant}</td>
                                <td>{data.Nature}</td>
                                <td>-</td>
                                <td>{data.Lib_Banque}</td>
                                <td>{data.Lib_Agence}</td>
                                <td>{data.Lib_Ville}</td>
                                <td>{data.Date_Systeme}</td>
                            </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        
       
    )
}