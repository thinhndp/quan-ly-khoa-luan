import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "shards-react";

const DeXuatButton = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div>
      <Button onClick={toggleModal}>Click</Button>
      <Modal open={isOpen} toggle={toggleModal}>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>👋 Hello there!</ModalBody>
      </Modal>
    </div>
  );
}

export default DeXuatButton;
