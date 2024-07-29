// src/Exportation/PDF.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const exportToPDF = (filteredData, columns, visibleColumns) => {
    if (!Array.isArray(filteredData) || !Array.isArray(columns) || !Array.isArray(visibleColumns)) {
        console.error("Invalid filteredData, columns, or visibleColumns provided for export.");
        return;
    }

    if (filteredData.length === 0 || visibleColumns.length === 0) {
        console.error("Filtered data or visibleColumns are empty. Cannot export.");
        return;
    }

    // Filter the columns based on visibility
    const filteredColumns = columns.filter(col => visibleColumns.includes(col));

    // Prepare data for the table
    const tableData = filteredData.map(item =>
        filteredColumns.map(col => item[col] !== undefined ? item[col] : '-')
    );

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add table to PDF
    doc.autoTable({
        head: [filteredColumns],
        body: tableData,
        margin: { top: 10 },
        styles: { fontSize: 8 },
        headStyles: { fillColor: '#343a40' },
        columnStyles: { text: { cellWidth: 'wrap' } },
    });

    doc.save('data.pdf');
};

export default exportToPDF;
