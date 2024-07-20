/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

export default function MainModal(){
    const dispatch = useDispatch();
    const isShow = useSelector(state=>state.isShow);
    const currentEtat = useSelector(state=>state.currentEtat);
    const FiltreData = useSelector((state) => state.dataFiltre);

    const [distinctValues,setDistinctValues] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState();
    const [isLoading, setIsLoading] = useState(false);

    
    const getReservations = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://127.0.0.1:8000/api/etats/reservations');
            dispatch({type: 'ADD_DATA', payload: {data: response.data}});
            setIsLoading(false);
    
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    }

    const getEncaissements = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://127.0.0.1:8000/api/etats/encaissements');
            dispatch({type: 'ADD_DATA', payload: {data: response.data}});
            setIsLoading(false);
    
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    }

    const PostReservations = async (conditions) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/etats/getreservationsdata', {conditions});
            dispatch({type: 'ADD_DATA', payload: {data: response.data}});
            console.log(response.data);
            setSelectedOptions({});
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    }

    const getDistinctValues = (array, keys) => {
        const distinctValues = keys.reduce((acc, key) => {
            const seen = new Set();
            const distinctObjects = array.filter(item => {
            const value = item[key];
            if (seen.has(value)) {
                return false;
            }
            seen.add(value);
            return true;
            });
            acc[key] = distinctObjects;
            return acc;
        }, {});
        return distinctValues;
    };

    /* --------------- HANDLE FUNCTIONS ----------------------------- */

    const handleCloseModal = (value) => {
        dispatch({type: 'MODAL_SHOW', payload: {value: value}});
        setSelectedOptions({});
    }

    const handleSelectChange = (event, selectName) => {
        const value = event.target.value;
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [selectName]: value
        }));
    };

    const handleApercu = () =>{
        if(currentEtat === 'Etat des réservations'){
            PostReservations(selectedOptions);
        }
        dispatch({type: 'MODAL_SHOW', payload: {show: false}});
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSelectedOptions(prevOptions => {return {...prevOptions, [id]: value}})
    }

    const handleSEntreChange = (e) => {
        const { id, value } = e.target;
        setSelectedOptions(prevOptions => {return {...prevOptions, [id]: value}})
    }

    /* ---------------- Use Effects ----------------------- */

    useEffect(()=>{
        if(currentEtat === 'Etat des réservations'){
            getReservations();
            setSelectedOptions({fSelectEntre: "Prix_Vente"});
        }
        if(currentEtat === 'Etat des encaissements'){
            getEncaissements();
            setSelectedOptions();
        }
        console.log(currentEtat);
    }, [currentEtat])

    useEffect(()=>{
        const distinctValues = getDistinctValues(FiltreData, ['Societe','Projet','Tranche','GH','Immeuble','Etage','Nature','Standing','Commercial','Ville_Adresse']);
        setDistinctValues(distinctValues);
    },[FiltreData])



    useEffect(()=>{
        console.log(selectedOptions);
    },[selectedOptions]);

    /* ---------------------------------------------------------- */


    return(
        <>
            <Modal onHide={() => handleCloseModal(false)} dialogClassName="custom-modal-dialog" show={isShow} size='lg' className='the-main-modal' animation={true} backdropClassName="custom-backdrop" centered>
                <div className='modal-content custom-modal-content'>
                    <Modal.Header className='header'>
                        <Modal.Title className='main-header-title'>{currentEtat}</Modal.Title>
                        <div className='button-div'>
                            <button className='header-right-button' onClick={() => handleCloseModal(false)}><i className="bi bi-x-lg button-close"></i></button>
                        </div>
                    </Modal.Header>
                    {isLoading ? 
                        <Loading />
                    :
                        <Modal.Body className='body'>
                            <div className='modal-body-content-flex'>
                                <div className='select-container'>
                                    <label htmlFor='select-societe'>Societe</label>
                                    <select id='select-societe' className='form-select filtrage-select'             
                                        onChange={event => handleSelectChange(event, "Societe")}
                                        
                                    >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                            {distinctValues.Societe && distinctValues.Societe.length > 0 ? (
                                                distinctValues.Societe.map((data, index) => (
                                                <option key={index} value={data.Societe}>{data.Societe}</option>
                                                ))
                                            ) : (
                                                <option>Aucune donnée disponible</option>
                                            )}
                                    </select>
                                </div>

                                <div className='select-container'>
                                    <label htmlFor='select-programme'>Programme</label>
                                    <select id='select-programme' className='form-select filtrage-select'
                                        onChange={event => handleSelectChange(event, "Projet")}
                                    >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                    {distinctValues.Projet && distinctValues.Projet.length > 0 ? (
                                        distinctValues.Projet.map((data, index) => (
                                        <option key={index} value={data.Projet}>{data.Projet}</option>
                                        ))
                                    ) : (
                                        <option>Aucune donnée disponible</option>
                                    )}
                                    </select>
                                </div>
                                <div className='select-container'>
                                    <label htmlFor='select-tranche'>Tranche</label>
                                        <select id='select-tranche' className='form-select filtrage-select'
                                            onChange={event => handleSelectChange(event, "Tranche")}

                                        >
                                            <option value=""  hidden>
                                                choisir une option
                                            </option>
                                            <option value=""  >
                                                
                                            </option>
                                        {distinctValues.Tranche && distinctValues.Tranche.length > 0 ? (
                                            distinctValues.Tranche.map((data, index) => (
                                            <option key={index} value={data.Tranche}>{data.Tranche}</option>
                                            ))
                                        ) : (
                                            <option>Aucune donnée disponible</option>
                                        )}
                                        </select>
                                </div>
                                                            
                                <div className='select-container'>

            
                                    <label htmlFor='select-groupement'>Groupement</label>
                                    <select id='select-groupement' className='form-select filtrage-select'
                                        onChange={event => handleSelectChange(event, "GH")}

                                    >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                    {distinctValues.GH && distinctValues.GH.length > 0 ? (
                                        distinctValues.GH.map((data, index) => (
                                        <option key={index} value={data.GH}>{data.GH}</option>
                                        ))
                                    ) : (
                                        <option>Aucune donnée disponible</option>
                                    )}
                                    </select>

                                </div>
                                <div className='select-container'>
                                    <label htmlFor='select-immeuble'>Immeuble</label>
                                    <select id='select-immeuble' className='form-select filtrage-select'
                                        onChange={event => handleSelectChange(event, "Immeuble")}

                                    >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                        {distinctValues.Immeuble && distinctValues.Immeuble.length > 0 ? (
                                            distinctValues.Immeuble.map((data, index) => (
                                            <option key={index} value={data.Immeuble}>{data.Immeuble}</option>
                                            ))
                                        ) : (
                                            <option>Aucune donnée disponible</option>
                                        )}
                                    </select>
                                </div>
                                
                                <div className='select-container'>
                                    <label htmlFor='select-etage'>Etage</label>
                                    <select id='select-etage' className='form-select filtrage-select'
                                        onChange={event => handleSelectChange(event, "Etage")}

                                    >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                        {distinctValues.Etage && distinctValues.Etage.length > 0 ? (
                                            distinctValues.Etage.map((data, index) => (
                                            <option key={index} value={data.Etage}>{data.Etage}</option>
                                            ))
                                        ) : (
                                            <option>Aucune donnée disponible</option>
                                        )}
                                    </select>

                                </div>
                                <div className='select-container'>
                                    <label htmlFor='select-nature'>Nature de Bien</label>
                                    <select id='select-nature' className='form-select filtrage-select'
                                        onChange={event => handleSelectChange(event, "Nature")}

                                    >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                        {distinctValues.Nature && distinctValues.Nature.length > 0 ? (
                                            distinctValues.Nature.map((data, index) => (
                                            <option key={index} value={data.Nature}>{data.Nature}</option>
                                            ))
                                        ) : (
                                            <option>Aucune donnée disponible</option>
                                        )}
                                    </select>

                                </div>
                            <div className='select-container'>
                                <label htmlFor='select-standing'>Standing</label>
                                    <select id='select-standing' className='form-select filtrage-select'
                                        onChange={event => handleSelectChange(event, "Standing")}

                                    >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                        {distinctValues.Standing && distinctValues.Standing.length > 0 ? (
                                            distinctValues.Standing.map((data, index) => (
                                            <option key={index} value={data.Standing}>{data.Standing}</option>
                                            ))
                                        ) : (
                                            <option>Aucune donnée disponible</option>
                                        )}
                                    </select>

                            </div>
                                
                            <div className='select-container'>
                                        <label htmlFor='select-commercial'>Commercial</label>
                                        <select id='select-commercial' className='form-select filtrage-select'
                                            onChange={event => handleSelectChange(event, "Commercial")}

                                        >
                                        <option value=""  hidden>
                                            choisir une option
                                        </option>
                                        <option value=""  >
                                            
                                        </option>
                                        {distinctValues.Commercial && distinctValues.Commercial.length > 0 ? (
                                            distinctValues.Commercial.map((data, index) => (
                                            <option key={index} value={data.Commercial}>{data.Commercial}</option>
                                            ))
                                        ) : (
                                            <option>Aucune donnée disponible</option>
                                        )}
                                        </select>
                                    </div>

                                {currentEtat === 'Etat des réservations' 
                                ?
                                    <>                               
                                        <div className='select-container'>
                                            <label htmlFor='select-ville'>Ville</label>
                                            <select id='select-ville' className='form-select filtrage-select'
                                                onChange={event => handleSelectChange(event, "Ville_Adresse")}

                                            >
                                            <option value=""  hidden>
                                                choisir une option
                                            </option>
                                            <option value=""  >
                                                
                                            </option>
                                                {distinctValues.Ville_Adresse && distinctValues.Ville_Adresse.length > 0 ? (
                                                    distinctValues.Ville_Adresse.map((data, index) => (
                                                    <option key={index} value={data.Ville_Adresse}>{data.Ville_Adresse}</option>
                                                    ))
                                                ) : (
                                                    <option>Aucune donnée disponible</option>
                                                )}
                                            </select>
                                        </div>
                                        <div className="modal-body-content-bottom">
                                            <div className="div-select-entre">
                                                <select id='fSelectEntre' className='form-select entre-select' onChange={(e) => handleSEntreChange(e)} >
                                                    <option value="Prix_Vente">Prix de vente</option>
                                                    <option value="Reliquat">Reliquat</option>
                                                </select>
                                            </div>
                                            
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="fEntre" onChange={(e) => handleInputChange(e)}/>
                                                <label htmlFor="fEntre">Entre</label>
                                            </div>
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="fEt" onChange={(e) => handleInputChange(e)} />
                                                <label htmlFor="fEt">Et</label>
                                            </div>
                                        </div>
                                    </>
                                :
                                null
                                }

                                {currentEtat === 'Etat des encaissements'
                                ?
                                    <>                               
                                        <div className='select-container'>
                                            <label htmlFor='select-ville'>Ville</label>
                                            <select id='select-ville' className='form-select filtrage-select'
                                                onChange={event => handleSelectChange(event, "Lieu_Encaissement")}

                                            >
                                            <option value=""  hidden>
                                                choisir une option
                                            </option>
                                            <option value=""  >
                                                
                                            </option>
                                                {distinctValues.Lieu_Encaissement && distinctValues.Lieu_Encaissement.length > 0 ? (
                                                    distinctValues.Lieu_Encaissement.map((data, index) => (
                                                    <option key={index} value={data.Lieu_Encaissement}>{data.Lieu_Encaissement}</option>
                                                    ))
                                                ) : (
                                                    <option>Aucune donnée disponible</option>
                                                )}
                                            </select>
                                        </div>

                                        <div className="modal-body-content-bottom">
                                            <div className="div-select-entre">
                                                <select id='fSelectEntre' className='form-select entre-select' onChange={(e) => handleSEntreChange(e)} >
                                                    <option value="date_encaissement">Date Encaissement</option>
                                                    <option value="Date_Sort">Date Sort</option>
                                                    {/* <option value="">Date Création</option> */}
                                                    <option value="Date_Prev_Enc">Date Prévu Encaissement</option>
                                                    <option value="Date_Remise">Date Remise</option>
                                                </select>
                                            </div>
                                            
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="DateEntre" onChange={(e) => handleInputChange(e)}/>
                                                <label htmlFor="fEntre">Entre</label>
                                            </div>
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="DateEt" onChange={(e) => handleInputChange(e)} />
                                                <label htmlFor="fEt">Et</label>
                                            </div>
                                        </div>

                                        <div className="modal-body-content-bottom">
                                            <label htmlFor="">Montant</label>
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="fEntre" onChange={(e) => handleInputChange(e)}/>
                                                <label htmlFor="fEntre">Entre</label>
                                            </div>
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="fEt" onChange={(e) => handleInputChange(e)} />
                                                <label htmlFor="fEt">Et</label>
                                            </div>
                                        </div>
                                    </>
                                :
                                null
                                }
                            </div>
                            
                            <div className='btn-parent'>
                                <Link to="/datatable" className='modal-submit-btn'onClick={()=>{handleApercu()}}>Aperçu</Link>
                            </div>
                        </Modal.Body>
                    }
                </div>
            </Modal>
        </>
    )
}