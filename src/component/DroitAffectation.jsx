/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import ModalAffectation from "./ModalAffectation/ModalAffectation";

export default function DroitAffectation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [allRights, setAllRights] = useState([]);
  const [fltrRights, setFltrRights] = useState([]);
  const [removedRight, setRemovedRight] = useState({});
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const GetDroits = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/affect', {
        NumUtilisateur: id
      }, {
        withCredentials: true
      });
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetDroits();
  }, []);

  useEffect(() => {
    if (isShow) {
      getAllRights(); 
    }
  }, [isShow]);

  useEffect(() => {
    if (isShow && allRights.length > 0) {
      const filteredRights = allRights.filter(allRight => 
        !data.some(dataItem => 
          dataItem.Cle_Droit === allRight.Cle &&
          dataItem.Code_Formulaire === allRight.Cle_formulaire
        )
      );
      setFltrRights(filteredRights);
    }
  }, [allRights]);

  useEffect(() => {
    if (data.length > 0) {
      const filtered = data.filter(item =>
        item.Droit_Nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Droit_Descriptif.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
      setPageCount(Math.ceil(filtered.length / itemsPerPage));
    }
  }, [searchQuery, data, itemsPerPage]);

  useEffect(() => {
    const offset = currentPage * itemsPerPage;
    setFilteredData(prevData => prevData.slice(offset, offset + itemsPerPage));
  }, [currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset to the first page when the search query changes
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleSwitchModal = () => {
    setIsShow(!isShow);
  };

  const getAllRights = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/affect/allrights', {}, {
        withCredentials: true,
      });
      setAllRights(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeUserRight = async () => {
    if (removedRight) {
      try {
        await axios.post('http://127.0.0.1:8000/api/affect/remove-user-right', removedRight, {
          withCredentials: true
        });
        console.log('Right removed successfully');
        setRemovedRight({});
        GetDroits();
      } catch (error) {
        console.error('Error removing right:', error);
      }
    }
  };

  useEffect(() => {
    if (removedRight && Object.keys(removedRight).length > 0) {
      removeUserRight();
    }
  }, [removedRight]);

  return (
    <>
      <h2>Nom d'utilisateur : {data && data.length > 0 && data[0].Nom_Utilisateur}</h2>
      <div className='SearchInput-Container'>
      <button className='btn btn-primary mx-3' onClick={handleSwitchModal}>+ Ajouter Droits</button>

        <input
          type="text"
          placeholder="Rechercher un droit..."
          className="SearchInput"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <ModalAffectation 
          isShow={isShow} 
          setIsShow={setIsShow} 
          fltrRights={fltrRights} 
          Code_Utilisateur={data && data.length > 0 && data[0].Code_Utilisateur}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Cle Droit</th>
            <th>Nom Droit</th>
            <th>Descriptif Droit</th>
            <th>Cle Formulaire</th>
            <th>Nom Formulaire</th>
            <th>Descriptif Formulaire</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.Cle_Droit}</td>
              <td>{item.Droit_Nom}</td>
              <td>{item.Droit_Descriptif}</td>
              <td>{item.Code_Formulaire}</td>
              <td>{item.Formulaire_Nom}</td>
              <td>{item.Formulaire_Descriptif}</td>
              <td>
                <button 
                  className="btn btn-warning" 
                  onClick={() => {
                    setRemovedRight({
                      Code_Droit: item.Cle_Droit, 
                      Code_Formulaire: item.Code_Formulaire, 
                      Code_Utilisateur: item.Code_Utilisateur
                    });
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='pagination-container'>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </>
  );
}
