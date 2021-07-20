import React, { useEffect, useState } from 'react';
import { Button, FormGroup, FormInput, FormSelect, FormTextarea, CardBody, Row, Col } from "shards-react";
import LaunchIcon from '@material-ui/icons/Launch';

import CustomTabModal from '../../components/common/CustomModal/CustomTabModal';
import CustomModal from '../../components/common/CustomModal/CustomModal';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import { getDeTais, applyForDeTai } from '../../api/deTaiAPI';
import * as Utils from '../../utils/utils';

// import "./dang-ki-btn.css";

const DetailSVThucHienButton = ({ deTai }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ deTais, setDeTais ] = useState([]);
  const user = Utils.getUser();

  /* useEffect(() => {
    getDeTaiList();
  }, []);

  const getDeTaiList = () => {
    getDeTais()
      .then((res) => {
        console.log(res);
        setDeTais(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onApplyClick = (deTaiId) => {
    const sinhVienId = user.relatedInfoSV;
    console.log(deTaiId);
    console.log(sinhVienId);
    applyForDeTai(deTaiId, sinhVienId)
      .then((res) => {
        console.log(res);
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
  } */

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <span className='small-icon-span'>
        <LaunchIcon className='icon-button' color="primary"
          onClick={toggleModal}/>
      </span>
      { (!deTai.sinhVienThucHien || deTai.sinhVienThucHien.length == 0) &&
        (
          <CustomModal
            isOpen={isOpen}
            toggle={toggleModal}
            title="Sinh viên thực hiện"
            body={
              <div>Chưa có Sinh viên đăng ký</div>
            }
          />
        )
      }
      { (deTai.sinhVienThucHien && deTai.sinhVienThucHien.length > 0) &&
        (
          <CustomTabModal
            isOpen={isOpen}
            toggle={toggleModal}
            title="Sinh viên thực hiện"
            modalTitleList={deTai.sinhVienThucHien.map((sinhVien, index) => `Sinh viên ${index + 1}`)}
            modalBodyList={
              deTai.sinhVienThucHien.map((sinhVien, index) => (
                <div>
                  <FormGroup>
                    <label htmlFor="feName">Họ tên</label>
                    <div id="feName" className="info-text">{sinhVien.name}</div>
                  </FormGroup>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label htmlFor="feMaSV">Mã số Sinh viên</label>
                      <div id="feMaSV" className="info-text">{sinhVien.maSV}</div>
                    </Col>
                    {/* Lop SH */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feLopSH">Lớp Sinh hoạt</label>
                      <div id="feLopSH" className="info-text">{sinhVien.lopSH}</div>
                    </Col>
                  </Row>
                  <Row form>
                    {/* Email */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feEmail">Email</label>
                      <div id="feEmail" className="info-text">{sinhVien.email}</div>
                    </Col>
                    {/* Phone */}
                    <Col md="6" className="form-group">
                      <label htmlFor="fePhone">Số điện thoại</label>
                      <div id="fePhone" className="info-text">{sinhVien.phone}</div>
                    </Col>
                  </Row>
                  <Row form>
                    {/* Diem TB */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feDiemTB">Điểm TB tích lũy</label>
                      <div id="feDiemTB" className="info-text">{sinhVien.diemTB}</div>
                    </Col>
                    {/* TTTH */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feStatus">TT Thực hiện</label>
                      <div id="feStatus" className="info-text">{Utils.getSinhVienStatusText(sinhVien.status)}</div>
                    </Col>
                  </Row>
                </div>
              ))
            }
          />
        )
      }
    </div>
  );
}

export default DetailSVThucHienButton;
