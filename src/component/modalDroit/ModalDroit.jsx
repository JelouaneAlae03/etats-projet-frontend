import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { FunnelSimple, X } from '@phosphor-icons/react';
import axios from "axios";
import Loading from "../Loading";

export default function ModalDroit({isShow, setIsShow, nextCle}) {
    const [form, setForm] = useState([]);
    const [nomDroit, setNomDroit] = useState('');
    const [codeForm, setCodeForm] = useState(null);
    const [descriptif, setDescriptif] = useState('');

    const GetAllFormulaires = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/droits/info-formulaires",
            {
              withCredentials: true,
            });
            setForm(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        GetAllFormulaires();
      }, []);

    const handleCloseModal = (value) => {
        setIsShow(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/droits/add-droit', {"Code": nextCle, "Droit" : nomDroit, "Formulaire" : codeForm, "Descriptif": descriptif}, {
                withCredentials: true
            });
            console.log(response.data);
            setIsShow(false);
            //window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <>
        <Modal dialogClassName="custom-modal-dialog" show={isShow} size='lg' className='the-main-modal' animation={true} backdropClassName="custom-backdrop" centered>
                <div className='modal-content custom-modal-content'>
                    <Modal.Header className='header'>
                        <div className='upper-header'>
                            <div>
                                <div className='upper-header-left'>
                                    <FunnelSimple size={32} weight="bold" />
                                </div>
                                <div className='bottom-header'>
                                    <Modal.Title className='main-header-title'>Ajouter Un Droit</Modal.Title>
                                </div>
                            </div>
                            <div className='button-div'>
                                <button className='header-right-button' onClick={() => handleCloseModal(false)}><X size={30} weight="bold" /></button>
                            </div>
                        </div>
                    </Modal.Header>
                    
                    <Modal.Body className='body'>
                        {form.length === 0 ? 
                        <Loading />
                        :
                        <div className='modal-body-content-flex'>
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div class="form-group">
                                        <label for="cle">Cle</label>
                                        <input type="text" className="form-control" id="cle" value={nextCle} disabled />
                                    </div>
                                    <div class="form-group">
                                        <label for="droit">Droit</label>
                                        <input type="text" className="form-control" id="droit" placeholder='Nom du droit' onChange={(e) => setNomDroit(e.target.value)}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="formulaire">Formulaire</label>
                                        <select className="form-control" id="formulaire" onChange={(e) => setCodeForm(e.target.value)} >
                                            <option value="" selected disabled>Select an option</option>
                                            {form.map((form, index) => (
                                                <option value={form.Code}>{form.Formulaire} - {form.Descriptif}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="descriptif">Descriptif</label>
                                        <input type="text" className="form-control" id="descriptif" placeholder='Descriptif du droit' onChange={(e) => setDescriptif(e.target.value)} />
                                    </div>
                                    <input type="submit" value="Ajouter" className="btn btn-primary m-2"/>
                                </form>
                            </div>
                        }

                    </Modal.Body>
                </div>
            </Modal>
        </>
    )
};
