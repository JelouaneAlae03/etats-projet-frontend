/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { FunnelSimple, X } from '@phosphor-icons/react';
import axios from "axios";
import Loading from "../Loading";

export default function ModalEditDroit({isShowEdit, setIsShowEdit, data, setDataEdit}) {
    const [form, setForm] = useState([]);
    const [nomDroit, setNomDroit] = useState(null);
    const [codeForm, setCodeForm] = useState(null);
    const [descriptif, setDescriptif] = useState(null);

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
        setDataEdit({});
        setNomDroit(null);
        setCodeForm(null);
        setDescriptif(null);
        setIsShowEdit(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            Code: data.Cle,
            Droit: nomDroit ?? data.Droit,
            Formulaire: codeForm ?? data.CleForm, 
            Descriptif: descriptif ?? data.Descriptif
        };
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/droits/update-droit', payload, {
                withCredentials: true
            });
            console.log(response.data);
            handleCloseModal(false);
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <>
        <Modal dialogClassName="custom-modal-dialog" show={isShowEdit} size='lg' className='the-main-modal' animation={true} backdropClassName="custom-backdrop" centered>
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
                        {console.log(data)}
                        {form.length === 0 ? 
                        <Loading />
                        :
                        <div className='modal-body-content-flex'>
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div class="form-group">
                                        <label for="cle">Cle</label>
                                        <input type="text" className="form-control" id="cle" value={data.Cle} disabled />
                                    </div>
                                    <div class="form-group">
                                        <label for="droit">Droit</label>
                                        <input type="text" className="form-control" id="droit" placeholder='Nom du droit' defaultValue={data.Droit} onChange={(e) => setNomDroit(e.target.value)}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="formulaire">Formulaire</label>
                                        <select className="form-control" id="formulaire" onChange={(e) => setCodeForm(e.target.value)} >
                                            {form.map((form, index) => (
                                                form.Code === data.CleForm ? (
                                                    <option key={index} value={form.Code} selected>
                                                        {form.Formulaire} - {form.Descriptif}
                                                    </option>
                                                ) : (
                                                    <option key={index} value={form.Code}>
                                                        {form.Formulaire} - {form.Descriptif}
                                                    </option>
                                                )
                                            ))}
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="descriptif">Descriptif</label>
                                        <input type="text" className="form-control" id="descriptif" placeholder='Descriptif du droit' defaultValue={data.Descriptif} onChange={(e) => setDescriptif(e.target.value)} />
                                    </div>
                                    <input type="submit" value="Edit" />
                                </form>
                            </div>
                        }

                    </Modal.Body>
                </div>
            </Modal>
        </>
    )
};
