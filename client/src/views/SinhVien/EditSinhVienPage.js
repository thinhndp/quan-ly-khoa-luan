import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

import { getSinhVienById } from '../../api/sinhVienAPI';
import * as Constants from '../../constants/constants';
import PageTitle from "../../components/common/PageTitle";

const EditSinhVienPage = () => {
  let { id } = useParams();
  const [ sinhVien, setSinhVien ] = useState({
    maSV: '',
    lopSH: '',
    name: '',
    phone: '',
    email: '',
    status: Constants.SINH_VIEN_STATUS_IN_PROGRESS,
    diemTB: 0
  });
  useEffect(() => {
    // console.log(id);
    getSinhVienById(id)
      .then((res) => {
        console.log(res);
        setSinhVien({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title="Thông tin Sinh viên" subtitle="Quản lý Sinh viên"
          md="12" className="ml-sm-auto mr-sm-auto" />
      </Row>
      <Row>
        <Col sm={{ size: 8, order: 2, offset: 2 }}>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Sửa thông tin Sinh viên</h6>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem className="p-3">
                <Row>
                  <Col>
                    <Form>
                      <Row form>
                        {/* MSSV */}
                        <Col md="6" className="form-group">
                          <label htmlFor="feMaSV">Mã số Sinh viên</label>
                          <FormInput
                            id="feMaSV"
                            value={sinhVien.maSV}
                            onChange={() => {}}
                          />
                        </Col>
                        {/* Lop SH */}
                        <Col md="6" className="form-group">
                          <label htmlFor="feLopSH">Lớp Sinh hoạt</label>
                          <FormInput
                            id="feLopSH"
                            value={sinhVien.lopSH}
                            onChange={() => {}}
                          />
                        </Col>
                      </Row>
                      <FormGroup>
                        <label htmlFor="feName">Họ tên</label>
                        <FormInput
                          id="feName"
                          value={sinhVien.name}
                          onChange={() => {}}
                        />
                      </FormGroup>
                      <Row form>
                        {/* Email */}
                        <Col md="6" className="form-group">
                          <label htmlFor="feEmail">Email</label>
                          <FormInput
                            type="email"
                            id="feEmail"
                            value={sinhVien.email}
                            onChange={() => {}}
                            autoComplete="email"
                          />
                        </Col>
                        {/* Password */}
                        <Col md="6" className="form-group">
                          <label htmlFor="fePhone">Số điện thoại</label>
                          <FormInput
                            type="number"
                            id="fePhone"
                            value={sinhVien.phone}
                            onChange={() => {}}
                          />
                        </Col>
                      </Row>
                      <Row form>
                        {/* Diem TB */}
                        <Col md="6" className="form-group">
                          <label htmlFor="feDiemTB">Điểm TB tích lũy</label>
                          <FormInput
                            type="number"
                            id="feDiemTB"
                            value={sinhVien.diemTB}
                            onChange={() => {}}
                          />
                        </Col>
                        {/* Password */}
                        <Col md="6" className="form-group">
                          <label htmlFor="feStatus">Trạng thái thực hiện KL</label>
                          <FormSelect value={sinhVien.status} id="feStatus">
                            <option>Chọn...</option>
                            <option value={Constants.SINH_VIEN_STATUS_IN_PROGRESS}>Đang thực hiện</option>
                            <option value={Constants.SINH_VIEN_STATUS_DONE}>Đã hoàn thành</option>
                            <option value={Constants.SINH_VIEN_STATUS_ABANDONED}>Đã dừng</option>
                          </FormSelect>
                        </Col>
                      </Row>
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
                      <Button theme="accent">Cập nhật</Button>
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

export default EditSinhVienPage;
