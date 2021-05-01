import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormInput,
  FormGroup, FormSelect } from "shards-react";
import CustomModal from '../../components/common/CustomModal/CustomModal';
import * as Constants from '../../constants/constants';
import { updateGiangVienById } from '../../api/giangVienAPI';

const DeTailGiangVienModal = ({ isGVModalOpen, toggleGVModal, selectedGV, onClose, onUpdateGV }) => {
  const [ giangVien, setGiangVien ] = useState(null);
  const [ mode, setMode ] = useState(Constants.DETAIL_MODE_VIEW);

  useEffect(() => {
    if (mode === Constants.DETAIL_MODE_EDIT) {
      setGiangVien(selectedGV);
    }
  }, [mode]);

  const onEnter = () => {
    setGiangVien(selectedGV);
    setMode(Constants.DETAIL_MODE_VIEW);
  }

  const toggleMode = () => {
    if (mode === Constants.DETAIL_MODE_EDIT) {
      setMode(Constants.DETAIL_MODE_VIEW);
    }
    else {
      setMode(Constants.DETAIL_MODE_EDIT);
    }
  }

  const onUpdateClick = () => {
    console.log(giangVien);
    updateGiangVienById(giangVien._id, giangVien)
      .then((res) => {
        console.log(res);
        onUpdateGV();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CustomModal isOpen={isGVModalOpen} toggle={toggleGVModal} onClose={onClose}
      onEnter={onEnter}
      title="Thông tin Giảng viên"
      body={
        <div>
          { giangVien != null && (
            <div>
              <Row form>
                {/* MSSV */}
                { mode === Constants.DETAIL_MODE_EDIT && (
                  <Col md="6" className="form-group">
                    <label htmlFor="feMaGV">Mã Giảng viên</label>
                    <FormInput
                      id="feMaGV"
                      value={giangVien.maGV}
                      onChange={(e) => { setGiangVien({ ...giangVien, maGV: e.target.value }) }}
                    />
                  </Col>
                ) }
                { mode === Constants.DETAIL_MODE_VIEW && (
                  <Col md="6" className="form-group">
                    <label htmlFor="vMaGV">Mã Giảng viên</label>
                    <p id="vMaGV">{giangVien.maGV}</p>
                  </Col>
                ) }

                {/* Lop SH */}
                <Col md="6" className="form-group">
                  <label htmlFor="feHocHam">Học hàm</label>
                  <FormSelect value={giangVien.hocHam} id="feHocHam"
                      onChange={(e) => { setGiangVien({ ...giangVien, hocHam: e.target.value }) }}>
                    <option value=''>Chọn...</option>
                    <option value={Constants.GIANG_VIEN_HOC_HAM_THS}>Thạc sĩ</option>
                    <option value={Constants.GIANG_VIEN_HOC_HAM_PGS_TS}>Phó Giáo sư Tiến sĩ</option>
                    <option value={Constants.GIANG_VIEN_HOC_HAM_TS}>Tiến sĩ</option>
                  </FormSelect>
                </Col>
              </Row>
              <FormGroup>
                <label htmlFor="feName">Họ tên</label>
                <FormInput
                  id="feName"
                  value={giangVien.name}
                  onChange={(e) => { setGiangVien({ ...giangVien, name: e.target.value }) }}
                />
              </FormGroup>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    value={giangVien.email}
                    onChange={(e) => { setGiangVien({ ...giangVien, email: e.target.value }) }}
                    autoComplete="email"
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePhone">Số điện thoại</label>
                  <FormInput
                    type="number"
                    id="fePhone"
                    value={giangVien.phone}
                    onChange={(e) => { setGiangVien({ ...giangVien, phone: e.target.value }) }}
                  />
                </Col>
              </Row>
              <FormGroup>
                <label htmlFor="feHuongNghienCuu">Hướng nghiên cứu</label>
                <FormInput
                  id="feHuongNghienCuu"
                  value={giangVien.huongNghienCuu}
                  onChange={(e) => { setGiangVien({ ...giangVien, huongNghienCuu: e.target.value }) }}
                />
              </FormGroup>
            </div>)
          }
        </div>
      }
      footer={
        <div>
          { mode === Constants.DETAIL_MODE_EDIT && (
            <div style={{ display: 'flex' }}>
              <Button onClick={toggleMode}>Hủy thay đổi</Button>
              <div style={{ width: '0.5rem' }} />
              <Button onClick={onUpdateClick}>Cập nhật</Button>
            </div>
          ) }
          { mode === Constants.DETAIL_MODE_VIEW && (
            <Button onClick={toggleMode}>Chỉnh sửa</Button>
          ) }
        </div>
      }
    />
  );
}

export default DeTailGiangVienModal;
