import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalHeader, FormGroup, FormInput, FormSelect } from "shards-react";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Scrollbars } from 'react-custom-scrollbars-2';

import styles from './DeXuatButton.module.scss';

const DeXuatButton = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ deXuatCount, setDeXuatCount ] = useState(1);
  // const [ deXuatList, setDeXuatList ] = useState([{}])
  const toggleModal = () => {
    setIsOpen(!isOpen);
  }
  const renderDexuat = (count) => {
    return (
      <div className={styles['de-xuat-container']}>
        <div className={styles['title']}>Đề tài {count}</div>
        <RemoveCircleOutlineIcon className={styles['close-button']}/>
        <FormGroup>
          <label htmlFor={`deTaiName${count}`}>Tên đề tài</label>
          <FormInput id={`deTaiName${count}`} placeholder="Phần mềm Quản lý Thư viện" />
        </FormGroup>
        <FormGroup>
          <label htmlFor={`heDaoTao${count}`}>Hệ đào tạo</label>
          <FormSelect id={`heDaoTao${count}`}>
            <option>Chọn Hệ đào tạo...</option>
            <option>Đại trà</option>
            <option>Chất lượng cao</option>
          </FormSelect>
        </FormGroup>
      </div>
    );
  }
  const onAddDeXuatClick = () => {
    setDeXuatCount(deXuatCount + 1);
  }
  const onRemoveClick = () => {

  }
  return (
    <div>
      <Button onClick={toggleModal}>Click</Button>
      <Modal open={isOpen} toggle={toggleModal}>
        <ModalHeader>Đề xuất đề tài</ModalHeader>
        <ModalBody>
          <Scrollbars className={styles['list-de-tai-container']}
            autoHeight
            autoHeightMin={0}
            autoHeightMax={459}>
            {
              Array.from(Array(deXuatCount)).map((value, index) => renderDexuat(index + 1))
            }
          </Scrollbars>
          <Button className={styles['add-de-xuat-button']}
            onClick={onAddDeXuatClick}>
            <ControlPointIcon />
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DeXuatButton;
