import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalHeader, FormGroup, FormInput, FormSelect } from "shards-react";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Scrollbars } from 'react-custom-scrollbars-2';
import * as Service from '../../utils/utils';

import styles from './DeXuatButton.module.scss';

const DeXuatButton = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ deXuatCount, setDeXuatCount ] = useState(1);
  const [ deXuatList, setDeXuatList ] = useState([{ tmpId: Service.ID(), detaiName: '', heDaoTao: '' }]);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  }
  const renderDexuat = (value, index) => {
    return (
      <div className={styles['de-xuat-container']}>
        <div className={styles['title']}>Đề tài {index + 1}</div>
        <RemoveCircleOutlineIcon className={styles['close-button']}
          onClick={() => onRemoveClick(value.tmpId)}/>
        <FormGroup>
          <label htmlFor={`deTaiName${index}`}>Tên đề tài</label>
          <FormInput id={`deTaiName${index}`} placeholder="Nhập tên đề tài" />
        </FormGroup>
        <FormGroup>
          <label htmlFor={`heDaoTao${index}`}>Hệ đào tạo</label>
          <FormSelect id={`heDaoTao${index}`}>
            <option>Chọn Hệ đào tạo...</option>
            <option>Đại trà</option>
            <option>Chất lượng cao</option>
          </FormSelect>
        </FormGroup>
      </div>
    );
  }
  useEffect(() => {
    setDeXuatCount(deXuatList.length);
    console.log(deXuatCount);
    console.log(deXuatList);
  }, [deXuatList]);
  const onAddDeXuatClick = () => {
    setDeXuatList([ ...deXuatList, { tmpId: Service.ID(), detaiName: '', heDaoTao: '' } ]);
  }
  const onRemoveClick = (id) => {
    if (deXuatCount <= 1) {
      return;
    }
    setDeXuatList([ ...deXuatList.filter((deXuat) => deXuat.tmpId != id) ]);
  }
  return (
    <div>
      <Button onClick={toggleModal}>Test</Button>
      <Modal open={isOpen} toggle={toggleModal}>
        <ModalHeader>Đề xuất đề tài</ModalHeader>
        <ModalBody>
          <Scrollbars className={styles['list-de-tai-container']}
            autoHeight
            autoHeightMin={0}
            autoHeightMax={459}>
            {
              deXuatList.map((value, index) => renderDexuat(value, index))
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
