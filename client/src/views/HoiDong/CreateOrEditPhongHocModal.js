import React, { useEffect, useState } from "react";
import { Button, FormInput, FormGroup} from "shards-react";

import CustomModal from '../../components/common/CustomModal/CustomModal';
import * as Constants from '../../constants/constants';
import { createPhongHoc, updatePhongHocById } from '../../api/phongHocAPI';
import * as Utils from '../../utils/utils';

const CreateOrEditPhongHocModal = ({ isModalOpen, toggleModal, selected, onClose, onCreated, onUpdated }) => {
  const [ phongHoc, setPhongHoc ] = useState(Utils.getNewPhongHoc);

  const onEnter = () => {
    setPhongHoc(selected);
  }

  const onCreateOrUpdateClick = () => {
    console.log(phongHoc);
    if (phongHoc == null || phongHoc._id == null) {
      createPhongHoc(phongHoc)
        .then((res) => {
          onCreated();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      updatePhongHocById(phongHoc._id, phongHoc)
        .then((res) => {
          onUpdated();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }


  return (
    <CustomModal isOpen={isModalOpen} toggle={toggleModal} onClose={onClose}
      onEnter={onEnter}
      title={ (phongHoc == null || phongHoc._id == null) ? "Thêm Phòng học" : "Cập nhật thông tin Phòng học"}
      body={
        <div>
          <div>
            <FormGroup>
              <label htmlFor="feName">Tên Phòng học</label>
              <FormInput
                id="feName"
                value={phongHoc.name}
                onChange={(e) => { setPhongHoc({ ...phongHoc, name: e.target.value }) }}
              />
            </FormGroup>
          </div>
        </div>
      }
      footer={
        <div>
          <Button onClick={onCreateOrUpdateClick}>{phongHoc._id == null ? 'Thêm' : 'Cập nhật'}</Button>
        </div>
      }
    />
  );
}

export default CreateOrEditPhongHocModal;
