/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Datatable.css';


export default function Datatable() {
    const dataFiltred = useSelector((state) => state.dataFiltre)
    
    return(
        <div>
            <div>

            </div>
            <div className='datatable'>
                <table>
                    <thead>
                        <th>Bien</th>
                        <th>Nature</th>
                        <th>Etage</th>
                        <th>Standing</th>
                        <th>client</th>
                        <th>Dossier</th>
                        <th>Dt.Résa</th>
                        <th>Dt.Conc</th>
                        <th>Vente</th>
                        <th>Prix de vente</th>
                        <th>Encaiss</th>
                        <th>Reliquat</th>
                        <th>Commercial</th>
                    </thead>
                    <tbody>
                        {dataFiltred.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.Bien}</td>
                                        <td>{data.Nature}</td>
                                        <td>{data.Etage}</td>
                                        <td>{data.Standing}</td>
                                        <td>{data.client}</td>
                                        <td>{data.num_dossier}</td>
                                        <td>{data.date_reservation}</td>
                                        <td>{data.Date_concretisation}</td>
                                        <td>{data.Date_Validation}</td>
                                        <td>{data.Prix_Vente}</td>
                                        <td>{data.total}</td>
                                        <td>{data.Reliquat}</td>
                                        <td>{data.Commercial}</td>
                                    </tr>
                                    )
                                )}
                    </tbody>
                </table>
            </div>
        </div>
        
       
    )
}