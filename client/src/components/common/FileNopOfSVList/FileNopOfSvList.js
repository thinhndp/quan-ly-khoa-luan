import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup} from "shards-react";

import './styles.css';
import { getTaskLogsWithQuery, deleteTaskLogById } from '../../../api/taskLogAPI';
import { getFilesBySinhVienId } from '../../../api/fileNopAPI';
import LyrTable from '../LyrTable/LyrTable';
import * as Utils from '../../../utils/utils';
import * as Constants from '../../../constants/constants';

const FileNopOfSvList = ({ sinhVienId, flat = false }) => {
  const [ fileNops, setFileNops ] = useState([])
  const [ resData, setResData ] = useState(Utils.getNewPageData());

  useEffect(() => {
    // console.log('bf');
    // console.log(resData);
    getList();
  }, []);

  useEffect(() => {
    console.log('at');
    console.log(resData);
    setFileNops(resData.docs);
  }, [resData]);

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions()) => {
    getFilesBySinhVienId(sinhVienId, search, pagingOptions)
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => {
        setResData(Utils.getNewPageData());
        Utils.showErrorToast(Utils.getFormattedErrMsg(err));
        console.log(err.response);
      });
  }

  const onLinkClick = (driveId) => {
    console.log(driveId);
    const fileLink = `https://drive.google.com/file/d/${driveId}`;
    window.open(fileLink, "_blank");
  }

  const renderFileNop = (fileNop) => {
    return (
      <div className="file" onClick={ () => { onLinkClick(fileNop.driveId) } }>
        <div><img className="large-logo" src={Utils.getFileLogo(fileNop.name)}/></div>
        <div className="file-nop-name truncate">{fileNop.name}</div>
      </div>
    );
  }

  return (
    <div>
      <Row>
        <Col>
          <LyrTable
            flat={flat}
            data={resData}
            getList={getList}
          >
            <div className="file-nops">
              { fileNops.map((fileNop) => (
                renderFileNop(fileNop)
              )) }
            </div>
          </LyrTable>
        </Col>
      </Row>
    </div>
  );
}

export default FileNopOfSvList;
