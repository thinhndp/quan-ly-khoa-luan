import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormInput,
  FormGroup, FormSelect } from "shards-react";
import CustomModal from '../../components/common/CustomModal/CustomModal';
import * as Constants from '../../constants/constants';
import * as Utils from '../../utils/utils';
import { updateGiangVienById } from '../../api/giangVienAPI';
import { useHistory } from "react-router-dom";

const ThanhPhanModal = ({ isOpen, toggle, selected, onClose }) => {
  let history = useHistory();
  const [ hoiDong, setHoiDong ] = useState(Utils.getNewHoiDong);

  const onEnter = () => {
    console.log('selected in');
    setHoiDong(selected);
  }

  const onUpdateClick = () => {
    history.push(`/hoi-dong/create-or-edit/${hoiDong._id}`);
  }

  return (
    <CustomModal isOpen={isOpen} toggle={toggle} onClose={onClose}
      onEnter={onEnter}
      title="Thành phần Hội đồng"
      body={
        <div>
          { hoiDong != null && (
            <div>
              <Row form>
                <Col md="6" className="form-group">
                  <label htmlFor="chuTich">Chủ tịch</label>
                  <div id="chuTich" className="info-text">{hoiDong.chuTich.name}</div>
                </Col>
              </Row>
              <Row form>
                <Col md="6" className="form-group">
                  <label htmlFor="thuKy">Thư ký</label>
                  <div id="thuKy" className="info-text">{hoiDong.thuKy.name}</div>
                </Col>
                <Col md="6" className="form-group">
                  <label htmlFor="uyVien">Ủy viên</label>
                  <div id="uyVien" className="info-text">{hoiDong.uyVien.name}</div>
                </Col>
              </Row>
            </div>)
          }
        </div>
      }
      footer={
        <div>
          <Button onClick={onUpdateClick}>Cập nhật Hội đồng</Button>
        </div>
      }
    />
  );
}

export default ThanhPhanModal;
