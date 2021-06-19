import React, { useEffect, useState } from 'react';
// import { Modal, ModalBody, ModalHeader, ModalFooter} from "shards-react";
import Modal from 'react-bootstrap/Modal'
// import styles from './styles.module.scss';
import styles from './styles.css';

const CustomTabModal = ({ isOpen, toggle, title, body, footer, onClose, onEnter, size,
    modalTitleList = [], modalBodyList = [] }) => {
  const [ selectedIndex, setSelectedIndex ] = useState(0);

  return (
    <Modal show={isOpen} onHide={toggle} scrollable={true} backdrop="static" onExited={onClose}
      onEnter={onEnter} contentClassName="custom-modal" size={size}>
      <Modal.Header closeButton={true}>
        <Modal.Title as="h5">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mt-n10">
          <div className="title-container">
            { modalTitleList.map((title, index) => (
              <div className={index == selectedIndex ? "title title--active" : "title"}
                  onClick={() => { setSelectedIndex(index) }}
                  >{modalTitleList[index]}</div>
            )) }
          </div>
          <div className="modal-body-container">
            { modalBodyList[selectedIndex] }
          </div>
        </div>
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

export default CustomTabModal;
