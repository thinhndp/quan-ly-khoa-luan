import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button,
    ButtonGroup, FormGroup, FormInput, FormRadio } from "shards-react";
import { useRecoilValue } from 'recoil';
import toast from 'react-hot-toast';

import userAtom, { userAsToken } from '../../recoil/user';
import PostReader from '../../components/post/PostReader';
import LyrCalendar from '../../components/common/LyrCalendar/LyrCalendar';
import LyrTable from '../../components/common/LyrTable/LyrTable';
import Heatmap from '../../components/common/Chart/Heatmap';
import TaskLogList from '../../components/common/TaskLogList/TaskLogList';
import FileNopOfSvList from '../../components/common/FileNopOfSVList/FileNopOfSvList';
import DeTaiInfoCard from '../../components/common/InfoCard/DeTaiInfoCard';
import BackButton from '../../components/common/BackButton';
import CustomModal from '../../components/common/CustomModal/CustomModal';
import "./styles.css";
import { getDeTaiById, continueApprove } from '../../api/deTaiAPI';
import { getTaskLogReportBySVId } from '../../api/reportAPI';
import { getThuMucs, getThuMucsWithQuery } from '../../api/fileNopAPI';
import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';

const DetailDeTaiPage = () => {
  const currentUser = useRecoilValue(userAtom);
  // const userToken = useRecoilValue(userAsToken);
  const [ deTai, setDeTai ] = useState(Utils.getNewDeTai());
  const [ reportSV1, setReportSV1 ] = useState(null);
  const [ reportSV2, setReportSV2 ] = useState(null);
  const [ showReport, setShowReport ] = useState(0);
  const [ showFiles, setShowFiles ] = useState(0);
  const [ isXNModalOpen, setIsXNModalOpen ] = useState(false);
  const [ isXNModal2Open, setIsXNModal2Open ] = useState(false);
  const [ approval, setApproval ] = useState({
    tiepTuc: true,
    lyDoDung: ''
  });
  const [ approval2, setApproval2 ] = useState({
    tiepTuc: true,
    lyDoDung: ''
  });
  var { id } = useParams();

  useEffect(() => {
    console.log(approval);
  }, [approval]);
  useEffect(() => {
    console.log(approval2);
  }, [approval2]);

  useEffect(() => {
    getDeTaiById(id)
      .then((res) => {
        console.log('de tai');
        console.log(res);
        if (res.data) {
          setDeTai(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    if (deTai) {
      if (deTai.xacNhanGiuaKi && deTai.xacNhanGiuaKi.sinhVien1) {
        setApproval({ ...deTai.xacNhanGiuaKi.sinhVien1 });
      }
      if (deTai.xacNhanGiuaKi && deTai.xacNhanGiuaKi.sinhVien2) {
        setApproval2({ ...deTai.xacNhanGiuaKi.sinhVien2 });
      }
      if (deTai.sinhVienThucHien[0]) {
        getTaskLogReportBySVId(deTai.sinhVienThucHien[0]._id)
          .then((res) => {
            console.log('reportSV1');
            console.log(res);
            if (res.data) {
              setReportSV1(res.data);
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
      if (deTai.sinhVienThucHien[1]) {
        getTaskLogReportBySVId(deTai.sinhVienThucHien[1]._id)
          .then((res) => {
            console.log('reportSV2');
            console.log(res);
            if (res.data) {
              setReportSV2(res.data);
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    }
  }, [deTai]);

  const toggleXNModal = () => {
    setIsXNModalOpen(!isXNModalOpen);
  }

  const toggleXNModal2 = () => {
    setIsXNModal2Open(!isXNModal2Open);
  }

  const onXNModalClose = (sv) => {
    if (sv === 1) {
      if (deTai.xacNhanGiuaKi && deTai.xacNhanGiuaKi.sinhVien1) {
        setApproval({ ...deTai.xacNhanGiuaKi.sinhVien1 });
      }
      else {
        setApproval({
          tiepTuc: true,
          lyDoDung: ''
        });
      }
    }
    else if (sv === 2) {
      if (deTai.xacNhanGiuaKi && deTai.xacNhanGiuaKi.sinhVien2) {
        setApproval2({ ...deTai.xacNhanGiuaKi.sinhVien2 });
      }
      else {
        setApproval2({
          tiepTuc: true,
          lyDoDung: ''
        });
      }
    }
  }

  const onXNClick = (sv) => {
    var newApproval = (sv == 1) ? approval : approval2;
    toast.promise(
      continueApprove(id, sv, newApproval),
      {
        loading: 'Đang gửi xác nhận',
        success: (res) => {
          setIsXNModalOpen(false);
          setIsXNModal2Open(false);
          return 'Đã gửi';
        },
        error: (err) => {
          return err.response.data.message;
        }
      },
      Utils.getToastConfig()
    );
  }

  const isGVHD = () => {
    return (Utils.isUserValidGiangVien(currentUser) && (currentUser.relatedInfoGV._id == deTai.giangVien._id));
  }

  return (
    <div className="container min_height_100">
      <div className="public-pages-container">
        <div className="main-area">
          { isGVHD() && (
            <div className="flex-row">
              { deTai.sinhVienThucHien[0] && (
                <Button onClick={() => { setIsXNModalOpen(true); }}>Xác nhận tiến độ SV {deTai.sinhVienThucHien[0].name}</Button>
              ) }
              <div className="mr-05r" />
              { deTai.sinhVienThucHien[1] && (
                <Button onClick={() => { setIsXNModal2Open(true); }}>Xác nhận tiến độ SV {deTai.sinhVienThucHien[1].name}</Button>
              ) }
            </div>
          ) }
          <div className="mb-15" />
          <DeTaiInfoCard deTai={deTai} />
          {/* FILES */}
          <Card className="mb-4">
            <CardBody>
              <div className="section-title">
                <div className="title-and-button">
                  <h5>File đã nộp</h5>
                  <ButtonGroup>
                    <Button className={ showFiles == 0 ? "" : "t-button"} onClick={() => {setShowFiles(0)}}
                      disabled={deTai.sinhVienThucHien[0] == null}
                    >
                      { deTai.sinhVienThucHien[0] ? deTai.sinhVienThucHien[0].name : "Sinh viên 1" }
                    </Button>
                    <Button className={ showFiles == 1 ? "" : "t-button"} onClick={() => {setShowFiles(1)}}
                      disabled={deTai.sinhVienThucHien[1] == null}
                    >
                      { deTai.sinhVienThucHien[1] ? deTai.sinhVienThucHien[1].name : "Sinh viên 2" }
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="full-width-line"/>
              </div>
              { (deTai.sinhVienThucHien[0] != null && showFiles == 0) && (
                <div>
                  <FileNopOfSvList sinhVienId={deTai.sinhVienThucHien[0]._id} flat={true}/>
                </div>
              ) }
            </CardBody>
          </Card>
          {/* PROGRESS */}
          { (reportSV1 || reportSV2) && (
            <Card className="">
              <CardBody>
                <div className="section-title">
                  <div className="title-and-button">
                    <h5>Quá trình thực hiện</h5>
                    <ButtonGroup>
                      <Button className={ showReport == 0 ? "" : "t-button"} onClick={() => {setShowReport(0)}}
                        disabled={deTai.sinhVienThucHien[0] == null}
                      >
                        { deTai.sinhVienThucHien[0] ? deTai.sinhVienThucHien[0].name : "Sinh viên 1" }
                      </Button>
                      <Button className={ showReport == 1 ? "" : "t-button"} onClick={() => {setShowReport(1)}}
                        disabled={deTai.sinhVienThucHien[1] == null}
                      >
                        { deTai.sinhVienThucHien[1] ? deTai.sinhVienThucHien[1].name : "Sinh viên 2" }
                      </Button>
                    </ButtonGroup>
                  </div>
                  <div className="full-width-line"/>
                </div>
                { showReport == 0 && (
                  <div>
                    { (reportSV1 != null) && (
                      <div className="">
                        <Heatmap series={ Utils.getHeatmapSeriesFromReportData(reportSV1) } height={380} flat/>
                        <div>
                          <TaskLogList sinhVienId={deTai.sinhVienThucHien[0]._id} editable={false} flat={true} />
                        </div>
                      </div>
                    ) }
                  </div>
                ) }
                { showReport == 1 && (
                  <div>
                    { (reportSV2 != null) && (
                      <div className="">
                        <Heatmap series={ Utils.getHeatmapSeriesFromReportData(reportSV2) } height={380} flat/>
                        <div>
                          <TaskLogList sinhVienId={deTai.sinhVienThucHien[1]._id} showNewButton={false} flat={true} />
                        </div>
                      </div>
                    ) }
                  </div>
                ) }
              </CardBody>
            </Card>
          ) }
          {/* <BackButton mTop="15px" /> */}
        </div>
      </div>
      <CustomModal isOpen={isXNModalOpen} toggle={toggleXNModal}
        title='Xác nhận tiến độ'
        size="sm"
        body={
          <div>
            <FormGroup>
              <FormRadio
                inline
                name="tiepTuc"
                checked={approval.tiepTuc}
                onChange={() => {
                  setApproval({ tiepTuc: true, lyDoDung: '' })
                }}
              >
                Tiếp tục
              </FormRadio>
              <FormRadio
                inline
                name="tiepTuc"
                checked={!approval.tiepTuc}
                onChange={() => {
                  setApproval({ ...approval, tiepTuc: false })
                }}
              >
                Buộc dừng
              </FormRadio>
            </FormGroup>
            <FormGroup>
              <label htmlFor="lyDoDung1">Lý do dừng</label>
              <FormInput id="lyDoDung1"
                  disabled={approval.tiepTuc}
                  onChange={(e) => { setApproval({ ...approval, lyDoDung: e.target.value }) }}
                  value={approval.lyDoDung} />
            </FormGroup>
          </div>
        }
        footer={
          <div>
            <Button onClick={() => { onXNClick(1) }}>Gửi</Button>
          </div>
        }
      />
      <CustomModal isOpen={isXNModal2Open} toggle={toggleXNModal2}
        title='Xác nhận tiến độ'
        size="sm"
        body={
          <div>
            <FormGroup>
              <FormRadio
                inline
                name="tiepTuc2"
                checked={approval2.tiepTuc}
                onChange={() => {
                  setApproval2({ tiepTuc: true, lyDoDung: '' })
                }}
              >
                Tiếp tục
              </FormRadio>
              <FormRadio
                inline
                name="tiepTuc2"
                checked={!approval2.tiepTuc}
                onChange={() => {
                  setApproval2({ ...approval2, tiepTuc: false })
                }}
              >
                Buộc dừng
              </FormRadio>
            </FormGroup>
            <FormGroup>
              <label htmlFor="deXuatToiDa2">Lý do dừng</label>
              <FormInput id="deXuatToiDa2"
                  disabled={approval2.tiepTuc}
                  onChange={(e) => { setApproval2({ ...approval2, lyDoDung: e.target.value }) }}
                  value={approval2.lyDoDung} />
            </FormGroup>
          </div>
        }
        footer={
          <div>
            <Button onClick={() => { onXNClick(2) }}>Gửi</Button>
          </div>
        }
      />
    </div>
  );
}

export default DetailDeTaiPage;
