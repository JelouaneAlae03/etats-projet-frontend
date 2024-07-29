/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Datatable.css';
import ExcelExportSVG from '../../Assets/svg/excelExportSVG';
import OptionAffichage from '../Datatable/OptionAffichage/OptionAffichage'; 
import ReactPaginate from 'react-paginate'; 
import './Pagination.css'

export default function Datatable() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    const columns = useSelector((state) => state.columns);
    const visibleColumns = useSelector((state) => state.visibleColumns);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10);
    const searchTerm = useSelector((state) => state.searchTerm);
    const filteredData = useSelector((state) => state.filteredData);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
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
            dispatch({type: 'ADD_COLUMNS', payload: {data: newColumns}});
            dispatch({type: 'ADD_VISIBLE_COLUMNS', payload: {data: newColumns.slice(0, 8)}});
            const temp = filterData(data, searchTerm);
            dispatch({type: 'ADD_FILTERED_DATA', payload: {value: temp}});
        }
    }, [data, searchTerm]);

    useEffect(() => {
        if (sortColumn) {
            const sortedData = [...filteredData].sort((a, b) => {
                const aValue = a[sortColumn] || '';
                const bValue = b[sortColumn] || '';
                if (sortOrder === 'asc') {
                    return aValue > bValue ? 1 : (aValue < bValue ? -1 : 0);
                } else {
                    return aValue < bValue ? 1 : (aValue > bValue ? -1 : 0);
                }
            });
            dispatch({type: 'ADD_FILTERED_DATA', payload: {value: sortedData}});
        }
    }, [sortColumn, sortOrder]);

    const handleVisibilityChange = (updatedFields) => {
        const temp = Object.keys(updatedFields).filter(col => updatedFields[col]);
        dispatch({type: 'ADD_VISIBLE_COLUMNS', payload: {data: temp}});
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    return (
        <div>
            <div className='datatable'>
                <table>
                    <thead>
                        <tr>
                            {visibleColumns.map((col) => (
                                <th key={col} onClick={() => handleSort(col)}>
                                    {col}
                                    {sortColumn === col && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                                </th>
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
