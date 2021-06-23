import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup} from "shards-react";
import { useRecoilValue } from 'recoil';

import PostReader from '../../components/post/PostReader';
import LyrCalendar from '../../components/common/LyrCalendar/LyrCalendar';
import LyrTable from '../../components/common/LyrTable/LyrTable';
import Heatmap from '../../components/common/Chart/Heatmap';
import TaskLogList from '../../components/common/TaskLogList/TaskLogList';
import DeTaiInfoCard from '../../components/common/InfoCard/DeTaiInfoCard';
import "./styles.css";
import { getDeTaiBySinhVienId } from '../../api/deTaiAPI';
import { getTaskLogReportBySVId } from '../../api/reportAPI';
import userAtom, { userAsToken } from '../../recoil/user';
import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';

const SV_LogTime = () => {
  const currentUser = useRecoilValue(userAtom);
  // const userToken = useRecoilValue(userAsToken);
  const [ deTai, setDeTai ] = useState(Utils.getNewDeTai());
  const [ report, setReport ] = useState(null);

  let history = useHistory();
  useEffect(() => {
    if (!Utils.isUserValidSinhVien(currentUser)) {
      history.push('/');
    }
    else {
      getDeTaiBySinhVienId(currentUser.relatedInfoSV._id)
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
  
      getTaskLogReportBySVId(currentUser.relatedInfoSV._id)
        .then((res) => {
          console.log('report');
          console.log(res);
          if (res.data) {
            setReport(res.data);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
      getList();
    }
  }, []);

  const getList = () => {

  }

  return (
    <div className="container min_height_100">
      <div className="public-pages-container">
        <div className="main-area">
          <DeTaiInfoCard deTai={deTai} />
          { (report != null) && (
            <div className="">
              <Heatmap series={ Utils.getHeatmapSeriesFromReportData(report) } height={330}/>
            </div>
          ) }
          <div>
            {
              Utils.isUserValidSinhVien(currentUser) && (
                <TaskLogList sinhVienId={currentUser.relatedInfoSV._id} editable/>
              )
            }
          </div>
        </div>
        <div>
          <LyrCalendar />
        </div>
      </div>
    </div>
  );
}

export default SV_LogTime;
