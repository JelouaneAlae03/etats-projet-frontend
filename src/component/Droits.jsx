import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import ReactPaginate from "react-paginate";
import './Droits.css';
import { Plus } from "@phosphor-icons/react";
import ModalDroit from "./modalDroit/ModalDroit";
import ModalEditDroit from "./modalDroit/ModalEditDroit";
import ConfirmationModal from './ConfirmationModal'; 

export default function Droits({setActiveMenuItem}) {
  const [droits, setDroits] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataEdit, setDataEdit] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/droits/delete",{dataDelete},
        {
          withCredentials: true,
        });
      setShowModal(false);
      GetAllDroits();
    } catch (err) {
      console.log(err);
    }
    
  };


  const GetAllDroits = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/droits",
        {
          withCredentials: true,
        });
      setDroits(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetAllDroits();
  }, [isShow, isShowEdit]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const filteredDroits = droits.filter(
    (droits) =>
      droits.Droit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      droits.Cle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      droits["Cle_formulaire"]
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      droits.Descriptif.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageCount = Math.ceil(filteredDroits.length / itemsPerPage);

  const offset = currentPage * itemsPerPage;
  const currentDroits = filteredDroits.slice(offset, offset + itemsPerPage);

  if (droits.length === 0) {
    return <Loading />;
  }
  return (
    <div className="parent-droits">
      <div className="droitsHeader-container">
        <button type="button" className="btn btn-primary ajouter-droit" onClick={() => setIsShow(true)}><Plus size={17} weight="bold" /><span>Ajouter Un Droit</span></button>
        <ModalDroit isShow={isShow} setIsShow={setIsShow} nextCle={parseInt(droits[droits.length - 1].Cle) + 1} />
        <input
          type="text"
          placeholder="Rechercher un droit..."
          className="SearchInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Cle</th>
            <th>Droit</th>
            <th>Cle_formulaire</th>
            <th>Descriptif</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentDroits && currentDroits.length > 0 ? (
            currentDroits.map((droit, index) => (
              <tr key={index}>
                <td>{droit.Cle}</td>
                <td>{droit.Droit}</td>
                <td>{droit.Cle_formulaire}</td>
                <td>{droit.Descriptif}</td>
                <td><button className="btn btn-warning" onClick={() => {
                    setDataEdit({"Cle": droit.Cle, "Droit": droit.Droit, "CleForm": droit.Cle_formulaire, "Descriptif" : droit.Descriptif});
                    setIsShowEdit(true); }}>Modifier</button>
                    <button variant="danger" className="btn btn-danger m-2" 
                    onClick={()=>{setDataDelete({"Cle": droit.Cle, "Droit": droit.Droit, "CleForm": droit.Cle_formulaire, "Descriptif" : droit.Descriptif});handleDelete()}}>
                      Supprimer
                    </button>
                    
                    </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No Droits was found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
      <ConfirmationModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        handleConfirm={handleConfirmDelete} 
      />
      <ModalEditDroit isShowEdit={isShowEdit} setIsShowEdit={setIsShowEdit} data={dataEdit} setDataEdit={setDataEdit} />
    </div>
  );
}
