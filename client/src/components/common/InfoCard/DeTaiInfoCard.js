import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup, FormGroup,
  FormInput, FormSelect, FormTextarea } from "shards-react";
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';

import { updateDeTaiById, deleteDeTaiById } from '../../../api/deTaiAPI';
import userAtom, { userAsToken } from '../../../recoil/user';
import ColoredTag from '../ColoredTag/ColoredTag';
import ActionButtons from '../ActionButtons';
import * as Utils from '../../../utils/utils';
import CustomModal from '../../common/CustomModal/CustomModal';
import ConfirmDeleteModal from "../../common/ConfirmDeleteModal/ConfirmDeleteModal";


import './styles.css';
import * as Constants from '../../../constants/constants';
import { green } from '@material-ui/core/colors';

const DeTaiInfoCard = ({ deTai, onClick, onUpdate }) => {
  const currentUser = useRecoilValue(userAtom);
  const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
  const [ deTaiToUpdate, setDeTaiToUpdate ] = useState({ ...deTai });

  const getTagColor = (trangThaiDuyet) => {
    switch (trangThaiDuyet) {
      case Constants.DE_TAI_APPROVE_STATUS_REJECTED:
        return 'red';
      case Constants.DE_TAI_APPROVE_STATUS_NOT_APPROVED:
        return 'blue';
      case Constants.DE_TAI_APPROVE_STATUS_APPROVED:
        return 'green';
      default:
        return '#5a6169';
    }
  }

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  }

  const isGVHD = () => {
    return (Utils.isUserValidGiangVien(currentUser) && (currentUser.relatedInfoGV._id == deTai.giangVien._id));
  }

  const isPending = () => {
    return deTai.trangThaiDuyet == Constants.DE_TAI_APPROVE_STATUS_NOT_APPROVED;
  }

  const onUpdateClick = () => {
    toast.promise(
      updateDeTaiById(deTai._id, deTaiToUpdate),
      {
        loading: 'Đang cập nhật',
        success: (res) => {
          // history.push('/de-tai');
          // deTai = { ...res.data };
          setIsEditModalOpen(false);
          onUpdate();
          return 'Cập nhật thành công';
        },
        error: (err) => {
          return Utils.getFormattedErrMsg(err.response.data.message);
        }
      },
      Utils.getToastConfig()
    );
  }

  const onDeleteClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmDeleteModal onClose={onClose} onConfirm={() => {
            toast.promise(
              deleteDeTaiById(deTai._id),
              {
                loading: 'Đang xóa',
                success: (res) => {
                  onUpdate();
                  onClose();
                  return 'Xóa thành công';
                },
                error: (err) => {
                  return Utils.getFormattedErrMsg(err.response.data.message);
                }
              },
              Utils.getToastConfig()
            );
          }} />
        );
      }
    });
  }

  return (
    <div>
      <Card small className="card-post mb-4 info-card">
        <CardBody>
          <div>
            <div style={{ display: 'flex'}}>
              <h5 style={{ flex: 1 }}
                  onClick={onClick}>{deTai.tenDeTai}</h5>
              <div style={{ display: (isPending() && isGVHD()) ? 'block' : 'none' }}>
                <ActionButtons
                  onDeleteClick={() => { onDeleteClick() }}
                  onEditClick={() => { setIsEditModalOpen(true) }}
                />
              </div>
            </div>
            <div onClick={onClick}>
              <p>{deTai.moTa}</p>
              <p><i class="material-icons icon">info</i><span className="label">Tên tiếng Anh:</span>{deTai.englishName}</p>
              <p><i class="material-icons icon">event</i><span className="label">Kỳ thực hiện:</span>{deTai.kyThucHien.name}</p>
              <p><i class="material-icons icon">school</i><span className="label">Hệ đào tạo:</span>{Utils.getHeDaoTaoText(deTai.heDaoTao)}</p>
              <p><i class="material-icons icon">person</i><span className="label">GV Hướng dẫn:</span>{deTai.giangVien.name}</p>
              <p><i class="material-icons icon">people</i><span className="label">SV Thực hiện:</span>{
                deTai.sinhVienThucHien.map((sinhVien, index) => index != 0 ? `, ${sinhVien.name}` : sinhVien.name)
              }</p>
              <div className="status-tag">
                <ColoredTag label={ Utils.getDeTaiApproveStatusText(deTai.trangThaiDuyet) } color={ getTagColor(deTai.trangThaiDuyet) }/>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <CustomModal
        isOpen={isEditModalOpen}
        toggle={toggleEditModal}
        title="Chỉnh sửa đề xuất"
        body={
          <div >
            <FormGroup>
              <label htmlFor={`deTaiName`}>Tên đề tài</label>
              <FormInput id={`deTaiName`}
                  onChange={(e) => { setDeTaiToUpdate({ ...deTaiToUpdate, tenDeTai: e.target.value }) }}
                  value={deTaiToUpdate.tenDeTai} />
            </FormGroup>
            <FormGroup>
              <label htmlFor={`englishName`}>Tên đề tài (Tiếng Anh)</label>
              <FormInput id={`englishName`} placeholder="Nhập tên đề tài tiếng Anh"
                  onChange={(e) => { setDeTaiToUpdate({ ...deTaiToUpdate, englishName: e.target.value }) }}
                  value={deTaiToUpdate.englishName} />
            </FormGroup>
            <FormGroup>
              <label htmlFor={`heDaoTao`}>Hệ đào tạo</label>
              <FormSelect id={`heDaoTao`}
                  onChange={(e) => { setDeTaiToUpdate({ ...deTaiToUpdate, heDaoTao: e.target.value }) }}
                  value={deTaiToUpdate.heDaoTao}>
                <option value=''>Chọn Hệ đào tạo...</option>
                <option value={Constants.DE_TAI_HDT_DAI_TRA}>Đại trà</option>
                <option value={Constants.DE_TAI_HDT_CHAT_LUONG_CAO}>Chất lượng cao</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <label htmlFor={`moTa`}>Mô tả</label>
              <FormTextarea id={`moTa`}
                  onChange={(e) => { setDeTaiToUpdate({ ...deTaiToUpdate, moTa: e.target.value }) }}
                  value={deTaiToUpdate.moTa} />
            </FormGroup>
          </div>
        }
        footer={
          <div>
            <Button onClick={() => { onUpdateClick() }}>Cập nhật</Button>
          </div>
        }
      />
    </div>
  );
}

export default DeTaiInfoCard
