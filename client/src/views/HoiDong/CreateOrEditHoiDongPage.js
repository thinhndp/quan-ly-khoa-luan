import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import SelectSearch, { fuzzySearch } from 'react-select-search';
import '../../styles/select-search-styles.css';
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardFooter,
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

// import fuzzySearch from '../../components/common/fuzzySearch';
import { getHoiDongById, createHoiDong } from '../../api/hoiDongAPI';
import { getPhongHocs } from '../../api/phongHocAPI';
import { getDeTais } from '../../api/deTaiAPI';
import * as Constants from '../../constants/constants';
import * as Utils from '../../utils/utils';
import PageTitle from "../../components/common/PageTitle";

const CreateOrEditHoiDongPage = () => {
  let { id } = useParams();
  let history = useHistory();
  const [ hoiDong, setHoiDong ] = useState(Utils.getNewHoiDong());
  const [ phongHocs, setPhongHocs ] = useState([]);
  const [ deTais, setDeTais ] = useState([]);
  let isUpdate = (id != null);

  useEffect(() => {
    /* getHoiDongById(id)
      .then((res) => {
        console.log(res);
        setGiangVien({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
      }); */
      if (isUpdate) {
        Promise.all([ getHoiDongById(id), getPhongHocs() ])
          .then((res) => {
            console.log('hoidong');
            console.log(res[0]);
            console.log(res[1]);
            setPhongHocs(res[1].data);
          })
          .catch((err) => {
            console.log(err);
          })
      }
      else {
        getDeTais()
          .then((res) => {
            console.log(res);
            setDeTais(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
        getPhongHocs()
          .then((res) => {
            console.log(res);
            setPhongHocs(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
      }
  }, []);
  const onUpdateClick = () => {
    /* console.log(giangVien);
    // TODO: Validation
    updateGiangVienById(id, giangVien)
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
                      <FormGroup>
                        <label htmlFor="feName">Tên Hội đồng</label>
                        <FormInput
                          id="feName"
                          value={hoiDong.name}
                          onChange={(e) => { setHoiDong({ ...hoiDong, name: e.target.value }) }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="phongHoc">Phòng</label>
                        <FormSelect id="phongHoc"
                            onChange={(e) => { console.log(e.target.value) }}
                            value={hoiDong.phongHoc}>
                          <option value=''>Chọn địa điểm tổ chức phản biện...</option>
                          { phongHocs.map((phong) => (
                            <option value={phong._id}>{phong.name}</option>
                          )) }
                          {/* <option value=''>Chọn Hệ đào tạo...</option>
                          <option value={Constants.DE_TAI_HDT_DAI_TRA}>Đại trà</option>
                          <option value={Constants.DE_TAI_HDT_CHAT_LUONG_CAO}>Chất lượng cao</option> */}
                        </FormSelect>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="phongHoc2">Phòng</label>
                        <SelectSearch
                          value={hoiDong.phongHoc}
                          search
                          filterOptions={fuzzySearch}
                          onChange={(e) => { console.log(e) }}
                          placeholder="Chọn địa điểm tổ chức phản biện"
                          options={phongHocs.map((phong) => ({ value: phong._id, name: phong.name }))}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Các Đề tài</label>
                        <SelectSearch
                          value={hoiDong.deTais}
                          search
                          multiple
                          printOptions="on-focus"
                          closeOnSelect={false}
                          filterOptions={fuzzySearch}
                          onChange={(e) => { console.log(e) }}
                          placeholder="Chọn các đề tài sẽ phản biện"
                          options={deTais.map((deTai) => ({ value: deTai._id, name: deTai.tenDeTai }))}
                        />
                      </FormGroup>
                      {/* <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="feMaGV">Mã Giảng viên</label>
                          <FormInput
                            id="feMaGV"
                            value={giangVien.maGV}
                            onChange={(e) => { setGiangVien({ ...giangVien, maGV: e.target.value }) }}
                          />
                        </Col>
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
                      </FormGroup> */}
                    </Form>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
            <CardFooter>
              <Button theme="accent" onClick={onUpdateClick}>Cập nhật</Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateOrEditHoiDongPage;
