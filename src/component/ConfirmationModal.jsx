import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ConfirmationModal.css';
const ConfirmationModal = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>Confirmer la suppression</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        Etes-vous sûr de vouloir supprimer cet élément ? Cette action ne peut pas être annulée.
      </Modal.Body >
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={()=>{handleConfirm()}}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
