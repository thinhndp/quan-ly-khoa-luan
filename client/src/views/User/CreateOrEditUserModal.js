import React, { useEffect, useState } from "react";
import { Button, FormInput, FormGroup, FormSelect, Col, Row } from "shards-react";

import CustomModal from '../../components/common/CustomModal/CustomModal';
import * as Constants from '../../constants/constants';
import { createUser, updateUserById } from '../../api/userAPI';
import * as Utils from '../../utils/utils';

const CreateOrEditUserModal = ({ isModalOpen, toggleModal, selected, onClose, onCreated, onUpdated }) => {
  // const [ giangVien, setGiangVien ] = useState(null);
  // let user;
  const [ user, setUser ] = useState(Utils.getNewUser);

  // useEffect(() => {
  //   if (mode === Constants.DETAIL_MODE_EDIT) {
  //     setGiangVien(selectedGV);
  //   }
  // }, [mode]);

  const onEnter = () => {
    setUser(selected);
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
    console.log(user);
    if (user == null || user._id == null) {
      createUser(user)
        .then((res) => {
          onCreated();
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    else {
      updateUserById(user._id, user)
        .then((res) => {
          onUpdated();
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        })
    }
  }


  return (
    <CustomModal isOpen={isModalOpen} toggle={toggleModal} onClose={onClose}
      onEnter={onEnter}
      title={ (user == null || user._id == null) ? "Thêm User" : "Cập nhật thông tin User"}
      body={
        <div>
          <div>
            <FormGroup>
              <label htmlFor="feEmail">Email</label>
              <FormInput
                id="feEmail"
                value={user.email}
                onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="feName">Tên User</label>
              <FormInput
                id="feName"
                value={user.name}
                onChange={(e) => { setUser({ ...user, name: e.target.value }) }}
              />
            </FormGroup>
            <Row form>
              <Col md="6" className="form-group">
                <FormGroup>
                  <label htmlFor="feRole">Vai trò</label>
                  <FormSelect value={user.role} id="feRole"
                      onChange={(e) => {
                        setUser({ ...user, role: e.target.value, canApprove: e.target.value == Constants.USER_ROLE_CN_KHOA ? true : user.canApprove })
                      }}>
                    <option value=''>Chọn...</option>
                    <option value={Constants.USER_ROLE_SINH_VIEN}>Sinh viên</option>
                    <option value={Constants.USER_ROLE_GIANG_VIEN}>Giảng viên</option>
                    <option value={Constants.USER_ROLE_CB_KHOA}>Cán bộ Khoa</option>
                    <option value={Constants.USER_ROLE_CN_KHOA}>Chủ nhiệm Khoa</option>
                  </FormSelect>
                </FormGroup>
              </Col>
              <Col md="6" className="form-group">
                <FormGroup>
                  <label htmlFor="feCanApprove">Quyền duyệt đề xuất</label>
                  <FormSelect value={user.canApprove} id="feCanApprove"
                      disabled={ user.role == Constants.USER_ROLE_CN_KHOA ? true : false }
                      onChange={(e) => { setUser({ ...user, canApprove: e.target.value }) }}>
                    <option value={false}>Không</option>
                    <option value={true}>Có</option>
                  </FormSelect>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </div>
      }
      footer={
        <div>
          <Button onClick={onCreateOrUpdateClick}>{user._id == null ? 'Thêm' : 'Cập nhật'}</Button>
        </div>
      }
    />
  );
}

export default CreateOrEditUserModal;
