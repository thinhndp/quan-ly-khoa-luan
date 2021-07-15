import React, { useEffect, useState, useRef } from "react";
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
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

// import fuzzySearch from '../../components/common/fuzzySearch';
import { getHoiDongById, createHoiDong, updateHoiDongById } from '../../api/hoiDongAPI';
import { getPhongHocs } from '../../api/phongHocAPI';
import { getDeTais } from '../../api/deTaiAPI';
import { getGiangViens } from '../../api/giangVienAPI';
import * as Constants from '../../constants/constants';
import * as Utils from '../../utils/utils';
import PageTitle from "../../components/common/PageTitle";

import toast from 'react-hot-toast';

const CreateOrEditHoiDongPage = () => {
  let { id } = useParams();
  let history = useHistory();
  const [ hoiDong, setHoiDong ] = useState(Utils.getNewHoiDong());
  const [ phongHocs, setPhongHocs ] = useState([]);
  const [ deTais, setDeTais ] = useState([]);
  const [ giangViens, setGiangViens ] = useState([]);
  let isUpdate = (id != null);
  const startAtPickerRef = useRef();
  const endAtPickerRef = useRef();
  // moment.locale("vi");

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
        getHoiDongById(id)
          .then((res) => {
            console.log(res);
            setHoiDong(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
      }
      else {

      }
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
      getGiangViens()
        .then((res) => {
          console.log(res);
          setGiangViens(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
  }, []);

  const onUpdateClick = () => {
    console.log(hoiDong);
    toast.promise(
      updateHoiDongById(id, hoiDong),
      {
        loading: 'Đang cập',
        success: (res) => {
          console.log(res);
          // history.push('/hoi-dong');
          return 'Cập nhật thành công';
        },
        error: (err) => {
          return Utils.getFormattedErrMsg(err);
        }
      },
      Utils.getToastConfig()
    );
    /* updateHoiDongById(id, hoiDong)
      .then((res) => {
        console.log(res);
        history.push('/hoi-dong');
      })
      .catch((err) => {
        console.log(err);
      }); */
  }

  const onCreateClick = () => {
    console.log(hoiDong);
    toast.promise(
      createHoiDong(hoiDong),
      {
        loading: 'Đang tạo',
        success: (res) => {
          console.log(res);
          history.push('/hoi-dong');
          return 'Tạo thành công';
        },
        error: (err) => {
          return Utils.getFormattedErrMsg(err);
        }
      },
      Utils.getToastConfig()
    );
    /* createHoiDong(hoiDong)
      .then((res) => {
        console.log(res);
        history.push('/hoi-dong');
      })
      .catch((err) => {
        console.log(err);
      }) */
  }

  const callStartAtPicker = () => {
    startAtPickerRef.current.click();
  }

  const callEndAtPicker = () => {
    endAtPickerRef.current.click();
  }

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title={ isUpdate ? 'Cập nhật thông tin Hội đồng' : 'Tạo Hội đồng mới' }
          subtitle="Quản lý Hội đồng chấm"
          md="12" className="ml-sm-auto mr-sm-auto" />
      </Row>
      <Row>
        <Col sm={{ size: 8, order: 2, offset: 2 }}>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">{ isUpdate ? 'Cập nhật thông tin Hội đồng' : 'Tạo Hội đồng mới' }</h6>
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
                        <label>Các Đề tài</label>
                        <SelectSearch
                          value={hoiDong.deTais}
                          search
                          multiple
                          printOptions="on-focus"
                          closeOnSelect={false}
                          filterOptions={fuzzySearch}
                          onChange={(e) => { setHoiDong({ ...hoiDong, deTais: [ ...e ] }) }}
                          placeholder="Chọn các đề tài sẽ phản biện"
                          options={deTais.map((deTai) => ({ value: deTai._id, name: deTai.tenDeTai }))}
                        />
                      </FormGroup>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="phongHoc">Phòng</label>
                          <SelectSearch
                            value={hoiDong.phongHoc._id}
                            search
                            filterOptions={fuzzySearch}
                            onChange={(e) => { setHoiDong({ ...hoiDong, phongHoc: e }) }}
                            placeholder="Chọn địa điểm tổ chức phản biện"
                            options={phongHocs.map((phong) => ({ value: phong._id, name: phong.name }))}
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="chuTich">Chủ tịch</label>
                          <SelectSearch
                            value={hoiDong.chuTich._id}
                            search
                            filterOptions={fuzzySearch}
                            onChange={(e) => { setHoiDong({ ...hoiDong, chuTich: e }) }}
                            placeholder="Chọn Chủ tịch"
                            options={giangViens.map((gv) => ({ value: gv._id, name: gv.name }))}
                          />
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="thuKy">Thư ký</label>
                          <SelectSearch
                            value={hoiDong.thuKy._id}
                            search
                            filterOptions={fuzzySearch}
                            onChange={(e) => { setHoiDong({ ...hoiDong, thuKy: e }) }}
                            placeholder="Chọn Thư ký"
                            options={giangViens.map((gv) => ({ value: gv._id, name: gv.name }))}
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="uyVien">Ủy viên</label>
                          <SelectSearch
                            value={hoiDong.uyVien._id}
                            search
                            filterOptions={fuzzySearch}
                            onChange={(e) => { setHoiDong({ ...hoiDong, uyVien: e }) }}
                            placeholder="Chọn Ủy viên"
                            options={giangViens.map((gv) => ({ value: gv._id, name: gv.name }))}
                          />
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="6" className="form-group">
                          <FormGroup>
                            <div id="mui-date-hidden" style={{ display: 'none' }}>
                              <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DateTimePicker value={hoiDong.startAt}
                                    onChange={(date) => {
                                      if (date) {
                                        setHoiDong({...hoiDong, startAt: date.toISOString()});
                                      }
                                    }}
                                    innerRef={startAtPickerRef} />
                              </MuiPickersUtilsProvider>
                            </div>
                            <label htmlFor="feStartAt">Thời gian bắt đầu</label>
                            <FormInput
                              id="feStartAt"
                              value={Utils.getLocaleDateTimeString(hoiDong.startAt)}
                              onClick={callStartAtPicker}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6" className="form-group">
                          <FormGroup>
                            <div id="mui-date-hidden" style={{ display: 'none' }}>
                              <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DateTimePicker value={hoiDong.endAt}
                                    onChange={(date) => {
                                      if (date) {
                                        setHoiDong({...hoiDong, endAt: date.toISOString()});
                                      }
                                    }}
                                    innerRef={endAtPickerRef} />
                              </MuiPickersUtilsProvider>
                            </div>
                            <label htmlFor="feEndAt">Thời gian Kết thúc</label>
                            <FormInput
                              id="feEndAt"
                              value={Utils.getLocaleDateTimeString(hoiDong.endAt)}
                              onClick={callEndAtPicker}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

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
              { isUpdate
                ? (<Button theme="accent" onClick={onUpdateClick}>Cập nhật</Button>)
                : (<Button theme="accent" onClick={onCreateClick}>Tạo</Button>)
              }
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateOrEditHoiDongPage;
