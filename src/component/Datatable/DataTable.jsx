import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Datatable.css';
import exportToExcel from '../Exportation/Excel'; 
import exportToPDF from '../Exportation/Pdf';

import ExcelExportSVG from '../../Assets/svg/excelExportSVG';
import OptionAffichage from '../Datatable/OptionAffichage/OptionAffichage'; 
import ReactPaginate from 'react-paginate'; 
import './Pagination.css'

export default function Datatable() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    const [columns, setColumns] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const getColumns = (data) => {
        if (data.length > 0) {
            return Object.keys(data[0]);
        }
        return [];
    };

    const filterData = (data, searchTerm) => {
        const lowercasedTerm = searchTerm.toLowerCase();
        return data.filter(item =>
            Object.values(item).some(value =>
                value && value.toString().toLowerCase().includes(lowercasedTerm)
            )
        );
    };

    useEffect(() => {
        if (data.length > 0) {
            const newColumns = getColumns(data);
            setColumns(newColumns);
            setVisibleColumns(newColumns.slice(0, 8));
            setFilteredData(filterData(data, searchTerm));
        }
    }, [data, searchTerm]);

    const handleVisibilityChange = (updatedFields) => {
        setVisibleColumns(Object.keys(updatedFields).filter(col => updatedFields[col]));
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
    };

    const handleExportToExcel = () => {
        const filteredData = filterData(data, searchTerm);
        exportToExcel(filteredData, columns, visibleColumns);
    };
    const handleExportToPDF = () => {
        const filteredData = filterData(data, searchTerm);
        exportToPDF(filteredData, columns, visibleColumns);
    };
    

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);


    return (
        <div>
            <div className='datatable'>
                <div className="datatable-controls">
                    <input
                        type="text"
                        placeholder="Search..."
                        className='form-control mb-3'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-success" onClick={handleExportToExcel}>
                        <ExcelExportSVG />
                        Export
                    </button>
                    <button className="btn btn-danger" onClick={handleExportToPDF}>
                        
                        Export to PDF
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            {visibleColumns.map((col) => (
                                <th key={col}>{col}</th>
                            ))}
                            <th>
                                <OptionAffichage columns={columns} onVisibilityChange={handleVisibilityChange} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={index}>
                                {visibleColumns.map((col) => (
                                    <td key={col}>{item[col] !== undefined ? item[col] : '-'}</td>
                                ))}
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='pagination-container'>
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        </div>
    );
}
