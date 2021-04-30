import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter} from "shards-react";

const CustomModal = ({ isOpen, toggle, title, body, footer }) => {
  return (
    <Modal open={isOpen} toggle={toggle}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        {body}
      </ModalBody>
      <ModalFooter>
        {footer}
      </ModalFooter>
    </Modal>
  );
}

export default CustomModal;
