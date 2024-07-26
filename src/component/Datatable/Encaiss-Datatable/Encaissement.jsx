import React, { useState } from 'react';
import { useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
import OptionAffichage from "../OptionAffichage/OptionAffichage";
import '../Pagination.css'; 

export default function Encaissement({ handleFieldChange }) {
    const selectedFields = useSelector((state) => state.selectedFields);
    const filteredData = useSelector((state) => state.filteredData);
    
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const offset = currentPage * itemsPerPage;
    const currentData = filteredData.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
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
                    <th className="three-points"><OptionAffichage handleFieldChange={handleFieldChange} /></th>
                </tr>
            </thead>
            <tbody>
                {currentData && currentData.map((item, index) => (
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
                        <td className="black-td"></td>
                    </tr>
                ))}
            </tbody>
            <div className="pagination-container">
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    disabledClassName={'disabled'}
                />
            </div>
        </>
    );
}
