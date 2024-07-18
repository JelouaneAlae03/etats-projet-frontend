/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Datatable() {
    const [dataFiltred, setDataFiltred] = useState([]);
    const [selected, setSelected] = useState({});
    const s = useSelector((state) => state.selected);
    const d = useSelector((state) => state.dataFiltre)
    const [showData, setShowData] = useState(false);

    useEffect(() => {
        setDataFiltred(d);
        setSelected(s);
        console.log(dataFiltred);
        console.log(selected);
      }, [s, d]);
      
      useEffect(()=> {
        setShowData(true);
        console.log('true');
        console.log(dataFiltred);
        console.log(selected);
      }, [selected, dataFiltred]);
    return(
        <table>
            <thead>
                <th>Societe</th>
                <th>Projet</th>
                <th>Tranche</th>
                <th>Groupement</th>
                <th>Immeuble</th>
                <th>Etage</th>
                <th>Nature de Bien</th>
                <th>Standing</th>
                <th>Commercial</th>
                <th>Ville</th>
            </thead>
            <tbody>
                {dataFiltred && selected ? dataFiltred.map((data, index) => {
                    if((!selected.Societe === true || data.Societe === selected.Societe) &&
                    (!selected.Projet === true || data.Projet === selected.Projet) &&
                    (!selected.GH === true || data.GH === selected.GH) &&
                    (!selected.Immeuble === true || data.Immeuble === selected.Immeuble) &&
                    (!selected.Etage === true || data.Etage === selected.Etage) &&
                    (!selected.Nature === true || data.Nature === selected.Nature) &&
                    (!selected.Standing === true || data.Standing === selected.Standing) &&
                    (!selected.Commercial === true || data.Commercial === selected.Commercial) &&
                    (!selected.Ville_Adresse === true || data.Ville_Adresse === selected.Ville_Adresse) &&
                    (!selected.Tranche === true || data.Tranche === selected.Tranche)){
                        return(
                            <tr key={index}>
                                <td>{data.Societe}</td>
                                <td>{data.Projet}</td>
                                <td>{data.GH}</td>
                                <td>{data.Immeuble}</td>
                                <td>{data.Etage}</td>
                                <td>{data.Nature}</td>
                                <td>{data.Standing}</td>
                                <td>{data.Commercial}</td>
                                <td>{data.Ville_Adresse}</td>
                                <td>{data.Tranche}</td>
                            </tr>
                        )
                    }
                    return null
                }
                )
                :
                null
                }
            </tbody>
        </table>
    )
}