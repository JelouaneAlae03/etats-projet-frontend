/* eslint-disable react-hooks/exhaustive-deps */

import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EtatsContainer from './component/EtatsContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './component/NavBar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainModal from './component/modal/MainModal';



function App() {
  const [etats, setEtats] = useState([]);
  const [groupedEtats, setGroupedEtats] = useState([]);
  const [filtredEtats,setFiltredEtats] = useState([]);
  const [reservations,setReservations] = useState([]);
  const [encaissements,setEncaissements] = useState([]);

  const getEtats = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/etats');
      setEtats(response.data);
      const data = groupBy(response.data, 'Module');
      setGroupedEtats(data);
      setFiltredEtats(data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  }

  const getReservations = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/etats/reservations');
      setReservations(response.data);

    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  }

  const getEncaissements = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/etats/encaissements');
      setEncaissements(response.data);

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
          path="/"
          element={<EtatsContainer filtredEtats={filtredEtats} getEncaissements={getEncaissements} getReservations={getReservations} />
          }
        />
      </Routes>

    </Router>

  );
}

export default App;
