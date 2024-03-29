import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useRecoilValue } from 'recoil';
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
import { getDeTaiById, updateDeTaiById } from '../../api/deTaiAPI';
import { getGiangViens } from '../../api/giangVienAPI';
import { getSinhViens } from '../../api/sinhVienAPI';
import { getKyThucHiens } from '../../api/kyThucHienAPI';
import * as Constants from '../../constants/constants';
import * as Utils from '../../utils/utils';
import PageTitle from "../../components/common/PageTitle";
import userAtom from '../../recoil/user';

import toast from 'react-hot-toast';

const EditDeTaiPage = () => {
  let { id } = useParams();
  let history = useHistory();
  const [ deTai, setDeTai ] = useState(Utils.getNewDeTai());
  const [ giangViens, setGiangViens ] = useState([]);
  const [ sinhViens, setSinhViens ] = useState([]);
  const [ kyThucHiens, setKyThucHiens ] = useState([]);
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    /* getDeTaiById(id)
      .then((res) => {
        console.log(res);
        setGiangVien({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
      }); */
      getDeTaiById(id)
        .then((res) => {
          console.log('deTai');
          console.log(res);
          setDeTai(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
      getGiangViens()
        .then((res) => {
          console.log(res);
          setGiangViens(res.data);
          // setGiangViens([ null, ...res.data ]);
        })
        .catch((err) => {
          console.log(err.response);
        });
      getSinhViens()
        .then((res) => {
          console.log(res);
          setSinhViens(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
      getKyThucHiens()
        .then((res) => {
          console.log(res);
          setKyThucHiens(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        })
  }, []);
  const onUpdateClick = () => {
    console.log(deTai);
    toast.promise(
      updateDeTaiById(id, deTai),
      {
        loading: 'Đang cập nhật',
        success: (res) => {
          // history.push('/de-tai');
          return 'Cập nhật thành công';
        },
        error: (err) => {
          return Utils.getFormattedErrMsg(err);
        }
      },
      Utils.getToastConfig()
    );
    /* updateDeTaiById(id, deTai)
      .then((res) => {
        console.log(res);
        history.push('/de-tai');
      })
      .catch((err) => {
        console.log(err.response);
      }); */
  }

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title="Cập nhật Đề tài"
          subtitle="Quản lý Đề tài"
          md="12" className="ml-sm-auto mr-sm-auto" />
      </Row>
      <Row>
        <Col sm={{ size: 8, order: 2, offset: 2 }}>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Cập nhật Đề tài</h6>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem className="p-3">
                <Row>
                  <Col>
                    <Form>
                      <FormGroup>
                        <label htmlFor="feName">Tên Đề tài</label>
                        <FormInput
                          id="feName"
                          value={deTai.tenDeTai}
                          onChange={(e) => { setDeTai({ ...deTai, tenDeTai: e.target.value }) }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feName">Tên Đề tài Tiếng Anh</label>
                        <FormInput
                          id="feEngName"
                          value={deTai.englishName}
                          onChange={(e) => { setDeTai({ ...deTai, englishName: e.target.value }) }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor={`feMoTa`}>Mô tả</label>
                        <FormTextarea
                          id={`feMoTa`}
                          value={deTai.moTa}
                          onChange={(e) => { setDeTai({ ...deTai, moTa: e.target.value }) }}
                        />
                      </FormGroup>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label>Kỳ thực hiện</label>
                          {/* <SelectSearch
                            value={deTai.kyThucHien != null ? deTai.kyThucHien._id : null}
                            search
                            filterOptions={fuzzySearch}
                            onChange={(e) => { setDeTai({ ...deTai, kyThucHien: e }) }}
                            placeholder="Chọn Kỳ thực hiện Khóa luận"
                            options={kyThucHiens.map((kth) => ({ value: kth._id, name: kth.name }))}
                          /> */}
                          <FormInput
                            id="feKTH"
                            value={deTai.kyThucHien.name}
                            disabled={true}
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label>Giảng viên Hướng dẫn</label>
                          {/* <SelectSearch
                            value={deTai.giangVien._id}
                            search
                            filterOptions={fuzzySearch}
                            onChange={(e) => { setDeTai({ ...deTai, giangVien: e }) }}
                            placeholder="Chọn Giảng viên Hướng dẫn"
                            options={giangViens.map((gv) => ({ value: gv._id, name: gv.name }))}
                          /> */}
                          <FormInput
                            id="feGVHD"
                            value={deTai.giangVien.name}
                            disabled={true}
                          />
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label>Sinh viên 1</label>
                          {/* <SelectSearch
                            value={deTai.sinhVienThucHien[0] != null ? deTai.sinhVienThucHien[0]._id : ''}
                            search
                            filterOptions={fuzzySearch}
                            onChange={(e) => { setDeTai({ ...deTai, sinhVienThucHien: [ e, ...deTai.sinhVienThucHien.slice(1) ] }) }}
                            placeholder="Chọn Sinh viên 1"
                            options={sinhViens.map((sv) => ({ value: sv._id, name: sv.name }))}
                          /> */}
                          <FormInput
                            id="feSV1"
                            value={deTai.sinhVienThucHien[0] ? deTai.sinhVienThucHien[0].name : '-'}
                            disabled={true}
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label>Sinh viên 2</label>
                          {/* <SelectSearch
                            value={deTai.sinhVienThucHien[1] != null ? deTai.sinhVienThucHien[1]._id : ''}
                            search
                            filterOptions={fuzzySearch}
                            onChange={(e) => { setDeTai({ ...deTai, sinhVienThucHien: [ ...deTai.sinhVienThucHien.slice(0, 1), e ] }) }}
                            placeholder="Chọn Sinh viên 2"
                            options={sinhViens.map((sv) => ({ value: sv._id, name: sv.name }))}
                          /> */}
                          <FormInput
                            id="feSV2"
                            value={deTai.sinhVienThucHien[1] ? deTai.sinhVienThucHien[1].name : '-'}
                            disabled={true}
                          />
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="feTTDuyet">Trạng thái Duyệt</label>
                          <FormSelect value={deTai.trangThaiDuyet} id="feTTDuyet" disabled={!currentUser.canApprove}
                              onChange={(e) => { setDeTai({ ...deTai, trangThaiDuyet: e.target.value }) }}>
                            <option value=''>Chọn...</option>
                            <option value={Constants.DE_TAI_APPROVE_STATUS_NOT_APPROVED}>Chưa duyệt</option>
                            <option value={Constants.DE_TAI_APPROVE_STATUS_APPROVED}>Đã duyệt</option>
                            <option value={Constants.DE_TAI_APPROVE_STATUS_REJECTED}>Đã từ chối</option>
                          </FormSelect>
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="feTTThucHien">Trạng thái Thực hiện</label>
                          <FormSelect value={deTai.trangThaiThucHien} id="feTTThucHien"
                              onChange={(e) => { setDeTai({ ...deTai, trangThaiThucHien: e.target.value }) }}>
                            <option value=''>Chọn...</option>
                            <option value={Constants.DE_TAI_PROGRESS_STATUS_AVAILABLE}>Chờ đăng ký</option>
                            <option value={Constants.DE_TAI_PROGRESS_STATUS_IN_PROGRESS}>Đang thực hiện</option>
                            <option value={Constants.DE_TAI_PROGRESS_STATUS_DONE}>Đã hoàn thành</option>
                            <option value={Constants.DE_TAI_PROGRESS_STATUS_ABANDONED}>Đã dừng</option>
                          </FormSelect>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="feHeDT">Hệ đào tạo</label>
                          <FormSelect value={deTai.heDaoTao} id="feHeDT"
                              onChange={(e) => { setDeTai({ ...deTai, heDaoTao: e.target.value }) }}>
                            <option value=''>Chọn...</option>
                            <option value={Constants.DE_TAI_HDT_DAI_TRA}>Đại trà</option>
                            <option value={Constants.DE_TAI_HDT_CHAT_LUONG_CAO}>Chất lượng cao</option>
                          </FormSelect>
                        </Col>
                        <Col md="6" className="form-group">
                          <label>Giảng viên Phản biện</label>
                          <SelectSearch
                            value={deTai.canBoPhanBien ? deTai.canBoPhanBien._id : null}
                            search
                            filterOptions={fuzzySearch}
                            onChange={(e) => {
                              console.log(e);
                              if (e == 'not_selected') {
                                setDeTai({ ...deTai, canBoPhanBien: null });
                              }
                              else {
                                setDeTai({ ...deTai, canBoPhanBien: e });
                              }
                            }}
                            placeholder="Chọn Giảng viên Phản biện"
                            options={[ { value: 'not_selected', name: 'Chọn Giảng viên Phản biện' }, ...giangViens.map((gv) => ({ value: gv._id, name: gv.name }))]}
                          />
                        </Col>
                      </Row>
                      <Row form>
                      <Col md="6" className="form-group">
                          <label htmlFor="fePhone">Điểm SV1</label>
                          <FormInput
                            disabled={deTai.sinhVienThucHien[0] == null || deTai.sinhVienThucHien[0]._id == null}
                            type="number"
                            id="feResult"
                            value={deTai.diemSo[0]}
                            onChange={(e) => {
                              let newDeTai = { ...deTai };
                              newDeTai.diemSo[0] = e.target.value;
                              setDeTai(newDeTai)
                            }}
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="fePhone">Điểm SV2</label>
                          <FormInput
                            disabled={deTai.sinhVienThucHien[1] == null || deTai.sinhVienThucHien[1]._id == null}
                            type="number"
                            id="feResult"
                            value={deTai.diemSo[1]}
                            onChange={(e) => {
                              let newDeTai = { ...deTai };
                              newDeTai.diemSo[1] = e.target.value;
                              setDeTai(newDeTai)
                            }}
                          />
                        </Col>
                      </Row>
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

export default EditDeTaiPage;
