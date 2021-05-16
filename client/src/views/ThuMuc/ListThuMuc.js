import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup } from "shards-react";

import { getThuMucs } from '../../api/thuMucAPI';
import * as Utils from '../../utils/utils';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import FolderIcon from '@material-ui/icons/Folder';
import CreateOrEditThuMucModal from './CreateOrEditThuMucModal';
import './styles.css';

const ListThuMuc = () => {
  const [ thuMucs, setThuMucs ] = useState([]);
  const [ viewMode, setViewMode ] = useState(0);
  // const [ isFileResetting, setIsFileResetting ] = useState(false);
  const [ isOpenModal, setIsOpenModal ] = useState(false);
  const [ selectedThuMuc, setSelectedThuMuc ] = useState({});

  let history = useHistory();
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    getThuMucs()
      .then((res) => {
        console.log(res);
        setThuMucs(res.data);
      })
      .catch((err) => {
        console.log(err);
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
  }

  const renderFoldersView = () => {
    return (
      <div className="folders-view">
        {
          thuMucs.map((thuMuc) => (
            <div className="folder">
              <FolderIcon fontSize="large" />
              <div className="folder-info">
                <div className="info-container truncate">
                  <div className="submitted">
                    {/* <div>ĐÃ NỘP</div> */}
                    <div>
                      {thuMuc.files.slice(0, 4).map((file) => (
                        <img src={file.userObj.picture}/>
                      ))}
                    </div>
                  </div>
                  <div className="flex-filler"/>
                  <div className="folder-name">
                    {/* <div>FOLDER</div> */}
                    <div className="main-text truncate">{thuMuc.name}</div>
                    <div className="sub-text">{Utils.getThuMucStatusText(thuMuc.status)}</div>
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
        <PageTitle sm="4" title="Danh sách Thư Mục" subtitle="QUẢN LÝ THƯ MỤC" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              {/* {
                !isFileResetting &&
                <div>
                  <Button onClick={onImportButtonClick}>Nhập danh sách</Button>
                  <input type="file" id="file" ref={inputFile}
                    style={{ display: 'none' }} onChange={(e) => handleImportList(e)} on />
                </div>
              } */}
              <ButtonGroup className="mr-2">
                <Button onClick={() => { switchView(1) }}>
                  <ViewListIcon />
                </Button>
                <Button onClick={() => { switchView(0) }}>
                  <ViewModuleIcon />
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
          </Card>
        </Col>
      </Row>
      <CreateOrEditThuMucModal selected={selectedThuMuc} isModalOpen={isOpenModal}
        toggleModal={toggleModal} onClose={onModalClose} onUpdate={onUpdateThuMuc}/>
    </Container>
  )
};

export default ListThuMuc;
