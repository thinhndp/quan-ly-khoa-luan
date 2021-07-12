import React, { useEffect, useState } from "react";
import { Button, FormInput, FormGroup} from "shards-react";

import CustomModal from '../../components/common/CustomModal/CustomModal';
import * as Constants from '../../constants/constants';
import { createBieuMau, updateBieuMauById } from '../../api/bieuMauAPI';
import * as Utils from '../../utils/utils';

import toast from 'react-hot-toast';

const CreateOrEditBieuMauModal = ({ isModalOpen, toggleModal, selected, onClose, onCreated, onUpdated }) => {
  // const [ giangVien, setGiangVien ] = useState(null);
  // let bieuMau;
  const [ bieuMau, setBieuMau ] = useState(Utils.getNewBieuMau);

  // useEffect(() => {
  //   if (mode === Constants.DETAIL_MODE_EDIT) {
  //     setGiangVien(selectedGV);
  //   }
  // }, [mode]);

  const onEnter = () => {
    setBieuMau(selected);
  }

  // const toggleMode = () => {
  //   if (mode === Constants.DETAIL_MODE_EDIT) {
  //     setMode(Constants.DETAIL_MODE_VIEW);
  //   }
  //   else {
  //     setMode(Constants.DETAIL_MODE_EDIT);
  //   }
  // }

  const onCreateOrUpdateClick = () => {
    console.log(bieuMau);
    if (bieuMau == null || bieuMau._id == null) {
      toast.promise(
        createBieuMau(bieuMau),
        {
          loading: 'Đang tạo',
          success: (res) => {
            onCreated();
            return 'Tạo thành công';
          },
          error: (err) => {
            return err.response.data.message;
          }
        },
        Utils.getToastConfig()
      );
      /* createBieuMau(bieuMau)
        .then((res) => {
          onCreated();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        }); */
    }
    else {
      toast.promise(
        updateBieuMauById(bieuMau._id, bieuMau),
        {
          loading: 'Đang cập nhật',
          success: (res) => {
            onUpdated();
            return 'Cập nhật thành công';
          },
          error: (err) => {
            return err.response.data.message;
          }
        },
        Utils.getToastConfig()
      );
      /* updateBieuMauById(bieuMau._id, bieuMau)
        .then((res) => {
          onUpdated();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        }) */
    }
  }


  return (
    <CustomModal isOpen={isModalOpen} toggle={toggleModal} onClose={onClose}
      onEnter={onEnter}
      title={ (bieuMau == null || bieuMau._id == null) ? "Thêm Biểu mẫu" : "Cập nhật thông tin Biểu mẫu"}
      body={
        <div>
          <div>
            <FormGroup>
              <label htmlFor="feName">Tên Biểu mẫu</label>
              <FormInput
                id="feName"
                value={bieuMau.name}
                onChange={(e) => { setBieuMau({ ...bieuMau, name: e.target.value }) }}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="feName">Link</label>
              <FormInput
                id="feLink"
                value={bieuMau.link}
                onChange={(e) => { setBieuMau({ ...bieuMau, link: e.target.value }) }}
              />
            </FormGroup>
          </div>
        </div>
      }
      footer={
        <div>
          <Button onClick={onCreateOrUpdateClick}>{bieuMau._id == null ? 'Thêm' : 'Cập nhật'}</Button>
        </div>
      }
    />
  );
}

export default CreateOrEditBieuMauModal;
