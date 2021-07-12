import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button,
  Container
} from "shards-react";

import { getGiangVienById, updateGiangVienById } from '../../api/giangVienAPI';
import * as Constants from '../../constants/constants';
import PageTitle from "../../components/common/PageTitle";

import * as Utils from '../../utils/utils';
import toast from 'react-hot-toast';

const EditGiangVienPage = () => {
  let { id } = useParams();
  let history = useHistory();
  const [ giangVien, setGiangVien ] = useState({
    maGV: '',
    name: '',
    hocHam: '',
    phone: '',
    email: '',
    huongNghienCuu: ''
  });
  useEffect(() => {
    // console.log(id);
    getGiangVienById(id)
      .then((res) => {
        console.log(res);
        setGiangVien({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onUpdateClick = () => {
    console.log(giangVien);
    toast.promise(
      updateGiangVienById(id, giangVien),
      {
        loading: 'Đang cập nhật',
        success: (res) => {
          console.log(res);
          history.push('/giang-vien');
          return 'Cập nhật thành công';
        },
        error: (err) => {
          return err.response.data.message;
        }
      },
      Utils.getToastConfig()
    );
    /* updateGiangVienById(id, giangVien)
      .then((res) => {
        console.log(res);
        history.push('/giang-vien');
      })
      .catch((err) => {
        console.log(err);
      }); */
  }

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title="Thông tin Giảng viên" subtitle="Quản lý Giảng viên"
          md="12" className="ml-sm-auto mr-sm-auto" />
      </Row>
      <Row>
        <Col sm={{ size: 8, order: 2, offset: 2 }}>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Sửa thông tin Giảng viên</h6>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem className="p-3">
                <Row>
                  <Col>
                    <Form>
                      <Row form>
                        {/* MSSV */}
                        <Col md="6" className="form-group">
                          <label htmlFor="feMaGV">Mã Giảng viên</label>
                          <FormInput
                            id="feMaGV"
                            value={giangVien.maGV}
                            onChange={(e) => { setGiangVien({ ...giangVien, maGV: e.target.value }) }}
                          />
                        </Col>
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
                        {/* Phone */}
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
                      {/* <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="feCity">City</label>
                          <FormInput
                            id="feCity"
                            placeholder="City"
                            onChange={() => {}}
                          />
                        </Col>
                        <Col md="4" className="form-group">
                          <label htmlFor="feInputState">State</label>
                          <FormSelect id="feInputState">
                            <option>Choose...</option>
                            <option>...</option>
                          </FormSelect>
                        </Col>
                        <Col md="2" className="form-group">
                          <label htmlFor="feZipCode">Zip</label>
                          <FormInput
                            id="feZipCode"
                            placeholder="Zip"
                            onChange={() => {}}
                          />
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="feDescription">Description</label>
                          <FormTextarea id="feDescription" rows="5" />
                        </Col>
                      </Row> */}
                      <Button theme="accent" onClick={onUpdateClick}>Cập nhật</Button>
                    </Form>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditGiangVienPage;
