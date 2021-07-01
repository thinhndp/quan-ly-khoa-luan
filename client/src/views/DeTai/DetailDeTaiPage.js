import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup} from "shards-react";
import { useRecoilValue } from 'recoil';

import PostReader from '../../components/post/PostReader';
import LyrCalendar from '../../components/common/LyrCalendar/LyrCalendar';
import LyrTable from '../../components/common/LyrTable/LyrTable';
import Heatmap from '../../components/common/Chart/Heatmap';
import TaskLogList from '../../components/common/TaskLogList/TaskLogList';
import FileNopOfSvList from '../../components/common/FileNopOfSVList/FileNopOfSvList';
import DeTaiInfoCard from '../../components/common/InfoCard/DeTaiInfoCard';
import BackButton from '../../components/common/BackButton';
import "./styles.css";
import { getDeTaiById } from '../../api/deTaiAPI';
import { getTaskLogReportBySVId } from '../../api/reportAPI';
import { getThuMucs, getThuMucsWithQuery } from '../../api/fileNopAPI';
import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';

const DetailDeTaiPage = () => {
  // const userToken = useRecoilValue(userAsToken);
  const [ deTai, setDeTai ] = useState(Utils.getNewDeTai());
  const [ reportSV1, setReportSV1 ] = useState(null);
  const [ reportSV2, setReportSV2 ] = useState(null);
  const [ showReport, setShowReport ] = useState(0);
  const [ showFiles, setShowFiles ] = useState(0);
  var { id } = useParams();

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

  return (
    <div className="container min_height_100">
      <div className="public-pages-container">
        <div className="main-area">
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
          <BackButton mTop="15px" />
        </div>
      </div>
    </div>
  );
}

export default DetailDeTaiPage;
