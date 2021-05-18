import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormInput,
  FormGroup, FormSelect } from "shards-react";
  import moment from 'moment';
  import MomentUtils from '@date-io/moment';
  import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
  // import "moment/locale/vi";

  import CustomModal from '../../components/common/CustomModal/CustomModal';
  import * as Constants from '../../constants/constants';
  import * as Utils from '../../utils/utils';
  import * as API from '../../api/thuMucAPI';
  import * as Services from '../../services/googleDriveServices';

const DeTailGiangVienModal = ({ isModalOpen, toggleModal, selected, onClose, onUpdate }) => {
  // const [ giangVien, setGiangVien ] = useState(null);
  // let thuMuc;
  const [ thuMuc, setThuMuc ] = useState({});
  const [ mode, setMode ] = useState(Constants.DETAIL_MODE_VIEW);
  // moment.locale("vi");
  const dateTimePickerRef = useRef();

  // useEffect(() => {
  //   if (mode === Constants.DETAIL_MODE_EDIT) {
  //     setGiangVien(selectedGV);
  //   }
  // }, [mode]);

  const onEnter = () => {
    // setGiangVien(selectedGV);
    // setMode(Constants.DETAIL_MODE_VIEW);
    // thuMuc = selected;
    setThuMuc(selected);
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
    console.log(thuMuc);
    if (thuMuc._id == null) {
      Services.createFolder(thuMuc.name)
        .then((res) => {
          console.log('id');
          console.log(res.result.id);
          Services.setPermission(res.result.id)
            .then((res2) => {
              console.log(res2);
              API.createThuMuc({ ...thuMuc, driveId: res.result.id })
                .then((res3) => {
                  console.log('db');
                  console.log(res3);
                });
            });
        })
        .catch((err) => {
          console.log(err);
        })
      // createThuMuc(thuMuc)
      //   .then((res) => {
      //     console.log(res);
      //     onUpdate();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
    }
    // updateGiangVienById(giangVien._id, giangVien)
    //   .then((res) => {
    //     console.log(res);
    //     onUpdateGV();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  const callDateTimePicker = () => {
    console.log(dateTimePickerRef);
    dateTimePickerRef.current.click();
  }

  return (
    <CustomModal isOpen={isModalOpen} toggle={toggleModal} onClose={onClose}
      onEnter={onEnter}
      title={ thuMuc._id == null ? "Thư mục mới" : "Thông tin Thư mục"}
      body={
        <div>
          <div>
            <FormGroup>
              <label htmlFor="feName">Tên thư mục</label>
              <FormInput
                id="feName"
                value={thuMuc.name}
                onChange={(e) => { setThuMuc({ ...thuMuc, name: e.target.value }) }}
              />
            </FormGroup>
            {/* <FormGroup>
              <label htmlFor="feName">Họ tên</label>
              <FormInput
                id="feName"
                value={giangVien.name}
                onChange={(e) => { setGiangVien({ ...giangVien, name: e.target.value }) }}
              />
            </FormGroup> */}
            {/* <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                required
                label="End at"
                inputVariant="outlined"
                style={{ margin: 10, marginBottom: 20 }}
                fullWidth
                minDate={moment()}
                minutesStep={5}
                value={thuMuc.deadline}
                onChange={(date) => {
                  if (date) {
                    setThuMuc({...thuMuc, deadline: date.toISOString()});
                  }
                }}
              />
            </MuiPickersUtilsProvider> */}
            <FormGroup>
              <div id="mui-date-hidden" style={{ display: 'none' }}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DateTimePicker value={thuMuc.deadline}
                      onChange={(date) => {
                        if (date) {
                          setThuMuc({...thuMuc, deadline: date.toISOString()});
                        }
                      }}
                      innerRef={dateTimePickerRef} />
                </MuiPickersUtilsProvider>
              </div>
              <label htmlFor="feDeadline">Deadline</label>
              <FormInput
                id="feDeadline"
                value={thuMuc.deadline}
                onClick={callDateTimePicker}
              />
            </FormGroup>
            {/* <FormGroup>
              <label htmlFor="feLink">Link</label>
              <FormInput
                id="feLink"
                value={thuMuc.link}
                onChange={(e) => { setThuMuc({ ...thuMuc, link: e.target.value }) }}
              />
            </FormGroup> */}
          </div>
        </div>
      }
      footer={
        <div>
          <Button onClick={onCreateOrUpdateClick}>{thuMuc._id == null ? 'Tạo thư mục' : 'Cập nhật'}</Button>
        </div>
      }
    />
  );
}

export default DeTailGiangVienModal;
