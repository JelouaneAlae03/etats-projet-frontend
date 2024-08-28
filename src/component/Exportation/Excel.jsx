// src/Exportation/Excel.js
import * as XLSX from 'xlsx';

const exportToExcel = (data = [], columns = [], visibleColumns = []) => {
    if (!Array.isArray(data) || !Array.isArray(columns) || !Array.isArray(visibleColumns)) {
        console.error("Invalid data, columns, or visibleColumns provided for export.");
        return;
    }

    if (data.length === 0 || visibleColumns.length === 0) {
        console.error("Data or visibleColumns are empty. Cannot export.");
        return;
    }

    const filteredData = data.map(item => {
        const filteredItem = {};
        visibleColumns.forEach(col => {
            filteredItem[col] = item[col];
        });
        return filteredItem;
    });

    // Create a worksheet from the filtered data
    const worksheet = XLSX.utils.json_to_sheet(filteredData, { header: visibleColumns });

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate a file and trigger download
    XLSX.writeFile(workbook, 'data.xlsx');
};

export default exportToExcel;
