import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalHeader, FormGroup, FormInput, FormSelect } from "shards-react";

const EditSinhVienModal = ({ isOpen }) => {
  return (
    <div>
      <Modal open={isOpen}>
        <ModalHeader>Alo</ModalHeader>
        <ModalBody>
          <div>Alo alo</div>>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default EditSinhVienModal;
