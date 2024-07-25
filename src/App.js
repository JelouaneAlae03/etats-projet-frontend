/* eslint-disable react-hooks/exhaustive-deps */

import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EtatsContainer from './component/EtatsContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './component/NavBar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainModal from './component/modal/MainModal';
import { useDispatch } from 'react-redux';
import RESERVATION_DATATABLE from './component/Datatable/Reserv-Datatable/reservationDatatable.jsx';
import ENCAISSEMENT_DATATABLE from './component/Datatable/Encaiss-Datatable/encaissemenetDatatable.jsx';
import StockDataTable from './component/Datatable/Stock-Datatable/StockDataTable.jsx';
import { Login } from './component/Login/Login.jsx';



function App() {
  const dispatch = useDispatch()
  const [groupedEtats, setGroupedEtats] = useState([]);
  const [filtredEtats,setFiltredEtats] = useState([]);

  const getEtats = async () => {
    try {
      dispatch({type: 'LOADING', payload: {value: true}});
      const response = await axios.get('http://127.0.0.1:8000/api/etats');
      const data = groupBy(response.data, 'Module');
      console.log("etats", response.data);
      setGroupedEtats(data);
      setFiltredEtats(data);
      dispatch({type: 'LOADING', payload: {value: false}});
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  }

const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
     
      if (currentValue[key] !== null) {
          const groupKey = currentValue[key];

          if (!result[groupKey]) {
              result[groupKey] = [];
          }

          result[groupKey].push(currentValue);
      }
      return result;
  }, {});
};
  const handleSearch = (search) => {
    const newFilteredData = {};

    if (search !== null) {
      Object.keys(groupedEtats).forEach(key => {
        if (Array.isArray(groupedEtats[key])) {
          newFilteredData[key] = groupedEtats[key].filter(item =>
            Object.values(item).some(value =>
              typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())
            )
          );
        } else {
          newFilteredData[key] = groupedEtats[key];
        }
      });
    } else {
      setFiltredEtats(groupedEtats);
    }

    setFiltredEtats(newFilteredData);
  };

  useEffect(() => {
    getEtats();
  }, []);

  return (
    <Router>
      <NavBar handleSearch={handleSearch}/>
      <MainModal />
      <Routes>
      <Route
          path="/login"
          element={<Login />
          }
        />
        <Route
          path="/"
          element={<EtatsContainer filtredEtats={filtredEtats} />
          }
        />
        <Route
          path="/reservation_datatable"
          element={<RESERVATION_DATATABLE />
          }
        />
        <Route
          path="/encaissement_datatable"
          element={<ENCAISSEMENT_DATATABLE />
          }
        />
                <Route
          path="/stock_datatable"
          element={<StockDataTable />
          }
        />
      </Routes>

    </Router>

  );
}

export default App;
