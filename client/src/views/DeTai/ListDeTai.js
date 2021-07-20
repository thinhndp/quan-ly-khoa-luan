import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormInput} from "shards-react";
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import xlsxParser from 'xlsx-parse-json';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LaunchIcon from '@material-ui/icons/Launch';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';

import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal/ConfirmDeleteModal";
import commonStyles from '../../styles/CommonStyles.module.scss';
import styles from './styles.module.scss';
import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import { getDeTaisWithQuery, deleteDeTaiById, getDeTaisWithPendingApproval, updateNameChange, approveMidTerm,
  getDeTaisWithNameChange, undoApproveMidTerm, getCurrrentKTHDeTais } from '../../api/deTaiAPI';
import { getSystemSettings, updateSystemSetting } from '../../api/systemSettingAPI';
import CustomModal from '../../components/common/CustomModal/CustomModal';
import { FormGroup } from "@material-ui/core";
import * as Constants from '../../constants/constants';
import * as Utils from '../../utils/utils';
import GiangVienModal from './DetailGiangVienModal';
import DeXuatButton from '../../components/post/DeXuatButton';
import DangKyDTButton from '../../components/post/DangKyDTButton';
import LyrTable from '../../components/common/LyrTable/LyrTable';
import DetailSVThucHienButton from './DetailSVThucHienButton';

const ListDeTai = () => {
  const [ deTais, setDeTais ] = useState([]);
  const [ isOpenActions, setIsOpenActions ] = useState(false);
  const [ isDKModalOpen, setIsDKModalOpen ] = useState(false);
  const [ isGVModalOpen, setIsGVModalOpen ] = useState(false);
  const [ deXuatToiDa, setDeXuatToiDa ] = useState(0);
  const [ selectedGV, setSelectedGV ] = useState(null);
  const [ listMode, setListMode ] = useState(0);
  const [ resData, setResData ] = useState(Utils.getNewPageData());
  const [ isFileResetting, setIsFileResetting ] = useState(false);
  let history = useHistory();
  const inputFile = useRef(null);

  useEffect(() => {
    getDeTaiList();
    getDeXuatToiDa();
  }, []);

  useEffect(() => {
    getDeTaiList();
  }, [listMode]);

  useEffect(() => {
    if (listMode == 0) {
      setDeTais(resData.docs);
    }
    else {
      let sortedList = [ ...resData.docs ];
      sortedList.sort((dt1, dt2) => {
        if (!dt1.xacNhanGiuaKi.status || dt1.xacNhanGiuaKi.status == Constants.DE_TAI_NAME_CHANGE_REJECTED) {
          return 1;
        }
        if (!dt2.xacNhanGiuaKi.status || dt2.xacNhanGiuaKi.status == Constants.DE_TAI_NAME_CHANGE_REJECTED) {
          return -1;
        }
        if (dt1.xacNhanGiuaKi.status == Constants.DE_TAI_NAME_CHANGE_APPROVED && (dt1.xacNhanGiuaKi.status != dt2.xacNhanGiuaKi.status)) {
          return 1;
        }
        if (dt1.xacNhanGiuaKi.status == Constants.DE_TAI_NAME_CHANGE_NOT_APPROVED && (dt1.xacNhanGiuaKi.status != dt2.xacNhanGiuaKi.status)) {
          return -1;
        }
        return 0;
      })
      setDeTais(sortedList);
    }
  }, [resData]);

  useEffect(() => {
    if (isFileResetting) {
      setIsFileResetting(false);
    }
  }, [isFileResetting]);

  useEffect(() => {
    // toggleGVModal();
    if (selectedGV != null) {
      setIsGVModalOpen(true);
    }
    else {
      setIsGVModalOpen(false);
    }
  }, [selectedGV]);

  /* const getDeTaiList = () => {
    getDeTaisWithQuery()
      .then((res) => {
        console.log(res);
        setDeTais(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  } */

  const onImportButtonClick = () => {
    inputFile.current.click();
  }

  const handleImportNameChangeList = event => {
    const { files } = event.target;
    console.log(files);
    xlsxParser
      .onFileSelection(files[0])
      .then(data => {
        var parsedData = data;
        var changes = parsedData.Sheet1;
        console.log(changes);
        toast.promise(
          updateNameChange(changes),
          {
            loading: 'Đang cập nhật',
            success: (res) => {
              getDeTaiList();
              return 'Cập nhật thành công';
            },
            error: (err) => {
              return Utils.getFormattedErrMsg(err);
            }
          },
          Utils.getToastConfig()
        );
        // upsertSinhViens(sinhViens)
        //   .then((res) => {
        //     console.log(res);
        //     setIsFileResetting(true);
        //     getList();
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   })
      });
  }

  const getDeTaiList = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
    if (listMode == 0) {
      getDeTaisWithQuery(search, pagingOptions, filters)
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
    else if (listMode == 1) {
      // getDeTaisWithPendingApproval(search, pagingOptions, filters)
      getDeTaisWithNameChange(search, pagingOptions, filters)
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
    else if (listMode == 2) {
      getCurrrentKTHDeTais(search, pagingOptions, filters)
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
  }

  const getDeXuatToiDa = () => {
    getSystemSettings()
      .then((res) => {
        console.log(res);
        if (res.data != null && res.data[0] != null && res.data[0].deXuatToiDa != null) {
          setDeXuatToiDa(res.data[0].deXuatToiDa);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const toggleActions = () => {
    setIsOpenActions(!isOpenActions);
  }

  const toggleDKModal = () => {
    setIsDKModalOpen(!isDKModalOpen);
  }

  const toggleGVModal = () => {
    setIsGVModalOpen(!isGVModalOpen);
  }

  const onEditClick = (id) => {
    // history.push(`/de-tai/${id}`);
    window.open(`de-tai/${id}`, "_blank");
  }
  const onDeleteClick = (id) => {
    // console.log(id);
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmDeleteModal onClose={onClose} onConfirm={() => {
            toast.promise(
              deleteDeTaiById(id),
              {
                loading: 'Đang xóa',
                success: (res) => {
                  getDeTaiList();
                  onClose();
                  return 'Xóa thành công';
                },
                error: (err) => {
                  return Utils.getFormattedErrMsg(err);
                }
              },
              Utils.getToastConfig()
            );
          }} />
        );
      }
    });
    /* deleteDeTaiById(id)
      .then((res) => {
        console.log(res);
        getDeTaiList();
      })
      .catch((err) => {
        console.log(err);
      }); */
  }
  const onDeXuatToiDaUpdate = () => {
    console.log(deXuatToiDa);
    toast.promise(
      updateSystemSetting({ deXuatToiDa: deXuatToiDa, instance: Constants.SYSTEM_SETTING_INSTANCE }),
      {
        loading: 'Đang cập nhật',
        success: (res) => {
          console.log(res);
          getDeXuatToiDa();
          toggleDKModal();
          return 'Cập nhật thành công';
        },
        error: (err) => {
          return Utils.getFormattedErrMsg(err);
        }
      },
      Utils.getToastConfig()
    );
    /* updateSystemSetting({ deXuatToiDa: deXuatToiDa, instance: Constants.SYSTEM_SETTING_INSTANCE })
      .then((res) => {
        console.log(res);
        getDeXuatToiDa();
        toggleDKModal();
      })
      .catch((err) => {
        console.log(err);
      }) */
  }

  const onApproveMidTermClick = (deTaiId, action, type = 'NAME') => {
    toast.promise(
      approveMidTerm(deTaiId, { type: type, action: action }),
      {
        loading: 'Đang cập nhật',
        success: (res) => {
          getDeTaiList();
          return 'Cập nhật thành công';
        },
        error: (err) => {
          return Utils.getFormattedErrMsg(err);
        }
      },
      Utils.getToastConfig()
    );
  }

  const onUndoApproveMidTermClick = (deTaiId, type = 'NAME') => {
    toast.promise(
      undoApproveMidTerm(deTaiId, { type: type }),
      {
        loading: 'Đang hoàn tác',
        success: (res) => {
          getDeTaiList();
          return 'Hoàn tác thành công';
        },
        error: (err) => {
          return Utils.getFormattedErrMsg(err);
        }
      },
      Utils.getToastConfig()
    );
  }

  const onGVClick = (id) => {
    setSelectedGV(id);
  }

  const onGVModalClose = () => {
    setSelectedGV(null);
  }

  const onUpdateGV = () => {
    setSelectedGV(null);
    getDeTaiList();
  }

  const onCompleted = () => {
    getDeTaiList();
  }

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách Đề tài" subtitle="QUẢN LÝ ĐỀ TÀI" className="text-sm-left" />
      </Row>
      <ButtonGroup className="mr-2 btn-group width-100 mb-15">
        <Button className={listMode == 0 ? "t-button-font" : "t-button"} onClick={() => { setListMode(0) }}>
          Tất cả đề tài
        </Button>
        <Button className={listMode != 0 ? "t-button-font" : "t-button"} onClick={() => { setListMode(1) }}>
          Đề tài chờ xác nhận Giữa kỳ
        </Button>
      </ButtonGroup>
      {/* Table */}
      { listMode == 0 && (
        <Row>
          <Col>
            <LyrTable
              buttonSection={
                <Row>
                  <span class="pr-05r"/>
                  <Button onClick={toggleDKModal}>Tùy chỉnh điều kiện</Button>
                  {/* <span class="pr-05r"/>
                  <DeXuatButton onCompleted={onCompleted}/>
                  <span class="pr-05r"/> */}
                </Row>
              }
              data={resData}
              getList={getDeTaiList}
              tableMode={true}
              headers={[
                {
                  label: "Tên Đề tài",
                  type: Constants.FILTER_TYPE_EQ,
                  field: 'tenDeTai',
                },
                {
                  label: "Giảng viên Hướng dẫn",
                  type: Constants.FILTER_TYPE_EQ,
                  field: 'giangVien',
                },
                {
                  label: "Mô tả",
                  type: Constants.FILTER_TYPE_EQ,
                  field: 'moTa',
                },
                {
                  label: "Kỳ thực hiện",
                  type: Constants.FILTER_TYPE_EQ,
                  field: 'kyThucHien',
                },
                {
                  label: "Trạng thái duyệt",
                  type: Constants.FILTER_TYPE_SL,
                  selectList: Utils.getDeTaiApproveStatusSL(),
                  field: 'trangThaiDuyet',
                },
                {
                  label: "Trạng thái thực hiện",
                  type: Constants.FILTER_TYPE_SL,
                  selectList: Utils.getDeTaiProgressStatusSL(),
                  field: 'trangThaiThucHien',
                },
                {
                  label: "Hệ đào tạo",
                  type: Constants.FILTER_TYPE_SL,
                  selectList: Utils.getHeDaoTaoSL(),
                  field: 'heDaoTao',
                },
                // {
                //   label: "Điểm số",
                //   type: Constants.FILTER_TYPE_EQ,
                //   field: 'diemSo',
                // },
                {
                  label: "SV Thực hiện",
                  type: Constants.FILTER_TYPE_EQ,
                  field: 'sinhVienThucHien',
                },
                {
                  label: "Thao tác",
                  type: Constants.FILTER_TYPE_NL,
                },
              ]}
            >
            <tbody>
              {
                deTais.map((deTai, index) => (
                  <tr key={`de-tai_${index}`}>
                    <td><a href={`/de-tai/detail/${deTai._id}`} target="_blank">{deTai.tenDeTai}</a></td>
                    <td>{deTai.giangVien.name}<span className={styles['small-icon-span']}>
                      <LaunchIcon className={commonStyles['icon-button']} color="primary"
                        style={{ fontSize: '1rem' }} onClick={() => { onGVClick(deTai.giangVien) }}/>
                      </span>
                    </td>
                    <td>{deTai.moTa}</td>
                    <td>{(deTai.kyThucHien != null) ? deTai.kyThucHien.name : ''}</td>
                    <td>{Utils.getDeTaiApproveStatusText(deTai.trangThaiDuyet)}</td>
                    <td>{Utils.getDeTaiProgressStatusText(deTai.trangThaiThucHien)}</td>
                    <td>{Utils.getHeDaoTaoText(deTai.heDaoTao)}</td>
                    {/* <td>{deTai.diemSo}</td> */}
                    {/* <td>{Utils.getSinhVienNumOfDeTai(deTai)}</td> */}
                    <td><DetailSVThucHienButton deTai={deTai} /></td>
                    <td>
                      <ActionButtons onEditClick={() => onEditClick(deTai._id)}
                          onDeleteClick={() => onDeleteClick(deTai._id)} />
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </LyrTable>
          </Col>
        </Row>
      ) }
      { listMode == 1 && (
        <Row>
          <Col>
            <LyrTable
              buttonSection={
                <Row>
                  {/* <span class="pr-05r"/>
                  <Button onClick={toggleDKModal}>Tùy chỉnh điều kiện</Button> */}
                  <span class="pr-05r"/>
                  <ButtonGroup className="mr-2 btn-group">
                    <Button className={listMode == 1 ? "" : "t-button small-font"} onClick={() => { setListMode(1) }}>
                      Xác nhận đổi tên
                    </Button>
                    <Button className={listMode == 2 ? "" : "t-button small-font"} onClick={() => { setListMode(2) }}>
                      Xác nhận tiến độ sinh viên
                    </Button>
                  </ButtonGroup>
                  <span class="pr-05r"/>
                  {!isFileResetting && (
                      <div>
                        <Button onClick={onImportButtonClick}>Nhập danh sách thay đổi tên</Button>
                        <input type="file" id="file" ref={inputFile}
                          style={{ display: 'none' }} onChange={(e) => handleImportNameChangeList(e)} on />
                      </div>
                    )
                  }
                </Row>
              }
              data={resData}
              getList={getDeTaiList}
              tableMode={true}
              headers={[
                {
                  label: "Tên Đề tài",
                  type: Constants.FILTER_TYPE_EQ,
                  field: 'tenDeTai',
                },
                {
                  label: "Tên mới",
                  type: Constants.FILTER_TYPE_NL,
                },
                {
                  label: "Tên tiếng Anh cũ",
                  type: Constants.FILTER_TYPE_NL,
                },
                {
                  label: "Tên tiếng Anh mới",
                  type: Constants.FILTER_TYPE_NL,
                },
                {
                  label: "Trạng thái",
                  type: Constants.FILTER_TYPE_SL,
                  selectList: Utils.getDeTaiNameChangeStatusSL(),
                  field: 'xacNhanGiuaKi.status',
                },
                {
                  label: "Thao tác",
                  type: Constants.FILTER_TYPE_NL,
                },
              ]}
            >
            <tbody>
              {
                deTais.map((deTai, index) => (
                  <tr key={`de-tai_${index}`}>
                    <td>{(deTai.xacNhanGiuaKi.oldName != '') ? deTai.xacNhanGiuaKi.oldName : deTai.tenDeTai}</td>
                    <td>{(deTai.xacNhanGiuaKi.newName && deTai.xacNhanGiuaKi.newName != '')
                          ? deTai.xacNhanGiuaKi.newName : '-'}
                    </td>
                    <td>{(deTai.xacNhanGiuaKi.oldEngName != '') ? deTai.xacNhanGiuaKi.oldEngName : deTai.englishName}</td>
                    <td>{(deTai.xacNhanGiuaKi.newEnglishName && deTai.xacNhanGiuaKi.newEnglishName != '')
                          ? deTai.xacNhanGiuaKi.newEnglishName : '-'}</td>
                    <td>{(deTai.xacNhanGiuaKi.status)
                          ? Utils.getDeTaiNameChangeStatusText(deTai.xacNhanGiuaKi.status) : '-'}</td>
                    {/* <td><DetailSVThucHienButton deTai={deTai} /></td>
                    <td>{deTai.xacNhanGiuaKi.sinhVien1.tiepTuc ? 'Có' : 'Không'}</td>
                    <td>{
                      deTai.sinhVienThucHien.length > 1
                        ? (deTai.xacNhanGiuaKi.sinhVien2.tiepTuc ? 'Có' : 'Không')
                        : '-'
                    }</td> */}
                    <td className='flex-row' style={{ justifyContent: 'center' }}>
                      { (deTai.xacNhanGiuaKi.status && deTai.xacNhanGiuaKi.status == Constants.DE_TAI_NAME_CHANGE_NOT_APPROVED)
                        && (
                          <div className='flex-col'>
                            <Button onClick={() => { onApproveMidTermClick(deTai._id, 'APPROVE') }}>Xác nhận</Button>
                            <div className='pt-05r'/>
                            <Button theme='danger' onClick={() => { onApproveMidTermClick(deTai._id, 'REJECT') }}>Từ chối</Button>
                          </div>
                        )
                      }
                      { (deTai.xacNhanGiuaKi.status && deTai.xacNhanGiuaKi.status != Constants.DE_TAI_NAME_CHANGE_NOT_APPROVED)
                        && (
                          <div>
                            <Button theme='secondary' onClick={() => { onUndoApproveMidTermClick(deTai._id) }}>Hoàn tác</Button>
                          </div>
                        )
                      }
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </LyrTable>
          </Col>
        </Row>
      ) }
      { listMode == 2 && (
        <Row>
          <Col>
            <LyrTable
              buttonSection={
                <Row>
                  {/* <span class="pr-05r"/>
                  <Button onClick={toggleDKModal}>Tùy chỉnh điều kiện</Button> */}
                  <span class="pr-05r"/>
                  <ButtonGroup className="mr-2 btn-group">
                    <Button className={listMode == 1 ? "" : "t-button small-font"} onClick={() => { setListMode(1) }}>
                      Xác nhận đổi tên
                    </Button>
                    <Button className={listMode == 2 ? "" : "t-button small-font"} onClick={() => { setListMode(2) }}>
                      Xác nhận tiến độ sinh viên
                    </Button>
                  </ButtonGroup>
                </Row>
              }
              data={resData}
              getList={getDeTaiList}
              tableMode={true}
              headers={[
                {
                  label: "Tên Đề tài",
                  type: Constants.FILTER_TYPE_EQ,
                  field: 'tenDeTai',
                },
                {
                  label: "Sinh viên",
                  type: Constants.FILTER_TYPE_NL,
                },
                {
                  label: "SV1 tiếp tục thực hiện",
                  type: Constants.FILTER_TYPE_NL,
                },
                {
                  label: "SV2 tiếp tục thực hiện",
                  type: Constants.FILTER_TYPE_NL,
                },
                {
                  label: "Trạng thái",
                  type: Constants.FILTER_TYPE_SL,
                  selectList: Utils.getDeTaiMidProgressStatusSL(),
                  field: 'xacNhanGiuaKi.progressStatus',
                },
                {
                  label: "Thao tác",
                  type: Constants.FILTER_TYPE_NL,
                },
              ]}
            >
            <tbody>
              {
                deTais.map((deTai, index) => (
                  <tr key={`de-tai_${index}`}>
                    <td>{deTai.tenDeTai}</td>
                    <td><DetailSVThucHienButton deTai={deTai} /></td>
                    <td>{deTai.xacNhanGiuaKi.sinhVien1.tiepTuc ? 'Có' : 'Không'}</td>
                    <td>{
                      deTai.sinhVienThucHien.length > 1
                        ? (deTai.xacNhanGiuaKi.sinhVien2.tiepTuc ? 'Có' : 'Không')
                        : '-'
                    }</td>
                    <td>{(deTai.xacNhanGiuaKi.progressStatus)
                          ? Utils.getDeTaiMidProgressStatusText(deTai.xacNhanGiuaKi.progressStatus) : '-'}</td>
                    <td className='flex-row' style={{ justifyContent: 'center' }}>
                      { (deTai.xacNhanGiuaKi.progressStatus && deTai.xacNhanGiuaKi.progressStatus == Constants.DE_TAI_MID_PROGRESS_WAITING)
                        && (
                          <div>
                            <Button theme='light' disabled>-</Button>
                          </div>
                        )
                      }
                      { (deTai.xacNhanGiuaKi.progressStatus && deTai.xacNhanGiuaKi.progressStatus == Constants.DE_TAI_MID_PROGRESS_NOT_APPROVED)
                        && (
                          <div className='flex-col'>
                            <Button onClick={() => { onApproveMidTermClick(deTai._id, 'APPROVE', 'PROGRESS') }}>Xác nhận</Button>
                            <div className='pt-05r'/>
                            <Button theme='danger' onClick={() => { onApproveMidTermClick(deTai._id, 'REJECT', 'PROGRESS') }}>Từ chối</Button>
                          </div>
                        )
                      }
                      { (deTai.xacNhanGiuaKi.progressStatus &&
                        (deTai.xacNhanGiuaKi.progressStatus != Constants.DE_TAI_MID_PROGRESS_NOT_APPROVED
                          && deTai.xacNhanGiuaKi.progressStatus != Constants.DE_TAI_MID_PROGRESS_WAITING))
                        && (
                          <div>
                            <Button theme='secondary' onClick={() => { onUndoApproveMidTermClick(deTai._id, 'PROGRESS') }}>Hoàn tác</Button>
                          </div>
                        )
                      }
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </LyrTable>
          </Col>
        </Row>
      ) }
      {/* Dieu kien de xuat Modal */}
      <CustomModal isOpen={isDKModalOpen} toggle={toggleDKModal}
        title='Tùy chỉnh điều kiện'
        body={
          <div>
            <FormGroup>
              <label htmlFor="deXuatToiDa">Số đề tài đề xuất tối đa</label>
              <FormInput id="deXuatToiDa" placeholder="Số lượng đề tài tối đa được đăng ký"
                onChange={(e) => { setDeXuatToiDa(e.target.value) }} value={deXuatToiDa} />
            </FormGroup>
          </div>
        }
        footer={
          <div>
            <Button onClick={onDeXuatToiDaUpdate}>Cập nhật</Button>
          </div>
        }
      />
      {/* Giang Vien Dtail Modal */}
      <GiangVienModal selectedGV={selectedGV} isGVModalOpen={isGVModalOpen}
        toggleGVModal={toggleGVModal} onClose={onGVModalClose} onUpdateGV={onUpdateGV}/>
    </Container>
  );
}

export default ListDeTai;
