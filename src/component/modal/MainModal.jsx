import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './index.css';
import { useDispatch, useSelector } from 'react-redux';

export default function MainModal(){
    const dispatch = useDispatch();
    const isShow = useSelector(state=>state.isShow);
    const currentEtat = useSelector(state=>state.currentEtat);
    const handleCloseModal = (value) => {
        dispatch({type: 'MODAL_SHOW', payload: {value: value}});
    }
    const data = [
        {id: 1, name: "mehdi", options: [{id: "M1", name: "XXX"}, {id: "M2", name: "YYY"}, {id: "M3", name: "ZZZ"}]},
        {id: 2, name: "walid", options: [{id: "W1", name: "XXX"}, {id: "W2", name: "YYY"}, {id: "W3",name: "ZZZ"}]},
    ]
    return(
        <>
            <Modal onHide={() => handleCloseModal(false)} dialogClassName="custom-modal-dialog" show={isShow} size='m' className='the-main-modal' animation={true} backdropClassName="custom-backdrop" centered>
                <div className='modal-content custom-modal-content'>
                    <Modal.Header className='header'>
                        <Modal.Title className='main-header-title'>{currentEtat}</Modal.Title>
                        <div className='button-div'>
                            <button className='header-right-button' onClick={() => handleCloseModal(false)}><i className="bi bi-x-lg button-close"></i></button>
                        </div>
                    </Modal.Header>
                    <Modal.Body className='body'>
                        <div className='modal-body-content'>
                            {data.map((d) => (
                                <>
                                <label htmlFor={`x-${d.name}`}>{d.name}</label>
                                <select id={`x-${d.name}`} className='form-select filtrage-select'>
                                    {d.options.map((dt)=>(
                                        <option value={dt.id}>{dt.name}</option>
                                    ))}
                                </select>
                            </>
                            ))}
                            <div className='btn-parent'>
                                <button className='modal-submit-btn'>Aperçu</button>
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    )
}