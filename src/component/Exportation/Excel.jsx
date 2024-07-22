import * as XLSX from 'xlsx';

const exportToExcel = (data, headers, keys, fileName) => {
  // Add headers to the data
  const worksheetData = [headers, ...data.map(item => keys.map(key => item[key]))];

  // Convert the data to a worksheet
  const ws = XLSX.utils.aoa_to_sheet(worksheetData);

  // Create a new workbook and append the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Generate a binary string representation of the workbook
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Create a Blob and use a link to download the file
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export default exportToExcel;
