import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup} from "shards-react";

import { getTaskLogsWithQuery, deleteTaskLogById } from '../../../api/taskLogAPI';
import LyrTable from '../LyrTable/LyrTable';
import TaskLogInfoCard from '../InfoCard/TaskLogInfoCard';
import CreateOrEditLogModal from './CreateOrEditLogModal';
import * as Utils from '../../../utils/utils';
import * as Constants from '../../../constants/constants';

const TaskLogList = ({ sinhVienId, editable = false, flat = false }) => {
  const [ taskLogs, setTaskLogs ] = useState([])
  const [ resData, setResData ] = useState(Utils.getNewPageData());
  const [ selected, setSelected ] = useState(Utils.getNewTaskLog(sinhVienId));
  const [ isOpenModal, setIsOpenModal ] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setTaskLogs(resData.docs);
  }, [resData]);

  useEffect(() => {
    if (selected._id != null) {
      setIsOpenModal(true);
    }
  }, [selected]);

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
    if (!filters.sinhVienId) {
      filters.sinhVienId = { value: sinhVienId, type: Constants.FILTER_TYPE_EQ};
    }
    getTaskLogsWithQuery(search, pagingOptions, filters)
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => {
        setResData(Utils.getNewPageData());
        Utils.showErrorToast(Utils.getFormattedErrMsg(err.response.data.message));
        console.log(err.response);
      });
  }

  const onNewLogClick = () => {
    setIsOpenModal(true)
  }

  const onUpdated = () => {
    setIsOpenModal(false);
    getList();
  }

  const onCreated = () => {
    setIsOpenModal(false);
    getList();
  }

  const onClose = () => {
    setSelected(Utils.getNewTaskLog(sinhVienId));
  }

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  }

  const onDeleteClick = (id) => {
    deleteTaskLogById(id)
      .then((res) => {
        console.log(res);
        getList();
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  const onEditClick = (log) => {
    setSelected(log);
  }

  return (
    <div>
      <Row>
        <Col>
          <LyrTable
            flat={flat}
            buttonSection={
              editable &&
              (
                <div>
                  <Button onClick={onNewLogClick}>Log mới</Button>
                </div>
              )
            }
            data={resData}
            getList={getList}
          >
            { taskLogs.map((taskLog) => (
              <TaskLogInfoCard taskLog={taskLog} flat={true} editable={editable} onDeleteClick={onDeleteClick} onEditClick={onEditClick} />
            )) }
          </LyrTable>
        </Col>
      </Row>
      <CreateOrEditLogModal isModalOpen={isOpenModal} toggleModal={toggleModal} selected={selected} onClose={onClose} onUpdated={onUpdated}
          onCreated={onCreated} sinhVienId={sinhVienId}/>
    </div>
  );
}

export default TaskLogList;
