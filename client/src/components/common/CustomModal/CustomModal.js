import React from 'react';
// import { Modal, ModalBody, ModalHeader, ModalFooter} from "shards-react";
import Modal from 'react-bootstrap/Modal'
// import styles from './styles.module.scss';
import styles from './styles.css';

// const CustomModal = ({ isOpen, toggle, title, body, footer }) => {
//   return (
//     <Modal open={isOpen} toggle={toggle}>
//       <ModalHeader>{title}</ModalHeader>
//       <ModalBody>
//         {body}
//       </ModalBody>
//       <ModalFooter>
//         {footer}
//       </ModalFooter>
//     </Modal>
//   );
// }
const CustomModal = ({ isOpen, toggle, title, body, footer, onClose, onEnter, size }) => {
  return (
    <Modal show={isOpen} onHide={toggle} scrollable={true} backdrop="static" onExited={onClose}
      onEnter={onEnter} contentClassName="custom-modal" size={size}>
      <Modal.Header closeButton={true}>
        <Modal.Title as="h5">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {body}
      </Modal.Body>
      {
        footer != null && (
          <Modal.Footer>
            {footer}
          </Modal.Footer>
        )
      }
    </Modal>
  );
}

export default CustomModal;
