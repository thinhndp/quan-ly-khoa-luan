import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import VisibilityIcon from '@material-ui/icons/Visibility';
import LaunchIcon from '@material-ui/icons/Launch';

import { deleteHoiDongById, getHoiDongsWithQuery } from '../../api/hoiDongAPI';
import * as Utils from '../../utils/utils';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import CreateOrEditPhongHocModal from './CreateOrEditPhongHocModal';
import ThanhPhanModal from './ThanhPhanModal';
import DeTaiPhanBienListModal from './DeTaiPhanBienListModal';
import LyrTable from '../../components/common/LyrTable/LyrTable';

import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal/ConfirmDeleteModal";

const ListHoiDong = () => {
  const [ hoiDongs, setHoiDongs ] = useState([]);
  const [ selectedPH, setSelectedPH ] = useState(Utils.getNewPhongHoc);
  const [ selectedHD, setSelectedHD ] = useState(Utils.getNewHoiDong);
  const [ selectedDTHD, setSelectedDTHD ] = useState(Utils.getNewHoiDong);
  const [ isOpenPHModal, setIsOpenPHModal ] = useState(false);
  const [ isOpenTPModal, setIsOpenTPModal ] = useState(false);
  const [ isOpenDTModal, setIsOpenDTModal ] = useState(false);
  const [ resData, setResData ] = useState(Utils.getNewPageData());

  let history = useHistory();

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setHoiDongs(resData.docs);
  }, [resData]);

  useEffect(() => {
    if (selectedPH._id != null) {
      setIsOpenPHModal(true);
    }
  }, [selectedPH]);

  useEffect(() => {
    console.log('selectedHD');
    console.log(selectedHD);
    if (selectedHD._id != null) {
      setIsOpenTPModal(true);
    }
    else {
      setIsOpenTPModal(false);
    }
  }, [selectedHD]);

  useEffect(() => {
    console.log(selectedDTHD);
    if (selectedDTHD._id != null) {
      setIsOpenDTModal(true);
    }
    else {
      setIsOpenDTModal(false);
    }
  }, [selectedDTHD]);

  /* const getList = () => {
    getHoiDongs()
      .then((res) => {
        console.log(res);
        setHoiDongs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } */

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions()) => {
    getHoiDongsWithQuery(search, pagingOptions)
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => {
        setResData(Utils.getNewPageData());
        Utils.showErrorToast(err.response.data.message);
        console.log(err);
      });
  }

  const onDeleteClick = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmDeleteModal onClose={onClose} onConfirm={() => {
            toast.promise(
              deleteHoiDongById(id),
              {
                loading: 'Đang xóa',
                success: (res) => {
                  getList();
                  onClose();
                  return 'Xóa thành công';
                },
                error: (err) => {
                  return err.response.data.message;
                }
              },
              Utils.getToastConfig()
            );
          }} />
        );
      }
    });
    /* deleteHoiDongById(id)
      .then((res) => {
        console.log(res);
        getList();
      })
      .catch((err) => {
        console.log(err);
      }); */
  }

  const onEditClick = (hoiDong) => {
    history.push(`/hoi-dong/create-or-edit/${hoiDong._id}`);
  }

  const onEditPHClick = (phongHoc) => {
    setSelectedPH(phongHoc);
  }

  const onCreateClick = () => {
    history.push('/hoi-dong/create-or-edit/');
  }

  const onUpdated = () => {
    setIsOpenPHModal(false);
    getList();
  }

  const onPHUpdated = () => {
    setIsOpenPHModal(false);
    getList();
  }

  const onCreated = () => {
    setIsOpenPHModal(false);
    getList();
  }

  const onPHCreated = () => {
    setIsOpenPHModal(false);
    // getList();
  }

  const onClose = () => {
    setSelectedPH(Utils.getNewPhongHoc);
  }

  const onPHClose = () => {
    setSelectedPH(Utils.getNewPhongHoc);
  }

  const togglePHModal = () => {
    setIsOpenPHModal(!isOpenPHModal);
  }

  const toggleTPModal = () => {
    setIsOpenTPModal(!isOpenTPModal);
  }

  const toggleDTModal = () => {
    setIsOpenDTModal(!isOpenDTModal);
  }

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách Hội đồng chấm" subtitle="QUẢN LÝ HỘI ĐỒNG CHẤM" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <LyrTable
            buttonSection={
              <div>
                <Button onClick={onCreateClick}>Tạo Hội đồng</Button>
                <span class="pr-05r"/>
                <Button onClick={() => { setIsOpenPHModal(true) }}>Thêm Phòng học</Button>
              </div>
            }
            data={resData}
            getList={getList}
          >
            <table className="table mb-0 c-table">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    Tên Hội đồng
                  </th>
                  <th scope="col" className="border-0">
                    Thành phần Hội đồng
                  </th>
                  <th scope="col" className="border-0">
                    Địa điểm tổ chức phản biện
                  </th>
                  <th scope="col" className="border-0">
                    Dự kiến bắt đầu
                  </th>
                  <th scope="col" className="border-0">
                    Dự kiến kết thúc
                  </th>
                  <th scope="col" className="border-0">
                    Các đề tài
                  </th>
                  <th scope="col" className="border-0">
                    Action
                  </th>
                  {/* <th scope="col" className="border-0">
                    Link
                  </th>
                  <th scope="col" className="border-0">
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {
                  hoiDongs.map((hoiDong, index) => (
                    <tr key={`hoi-dong_${index}`}>
                      <td>{hoiDong.name}</td>
                      <td>
                        <LaunchIcon color="primary" className="icon-button"
                          onClick={() => { setSelectedHD(hoiDong) }}/>
                      </td>
                      <td>{hoiDong.phongHoc.name}</td>
                      <td>{Utils.getLocaleDateString(hoiDong.startAt)}</td>
                      <td>{Utils.getLocaleDateString(hoiDong.endAt)}</td>
                      <td>
                        <LaunchIcon color="primary" className="icon-button"
                          onClick={() => { setSelectedDTHD(hoiDong) }}/>
                      </td>
                      <td>
                        <ActionButtons
                          onDeleteClick={() => { onDeleteClick(hoiDong._id) }}
                          onEditClick={() => { onEditClick(hoiDong) }} />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </LyrTable>
          {/* <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Button onClick={onCreateClick}>Tạo Hội đồng</Button>
              <span class="pr-05r"/>
              <Button onClick={() => { setIsOpenPHModal(true) }}>Thêm Phòng học</Button>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Tên Hội đồng
                    </th>
                    <th scope="col" className="border-0">
                      Thành phần Hội đồng
                    </th>
                    <th scope="col" className="border-0">
                      Địa điểm tổ chức phản biện
                    </th>
                    <th scope="col" className="border-0">
                      Dự kiến bắt đầu
                    </th>
                    <th scope="col" className="border-0">
                      Dự kiến kết thúc
                    </th>
                    <th scope="col" className="border-0">
                      Các đề tài
                    </th>
                    <th scope="col" className="border-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    hoiDongs.map((hoiDong, index) => (
                      <tr key={`hoi-dong_${index}`}>
                        <td>{hoiDong.name}</td>
                        <td>
                          <LaunchIcon color="primary" className="icon-button"
                            onClick={() => { setSelectedHD(hoiDong) }}/>
                        </td>
                        <td>{hoiDong.phongHoc.name}</td>
                        <td>{hoiDong.startAt}</td>
                        <td>{hoiDong.endAt}</td>
                        <td>
                          <LaunchIcon color="primary" className="icon-button"
                            onClick={() => { setSelectedDTHD(hoiDong) }}/>
                        </td>
                        <td>
                          <ActionButtons
                            onDeleteClick={() => { onDeleteClick(hoiDong._id) }}
                            onEditClick={() => { onEditClick(hoiDong) }} />
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </CardBody>
          </Card> */}
        </Col>
      </Row>
      <CreateOrEditPhongHocModal isModalOpen={isOpenPHModal} toggleModal={togglePHModal} selected={selectedPH} onClose={onPHClose} onUpdated={onPHUpdated}
          onCreated={onPHCreated}/>
      <ThanhPhanModal isOpen={isOpenTPModal} toggle={toggleTPModal} selected={selectedHD}
          onClose={() => { setSelectedHD(Utils.getNewHoiDong) }} />
      <DeTaiPhanBienListModal isOpen={isOpenDTModal} toggle={toggleDTModal} selected={selectedDTHD}
          onClose={() => { setSelectedDTHD(Utils.getNewHoiDong) }} />
      {/* <EditHoiDongModal isOpen={isOpenPHModal}/> */}
    </Container>
  )
};

export default ListHoiDong;
