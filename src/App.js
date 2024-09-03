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
import Datatable from './component/Datatable/DataTable.jsx';
import { Login } from './component/Login/Login.jsx';
import { useLocation } from 'react-router-dom';
import { UsersList } from './component/UsersList.jsx';
// import { UserDetails } from './component/UserDetails.jsx';
import { Settings } from './component/Settings.jsx';
import DroitAffectation from './component/DroitAffectation';
import Error from './component/Error.jsx';


function App() {
  const location = useLocation();
  // if (checkDroits(listDroits,'dkfjsd')) {

  // }
  
    return (
      <>
        <MainModal />
        {location.pathname !== '/' && <NavBar />}
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/"
            element={<EtatsContainer />}
          />
          <Route
            path="/datatable"
            element={<Datatable />}
          />
          <Route
            path="/Users"
            element={<UsersList />}
          />

          {/* <Route path="/users/:id" element={<UserDetails/>} /> */}
          <Route path="/configuration" element={<Settings/>} />
          <Route
            path="/affect-droits/:id"
            element={<DroitAffectation />}
          />
          <Route path="*" element={<Error/>} />

          

        </Routes>
      </>
    );
  };



export default App;
