/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';

export default function DroitAffectation() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const getDroits = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/affect",
        { withCredentials: true } // Corrected typo here
      );
      const groupedData = response.data.reduce((acc, item) => {
        if (!acc[item.Utilisateur_Nom]) {
            acc[item.Utilisateur_Nom] = [];
        }
        acc[item.Utilisateur_Nom].push(item);
        return acc;
    }, {});
    setData(groupedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDroits();
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
            {data && Object.entries(data).map(([utilisateurNom, records], idx) => (
                    records.map((record, index) => (
                        <tr key={idx + '-' + index}>
                            {/* Display the Utilisateur_Nom only on the first row */}
                            {index === 0 && (
                                <td rowSpan={records.length}>{utilisateurNom}</td>
                            )}
                            <td>{record.Droit_Descriptif}</td>
                            <td>{record.Status}</td>
                        </tr>
                    ))
                ))}
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
