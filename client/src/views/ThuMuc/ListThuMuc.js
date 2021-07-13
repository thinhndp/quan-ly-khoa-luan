import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup } from "shards-react";
import PublishIcon from '@material-ui/icons/Publish';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { getThuMucs, getThuMucsWithQuery } from '../../api/fileNopAPI';
import * as Utils from '../../utils/utils';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import CreateOrEditThuMucModal from './CreateOrEditThuMucModal';
import FileSubmitterButton from '../../components/FileSubmitter/FileSubmitterButton';
import LyrTable from '../../components/common/LyrTable/LyrTable';

import './styles.css';

const ListThuMuc = () => {
  const [ thuMucs, setThuMucs ] = useState([]);
  const [ viewMode, setViewMode ] = useState(0);
  // const [ isFileResetting, setIsFileResetting ] = useState(false);
  const [ isOpenModal, setIsOpenModal ] = useState(false);
  const [ selectedThuMuc, setSelectedThuMuc ] = useState({});
  const [ resData, setResData ] = useState(Utils.getNewPageData());

  let history = useHistory();
  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setThuMucs(resData.docs);
  }, [resData]);

  /* const getList = () => {
    getThuMucs()
      .then((res) => {
        console.log(res);
        setThuMucs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } */

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions()) => {
    getThuMucsWithQuery(search, pagingOptions)
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => {
        setResData(Utils.getNewPageData());
        Utils.showErrorToast(err.response.data.message);
        console.log(err.response);
      });
  }

  const switchView = (mode) => {
    setViewMode(mode);
  }

  const onDeleteClick = (id) => {
    // deleteSinhVienById(id)
    //   .then((res) => {
    //     console.log(res);
    //     getList();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  const onEditClick = (id) => {
    // history.push('/sinh-vien/edit', { sinhVienId: id });
    // history.push(`/sinh-vien/edit/${id}`);
  }

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  }

  const onModalClose = () => {
    setSelectedThuMuc({});
  }

  const onUpdateThuMuc = () => {
    setSelectedThuMuc({});
    getList();
    setIsOpenModal(false);
  }

  const onThuMucClick = (thuMuc) => {
    history.push(`/thu-muc/${thuMuc._id}/files`, thuMuc);
  }

  const onCreateFileClick = (id) => {

  }

  const onFileUploaded = () => {
    getList();
  }

  const renderFoldersView = () => {
    return (
      <div className="folders-view">
        {
          thuMucs.map((thuMuc) => (
            <div className="folder">
              <FolderIcon fontSize="large" />
              <div className="folder-info">
                <div onClick={(e) => { onThuMucClick(thuMuc) }} className="click-zone" />
                <div class="action-icons">
                  <FileSubmitterButton onUploaded={onFileUploaded} folderId={thuMuc._id}
                      folderDriveId={thuMuc.driveId}
                      renderAs={
                        <PublishIcon color="inherit" className="icon-button" />
                      }/>
                  <EditIcon color="inherit" className="icon-button"
                      onClick={() => {}}/>
                  <DeleteIcon color="inherit" className="icon-button"
                      onClick={() => {}}/>
                </div>
                <div className="info-container truncate">
                  <div className="submitted">
                    {/* <div>ĐÃ NỘP</div> */}
                    {/* <div>
                      {thuMuc.files.slice(0, 4).map((file) => (
                        <img src={file.user.picture}/>
                      ))}
                    </div> */}
                    <div>
                      {Utils.getUniqueUploader(thuMuc.files).map((user) => (
                        <img src={user.picture}/>
                      ))}
                    </div>
                  </div>
                  <div className="flex-filler"/>
                  <div className="folder-name">
                    {/* <div>FOLDER</div> */}
                    <div className="main-text truncate">{thuMuc.name}</div>
                    {/* <div className="sub-text">{Utils.getThuMucStatusText(thuMuc.status)}</div> */}
                    <div className="sub-text">{thuMuc.files.length} files</div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách Thư Mục" subtitle="QUẢN LÝ FILE NỘP" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <LyrTable
            buttonSection={
              <div>
                <ButtonGroup className="mr-2 btn-group">
                  <Button className={viewMode == 1 ? "" : "t-button"} onClick={() => { switchView(1) }}>
                    <ViewListIcon fontSize="small"/>
                  </Button>
                  <Button className={viewMode == 0 ? "" : "t-button"} onClick={() => { switchView(0) }}>
                    <ViewModuleIcon fontSize="small"/>
                  </Button>
                </ButtonGroup>
                <Button onClick={toggleModal}>Tạo mới</Button>
              </div>
            }
            data={resData}
            getList={getList}
          >
            <div>
              { viewMode == 0 && (
                renderFoldersView()
              ) }
              { viewMode == 1 && (
                <table className="table mb-0 c-table">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Tên
                      </th>
                      <th scope="col" className="border-0">
                        Số file đã nộp
                      </th>
                      <th scope="col" className="border-0">
                        Hạn nộp
                      </th>
                      <th scope="col" className="border-0">
                        Trạng thái
                      </th>
                      <th scope="col" className="border-0">
                        Upload file
                      </th>
                      <th scope="col" className="border-0">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      thuMucs.map((thuMuc, index) => (
                        <tr key={`thu-muc_${index}`}>
                          <td>{thuMuc.name}</td>
                          {/* <td>-</td> */}
                          <td>{thuMuc.files.length}</td>
                          <td>{thuMuc.deadline}</td>
                          <td>{Utils.getThuMucStatusText(thuMuc.status)}</td>
                          <td>
                            <FileSubmitterButton onUploaded={onFileUploaded} folderId={thuMuc._id} renderAs={
                              <PublishIcon color="primary" className="icon-button"
                                onClick={onEditClick}/>
                            }/>
                            {/* <div>
                              <PublishIcon color="primary" className="icon-button"
                                onClick={onEditClick}/>
                            </div> */}
                          </td>
                          <td>
                            <ActionButtons
                              onDeleteClick={() => { onDeleteClick(thuMuc._id) }}
                              onEditClick={() => { onEditClick(thuMuc._id) }} />
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              ) }
            </div>
          </LyrTable>
          {/* <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <ButtonGroup className="mr-2 btn-group">
                <Button onClick={() => { switchView(1) }}>
                  <ViewListIcon fontSize="small"/>
                </Button>
                <Button onClick={() => { switchView(0) }}>
                  <ViewModuleIcon fontSize="small"/>
                </Button>
              </ButtonGroup>
              <Button onClick={toggleModal}>Tạo mới</Button>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              { viewMode == 0 && (
                renderFoldersView()
              ) }
              { viewMode == 1 && (
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Tên
                      </th>
                      <th scope="col" className="border-0">
                        Số file đã nộp
                      </th>
                      <th scope="col" className="border-0">
                        Hạn nộp
                      </th>
                      <th scope="col" className="border-0">
                        Trạng thái
                      </th>
                      <th scope="col" className="border-0">
                        Upload file
                      </th>
                      <th scope="col" className="border-0">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      thuMucs.map((thuMuc, index) => (
                        <tr key={`thu-muc_${index}`}>
                          <td>{thuMuc.name}</td>
                          <td>{thuMuc.files.length}</td>
                          <td>{thuMuc.deadline}</td>
                          <td>{Utils.getThuMucStatusText(thuMuc.status)}</td>
                          <td>
                            <FileSubmitterButton onUploaded={onFileUploaded} folderId={thuMuc._id} renderAs={
                              <PublishIcon color="primary" className="icon-button"
                                onClick={onEditClick}/>
                            }/>
                          </td>
                          <td>
                            <ActionButtons
                              onDeleteClick={() => { onDeleteClick(thuMuc._id) }}
                              onEditClick={() => { onEditClick(thuMuc._id) }} />
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              ) }
            </CardBody>
          </Card> */}
        </Col>
      </Row>
      <CreateOrEditThuMucModal selected={selectedThuMuc} isModalOpen={isOpenModal}
        toggleModal={toggleModal} onClose={onModalClose} onUpdate={onUpdateThuMuc}/>
    </Container>
  )
};

export default ListThuMuc;
