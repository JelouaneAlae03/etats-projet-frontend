import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';

const useExportToExcel = () => {
  const data = useSelector((state) => state.filteredData);
  const currentEtat = useSelector((state) => state.currentEtat);
  const [keys, setKeys] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (currentEtat === 'Etat des encaissements') {
      setKeys(['Bien', 'client', 'Prix_Vente', 'montant', 'difference', 'percentage', 'date_encaissement', 'Num_Recu', 'Numero', 'Nature', 'Lib_Banque', 'Lib_Agence', 'Lib_Ville', 'Date_Systeme']);
      setHeaders(['Bien', 'Nom & Prénom', 'P.Vente', 'Encaiss', 'Reliquat', '%', 'Date', 'Reçu', 'N°', 'Nature', 'Banque', 'Agence', 'Ville', 'Création']);
      setFileName('encaissement-table');
    }
  }, [currentEtat]);

  const exportToExcel = () => {
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

  return exportToExcel;
};

export default useExportToExcel;
