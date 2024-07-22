import * as XLSX from 'xlsx';

const exportToExcel = (data, headers, keys, fileName) => {
  const worksheetData = [headers, ...data.map(item => keys.map(key => item[key]))];

  const ws = XLSX.utils.aoa_to_sheet(worksheetData);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

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
