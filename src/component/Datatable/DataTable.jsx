import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactPaginate from 'react-paginate';
import OptionAffichage from '../Datatable/OptionAffichage/OptionAffichage';

import './Datatable.css';
import './Pagination.css';

const ItemTypes = {
  COLUMN: 'COLUMN',
};

const DraggableHeader = ({ column, index, moveColumn, onSort, isSorted, sortOrder }) => {
  const [, drag] = useDrag({
    type: ItemTypes.COLUMN,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    hover: (item) => {
      if (item.index !== index) {
        moveColumn(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <th
      style={{
        padding: '8px',
        position: 'relative',
      }}
      onClick={() => onSort(column)}
      ref={node => drop(node)}
    >
      {column}
      {isSorted && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
      <div
        className='drag-handle'
        style={{
          position: 'absolute',
          right: '5px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'move',
          fontSize: '18px',
          userSelect: 'none',
        }}
        ref={drag}
      >
        ⋮⋮
      </div>
    </th>
  );
};

const DraggableCell = ({ value }) => (
  <td>
    {value !== undefined ? value : '-'}
  </td>
);

export default function Datatable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const columns = useSelector((state) => state.columns);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [columnOrder, setColumnOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const searchTerm = useSelector((state) => state.searchTerm);
  const filteredData = useSelector((state) => state.filteredData) || [];
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [groupByColumn, setGroupByColumn] = useState(null);
  const [groupedData, setGroupedData] = useState({ grouped: {}, groupTotals: {} });
  const prixColumns = columns.filter(col => col?.toLowerCase().includes('prix'));

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

  const groupData = (data, column) => {
    return data.reduce((acc, item) => {
      const key = item[column] || 'Others';
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  };

  const calculateGroupTotals = (data, column) => {
    const totals = {};
    data.forEach(item => {
      const key = item[column] || 'Others';
      if (!totals[key]) {
        totals[key] = {};
      }
      prixColumns.forEach(prixCol => {
        if (!totals[key][prixCol]) {
          totals[key][prixCol] = 0;
        }
        totals[key][prixCol] += parseFloat(item[prixCol] || 0);
      });
    });
    return totals;
  };

  useEffect(() => {
    if (data.length > 0) {
      const newColumns = getColumns(data);
      dispatch({ type: 'ADD_COLUMNS', payload: { data: newColumns } });
      setColumnOrder(newColumns);
      setVisibleColumns(newColumns.slice(0, 8));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      const temp = filterData(data, searchTerm);
      dispatch({ type: 'ADD_FILTERED_DATA', payload: { value: temp } });
    }
  }, [searchTerm, data, dispatch]);

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
      dispatch({ type: 'ADD_FILTERED_DATA', payload: { value: sortedData } });
    }
  }, [sortColumn, sortOrder, filteredData, dispatch]);

  useEffect(() => {
    if (groupByColumn) {
      const grouped = groupData(filteredData, groupByColumn);
      const groupTotals = calculateGroupTotals(filteredData, groupByColumn);
      setGroupedData({ grouped, groupTotals });
    } else {
      setGroupedData({ grouped: {}, groupTotals: {} });
    }
  }, [groupByColumn, filteredData]);

  const handleVisibilityChange = (updatedFields) => {
    const temp = columnOrder.filter(col => updatedFields[col]);
    setVisibleColumns(temp);
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

  const handleGroupBy = (event) => {
    setGroupByColumn(event.target.value === 'None' ? null : event.target.value);
  };

  const moveColumn = (fromIndex, toIndex) => {
    const reorderedColumns = [...columnOrder];
    const [movedColumn] = reorderedColumns.splice(fromIndex, 1);
    reorderedColumns.splice(toIndex, 0, movedColumn);

    setColumnOrder(reorderedColumns);
    const newVisibleColumns = reorderedColumns.filter(col => visibleColumns.includes(col));
    setVisibleColumns(newVisibleColumns);
  };

  const pageCount = groupByColumn 
    ? Math.ceil(Object.keys(groupedData.grouped).length / itemsPerPage) 
    : Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = groupByColumn 
    ? Object.entries(groupedData.grouped).slice(startIndex, endIndex) 
    : filteredData.slice(startIndex, endIndex);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='datatable'>
        <div className="controls">
          <label htmlFor="groupBy">Groupée par : </label>
          <select id="groupBy" onChange={handleGroupBy}>
            <option value="None">None</option>
            {columns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>
        <table>
          <thead>
            <tr>
              {visibleColumns.map((col, index) => (
                <DraggableHeader
                  key={col}
                  column={col}
                  index={index}
                  moveColumn={moveColumn}
                  onSort={handleSort}
                  isSorted={sortColumn === col}
                  sortOrder={sortOrder}
                />
              ))}
              <th>
                <OptionAffichage columns={columns} onVisibilityChange={handleVisibilityChange} />
              </th>
            </tr>
          </thead>
          <tbody>
            {groupByColumn ? (
              currentData.map(([groupKey, items], groupIndex) => (
                <React.Fragment key={groupIndex}>
                  <tr className="group-header" style={{ backgroundColor: '#7792bc' }}>
                    <td colSpan={visibleColumns.length + 1}>
                      <span className="header-group">{groupKey} - Totals:</span> {prixColumns.map(prixCol => (
                        <div key={prixCol}>
                          <span className="header-group">{prixCol}: {groupedData.groupTotals[groupKey]?.[prixCol]?.toFixed(2) || 0}</span>
                        </div>
                      ))}
                    </td>
                  </tr>
                  {items.map((item, index) => (
                    <tr key={index}>
                      {visibleColumns.map((col) => (
                        <DraggableCell key={col} value={item[col]} />
                      ))}
                      <td></td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              currentData.map((item, index) => (
                <tr key={index}>
                  {visibleColumns.map((col) => (
                    <DraggableCell key={col} value={item[col]} />
                  ))}
                  <td></td>
                </tr>
              ))
            )}
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
    </DndProvider>
  );
}
