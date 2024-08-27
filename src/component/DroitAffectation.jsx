/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';

export default function DroitAffectation() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [data, setData] = useState([]);

  const GetDroits = async () => {
    const requestData = {
      numUtilisateur: userId
    }
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/affect', {
        withCredentials: true
    });
      setData(response.data);
      console.log('data', response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetDroits();
  }, []);

  

  return (
    <>
      <h1>Droit Affectation Page</h1>
      <div className='SearchInput-Container'>
      {/* <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="SearchInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}
    </div>

    <table>
        <thead>
            <tr>
                <th>Cle</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Action</th>

            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
    {/* <div className='pagination-container'>
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
    </div> */}
    </>
  );
}
