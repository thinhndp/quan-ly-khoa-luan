import React, { useEffect, useState, useRef } from "react";
import { Button, FormInput, FormGroup, FormSelect, Col, Row, FormTextarea } from "shards-react";
import MomentUtils from '@date-io/moment';
import { DateTimePicker, MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import toast from 'react-hot-toast';

import CustomModal from '../CustomModal/CustomModal';
import * as Constants from '../../../constants/constants';
import { createTaskLog, updateTaskLogById } from '../../../api/taskLogAPI';
import * as Utils from '../../../utils/utils';

const CreateOrEditLogModal = ({ isModalOpen, toggleModal, selected, onClose, onCreated, onUpdated, sinhVienId }) => {
  const [ taskLog, setTaskLog ] = useState(Utils.getNewTaskLog(sinhVienId));
  const datePickerRef = useRef();

  const onEnter = () => {
    setTaskLog(selected);
  }

  const onCreateOrUpdateClick = () => {
    console.log(taskLog);
    if (taskLog == null || taskLog._id == null) {
      toast.promise(
        createTaskLog(taskLog),
        {
          loading: 'Đang tạo',
          success: (res) => {
            onCreated();
            return 'Tạo thành công';
          },
          error: (err) => {
            return Utils.getFormattedErrMsg(err);
          }
        },
        Utils.getToastConfig()
      );
      /* createTaskLog(taskLog)
        .then((res) => {
          onCreated();
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        }); */
    }
    else {
      toast.promise(
        updateTaskLogById(taskLog._id, taskLog),
        {
          loading: 'Đang cập nhật',
          success: (res) => {
            onUpdated();
            return 'Cập nhật thành công';
          },
          error: (err) => {
            return Utils.getFormattedErrMsg(err);
          }
        },
        Utils.getToastConfig()
      );
      /* updateTaskLogById(taskLog._id, taskLog)
        .then((res) => {
          onUpdated();
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        }) */
    }
  }

  const callDatePicker = () => {
    datePickerRef.current.click();
  }

  return (
    <CustomModal isOpen={isModalOpen} toggle={toggleModal} onClose={onClose}
      onEnter={onEnter}
      title={ (taskLog == null || taskLog._id == null) ? "Ghi Log" : "Sửa Log"}
      body={
        <div>
          <div>
            <FormGroup>
              <label htmlFor={`feDescription`}>Nội dung công việc</label>
              <FormTextarea
                id={`feDescription`}
                value={taskLog.description}
                onChange={(e) => { setTaskLog({ ...taskLog, description: e.target.value }) }}
              />
            </FormGroup>
            <Row form>
              <Col md="6" className="form-group">
                <FormGroup>
                  <div id="mui-date-hidden" style={{ display: 'none' }}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker value={taskLog.logDate}
                          onChange={(date) => {
                            if (date) {
                              setTaskLog({...taskLog, logDate: date.toISOString()});
                            }
                          }}
                          innerRef={datePickerRef} />
                    </MuiPickersUtilsProvider>
                  </div>
                  <label htmlFor="feLogDate">Ngày</label>
                  <FormInput
                    id="feLogDate"
                    value={ Utils.getFormattedDate(taskLog.logDate) }
                    onClick={callDatePicker}
                  />
                </FormGroup>
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="feSpentTime">Thời gian làm</label>
                <FormInput
                  type="number"
                  id="feSpentTime"
                  value={taskLog.spentTime}
                  onChange={(e) => { setTaskLog({ ...taskLog, spentTime: e.target.value }) }}
                />
              </Col>
            </Row>
            <FormGroup>
              <label htmlFor="feCommit">Link commit Github (nếu có)</label>
              <FormInput
                id="feCommit"
                value={taskLog.commitLink}
                onChange={(e) => { setTaskLog({ ...taskLog, commitLink: e.target.value }) }}
              />
            </FormGroup>
          </div>
        </div>
      }
      footer={
        <div>
          <Button onClick={onCreateOrUpdateClick}>{taskLog._id == null ? 'Tạo' : 'Cập nhật'}</Button>
        </div>
      }
    />
  );
}

export default CreateOrEditLogModal;
