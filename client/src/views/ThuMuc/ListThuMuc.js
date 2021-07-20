import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup } from "shards-react";
import PublishIcon from '@material-ui/icons/Publish';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { getThuMucs, getThuMucsWithQuery, deleteThuMuc } from '../../api/fileNopAPI';
import * as Utils from '../../utils/utils';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal/ConfirmDeleteModal";
import * as Constants from '../../constants/constants';

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
  let { kthId } = useParams();

  let history = useHistory();
  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setThuMucs(resData.docs);
  }, [resData]);

  useEffect(() => {
    if (selectedThuMuc._id != null) {
      setIsOpenModal(true);
    }
  }, [selectedThuMuc]);

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

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
    if (kthId) {
      filters = { ...filters, kyThucHien: { value: kthId, type: Constants.FILTER_TYPE_EQ } };
    }
    getThuMucsWithQuery(search, pagingOptions, filters)
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

  const switchView = (mode) => {
    setViewMode(mode);
  }

  const onDeleteClick = (id) => {
    console.log('delete');
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmDeleteModal onClose={onClose} onConfirm={() => {
            toast.promise(
              deleteThuMuc(id),
              {
                loading: 'Đang xóa',
                success: (res) => {
                  getList();
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
  }

  const onEditClick = (thuMuc) => {
    // history.push('/sinh-vien/edit', { sinhVienId: id });
    // history.push(`/sinh-vien/edit/${id}`);
    setSelectedThuMuc(thuMuc);
  }

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  }

  const onModalClose = () => {
    setSelectedThuMuc(Utils.getNewThuMuc());
  }

  const onUpdateThuMuc = () => {
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
                      onClick={() => { onEditClick(thuMuc) }}/>
                  <DeleteIcon color="inherit" className="icon-button"
                      onClick={() => { onDeleteClick(thuMuc._id) }}/>
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
                        <img src={user.picture} alt="user_picture"/>
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
            tableMode={viewMode == 1}
            headers={[
              {
                label: "Tên",
                type: Constants.FILTER_TYPE_EQ,
                field: 'name',
              },
              {
                label: "Số file đã nộp",
                type: Constants.FILTER_TYPE_NL,
              },
              {
                label: "Upload file",
                type: Constants.FILTER_TYPE_NL,
              },
              {
                label: "Thao tác",
                type: Constants.FILTER_TYPE_NL,
              },
            ]}
          >
            { viewMode == 0 && (
              <div>
                { renderFoldersView() }
              </div>
            ) }
            { viewMode == 1 && (
              <tbody>
                {
                  thuMucs.map((thuMuc, index) => (
                    <tr key={`thu-muc_${index}`}>
                      <td>{thuMuc.name}</td>
                      {/* <td>-</td> */}
                      <td>{thuMuc.files.length}</td>
                      {/* <td>{thuMuc.deadline}</td>
                      <td>{Utils.getThuMucStatusText(thuMuc.status)}</td> */}
                      <td>
                        <FileSubmitterButton onUploaded={onFileUploaded} folderId={thuMuc._id} renderAs={
                          <PublishIcon color="primary" className="icon-button" />
                        }/>
                        {/* <div>
                          <PublishIcon color="primary" className="icon-button"
                            onClick={onEditClick}/>
                        </div> */}
                      </td>
                      <td>
                        <ActionButtons
                          onDeleteClick={() => { onDeleteClick(thuMuc._id) }}
                          onEditClick={() => { onEditClick(thuMuc) }} />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            ) }
          </LyrTable>
        </Col>
      </Row>
      <CreateOrEditThuMucModal selected={selectedThuMuc} isModalOpen={isOpenModal}
        toggleModal={toggleModal} onClose={onModalClose} onUpdate={onUpdateThuMuc}/>
    </Container>
  )
};

export default ListThuMuc;
