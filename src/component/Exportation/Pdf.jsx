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


    const tableData = filteredData.map(item =>
        visibleColumns.map(col => item[col] !== undefined ? item[col] : '-')
    );

    const doc = new jsPDF();

    doc.autoTable({
        head: [visibleColumns],
        body: tableData,
        margin: { top: 10 },
        styles: { fontSize: 8 },
        headStyles: { fillColor: '#343a40' },
        columnStyles: { text: { cellWidth: 'wrap' } },
        didDrawPage: (data) => {
            const pageNumber = doc.internal.getNumberOfPages();
            const pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;

            doc.setFontSize(10);
            doc.text(`Page ${pageCurrent} of ${pageNumber}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
        }
    });

    doc.save('data.pdf');
};

export default exportToPDF;
