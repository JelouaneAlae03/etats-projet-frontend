import React, { useState } from 'react';
import { useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
import OptionAffichage from "../OptionAffichage/OptionAffichage";
import '../Pagination.css'; 

export default function Stock({ handleFieldChange }) {
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
                    {selectedFields.Etage && <th>Etage</th>}
                    {selectedFields.Nature && <th>Nature</th>}
                    {selectedFields.Status && <th>Status</th>}
                    {selectedFields.Surface && <th>Surface</th>}
                    {selectedFields.Standing && <th>Standing</th>}
                    {selectedFields["N° TF"] && <th>N° TF</th>}
                    {selectedFields["Prix de Vente"] && <th>Prix de vente</th>}
                    <th className="three-points"><OptionAffichage handleFieldChange={handleFieldChange} /></th>
                </tr>
            </thead>
            <tbody>
                {currentData.map((data, index) => (
                    <tr key={index}>
                        {selectedFields.Bien && <td>{data.Bien}</td>}
                        {selectedFields.Etage && <td>{data.Etage}</td>}
                        {selectedFields.Nature && <td>{data.Nature}</td>}
                        {selectedFields.Status && <td>{data.etat}</td>}
                        {selectedFields.Surface && <td>-</td>}
                        {selectedFields.Standing && <td>{data.Standing}</td>}
                        {selectedFields["N° TF"] && <td>-</td>}
                        {selectedFields["Prix de Vente"] && <td>{data.prix_vente}</td>}
                        <td></td>
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
