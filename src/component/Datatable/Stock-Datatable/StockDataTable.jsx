
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../Datatable.css';


export default function StockDataTable() {
    const dataFiltred = useSelector((state) => state.data)
    
    return(
        <div>
            <div>

            </div>
            <div className='datatable'>
                <table>
                    <thead>
                        <tr>
                            <th>Bien</th>
                            <th>Etage</th>
                            <th>Nature</th>
                            <th>Status</th>
                            <th>Surface</th>
                            <th>Standing</th>
                            <th>N° TF</th>
                            <th>Prix de vente</th>

                        </tr>
                    </thead>
                    <tbody>
                        {dataFiltred.map((data, index) => (
                            <tr key={index}>
                                <td>{data.Bien}</td>
                                <td>{data.Nature}</td>
                                <td>{data.Etage}</td>
                                <td>{data.etat}</td>
                                <td>-</td>
                                <td>{data.Standing}</td>
                                <td>-</td>
                                <td>{data.prix_vente}</td>
                            </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        
       
    )
}