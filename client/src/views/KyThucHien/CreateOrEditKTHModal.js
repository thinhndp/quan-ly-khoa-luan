import React, { useEffect, useState, useRef } from "react";
import { Button, FormInput, FormGroup, Row, Col, FormSelect } from "shards-react";
import MomentUtils from '@date-io/moment';
import { DateTimePicker, MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import toast from 'react-hot-toast';

import CustomModal from '../../components/common/CustomModal/CustomModal';
import * as Constants from '../../constants/constants';
import { createKyThucHien, updateKyThucHienById } from '../../api/kyThucHienAPI';
import * as Utils from '../../utils/utils';

const CreateOrEditKyThucHienModal = ({ isModalOpen, toggleModal, selected, onClose, onCreated, onUpdated }) => {
  // const [ giangVien, setGiangVien ] = useState(null);
  // let kyThucHien;
  const [ kyThucHien, setKyThucHien ] = useState(Utils.getNewKyThucHien);
  const startDatePickerRef = useRef();
  const endDatePickerRef = useRef();

  // useEffect(() => {
  //   if (mode === Constants.DETAIL_MODE_EDIT) {
  //     setGiangVien(selectedGV);
  //   }
  // }, [mode]);

  const onEnter = () => {
    setKyThucHien(selected);
  }

  // const toggleMode = () => {
  //   if (mode === Constants.DETAIL_MODE_EDIT) {
  //     setMode(Constants.DETAIL_MODE_VIEW);
  //   }
  //   else {
  //     setMode(Constants.DETAIL_MODE_EDIT);
  //   }
  // }

  const onCreateOrUpdateClick = () => {
    console.log(kyThucHien);
    if (kyThucHien == null || kyThucHien._id == null) {
      /* createKyThucHien(kyThucHien)
        .then((res) => {
          onCreated();
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        }); */
      toast.promise(
        createKyThucHien(kyThucHien),
        {
          loading: 'Đang tạo Kỳ thực hiện',
          success: (res) => {
            onCreated();
            return 'Tạo thành công';
          },
          error: (err) => {
            return Utils.getFormattedErrMsg(err.response.data.message);
          }
        },
        Utils.getToastConfig()
      );
    }
    else {
      /* updateKyThucHienById(kyThucHien._id, kyThucHien)
        .then((res) => {
          onUpdated();
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        }) */
      toast.promise(
        updateKyThucHienById(kyThucHien._id, kyThucHien),
        {
          loading: 'Đang cập nhật Kỳ thực hiện',
          success: (res) => {
            onUpdated();
            return 'Cập nhật thành công';
          },
          error: (err) => {
            return Utils.getFormattedErrMsg(err.response.data.message);
          }
        },
        Utils.getToastConfig()
      );
    }
  }

  const callStartAtPicker = () => {
    startDatePickerRef.current.click();
  }

  const callEndAtPicker = () => {
    endDatePickerRef.current.click();
  }


  return (
    <CustomModal isOpen={isModalOpen} toggle={toggleModal} onClose={onClose}
      onEnter={onEnter}
      title={ (kyThucHien == null || kyThucHien._id == null) ? "Tạo Kỳ thực hiện Khóa Luận mới" : "Cập nhật thông tin Kỳ thực hiện Khóa luận"}
      body={
        <div>
          <div>
            <FormGroup>
              <label htmlFor="feName">Tên Kỳ thực hiện Khóa luận</label>
              <FormInput
                id="feName"
                value={kyThucHien.name}
                onChange={(e) => { setKyThucHien({ ...kyThucHien, name: e.target.value }) }}
              />
            </FormGroup>
            {
              (kyThucHien != null && kyThucHien._id != null) && (
                <FormGroup>
                  <label htmlFor="feKTHStatus">Trạng thái Kỳ thực hiện</label>
                  <FormSelect value={kyThucHien.status} id="feKTHStatus"
                      onChange={(e) => { setKyThucHien({ ...kyThucHien, status: e.target.value }) }}>
                    <option value=''>Chọn...</option>
                    <option value={Constants.KY_THUC_HIEN_STATUS_NOT_STARTED}>Chưa bắt đầu</option>
                    <option value={Constants.KY_THUC_HIEN_STATUS_ON_GOING}>Đang diễn ra</option>
                    <option value={Constants.KY_THUC_HIEN_STATUS_FINISHED}>Đã hoàn thành</option>
                  </FormSelect>
                </FormGroup>
              )
            }
            <Row form>
              <Col md="6" className="form-group">
                <FormGroup>
                  <div id="mui-date-hidden" style={{ display: 'none' }}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker value={kyThucHien.startDate}
                          onChange={(date) => {
                            if (date) {
                              setKyThucHien({...kyThucHien, startDate: date.toISOString()});
                            }
                          }}
                          innerRef={startDatePickerRef} />
                    </MuiPickersUtilsProvider>
                  </div>
                  <label htmlFor="feStartAt">Thời gian bắt đầu</label>
                  <FormInput
                    id="feStartAt"
                    value={kyThucHien.startDate}
                    onClick={callStartAtPicker}
                  />
                </FormGroup>
              </Col>
              <Col md="6" className="form-group">
                <FormGroup>
                  <div id="mui-date-hidden" style={{ display: 'none' }}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker value={kyThucHien.endDate}
                          onChange={(date) => {
                            if (date) {
                              setKyThucHien({...kyThucHien, endDate: date.toISOString()});
                            }
                          }}
                          innerRef={endDatePickerRef} />
                    </MuiPickersUtilsProvider>
                  </div>
                  <label htmlFor="feEndAt">Thời gian Kết thúc</label>
                  <FormInput
                    id="feEndAt"
                    value={kyThucHien.endDate}
                    onClick={callEndAtPicker}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
        </div>
      }
      footer={
        <div>
          <Button onClick={onCreateOrUpdateClick}>{kyThucHien._id == null ? 'Thêm' : 'Cập nhật'}</Button>
        </div>
      }
    />
  );
}

export default CreateOrEditKyThucHienModal;
