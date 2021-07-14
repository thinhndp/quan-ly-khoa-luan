import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup } from "shards-react";
import LinkIcon from '@material-ui/icons/Link';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import FolderIcon from '@material-ui/icons/Folder';

import { getFilesByThuMucId, getFilesOfFolderWithQuery } from '../../api/fileNopAPI';
import * as Utils from '../../utils/utils';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import CreateOrEditThuMucModal from './CreateOrEditThuMucModal';
import FileSubmitterButton from '../../components/FileSubmitter/FileSubmitterButton';
import LyrTable from '../../components/common/LyrTable/LyrTable';

import './styles.css';

const ListFile = () => {
  const [ fileNops, setFileNops ] = useState([]);
  const [ isOpenModal, setIsOpenModal ] = useState(false);
  const [ selectedFileNop, setSelectedThuMuc ] = useState({});
  let { folderId } = useParams();
  let history = useHistory();
  let thuMuc = history.location.state;
  const [ resData, setResData ] = useState(Utils.getNewPageData());

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setFileNops(resData.docs);
  }, [resData]);

  /* const getList = () => {
    getFilesByThuMucId(folderId)
      .then((res) => {
        console.log(res);
        setFileNops(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  } */

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions()) => {
    getFilesOfFolderWithQuery(folderId, search, pagingOptions)
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

  const onLinkClick = (driveId) => {
    console.log(driveId);
    const fileLink = `https://drive.google.com/file/d/${driveId}`;
    window.open(fileLink, "_blank");
  }

  const onFileUploaded = () => {
    getList();
  }

  const onBack = () => {
    window.history.back();
  }

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách File" subtitle="QUẢN LÝ FILE NỘP" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <LyrTable
            buttonSection={
              <div className="flex-row">
                <div className="mr-05r">
                  <FileSubmitterButton onUploaded={onFileUploaded} folderId={thuMuc._id}
                    folderDriveId={thuMuc.driveId} />
                </div>
                <Button onClick={onBack}>Trở về</Button>
              </div>
            }
            data={resData}
            getList={getList}
          >
            <table className="table mb-0 c-table">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    Tên file
                  </th>
                  <th scope="col" className="border-0">
                    Người nộp
                  </th>
                  <th scope="col" className="border-0">
                    Ngày nộp
                  </th>
                  <th scope="col" className="border-0">
                    Xem
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  fileNops.map((fileNop, index) => (
                    <tr key={`thu-muc_${index}`}>
                      <td><span><img className="small-logo" src={Utils.getFileLogo(fileNop.name)}/></span>{fileNop.name}</td>
                      {/* <td>-</td> */}
                      <td>{fileNop.user.name}</td>
                      <td>{Utils.getLocaleDateTimeString(fileNop.ngayNop)}</td>
                      <td>
                        <LinkIcon color="primary" className="icon-button"
                          onClick={() => { onLinkClick(fileNop.driveId) }}/>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </LyrTable>
          {/* <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <div className="flex-row">
                <div className="mr-05r">
                  <FileSubmitterButton onUploaded={onFileUploaded} folderId={thuMuc._id}
                    folderDriveId={thuMuc.driveId} />
                </div>
                <Button onClick={onBack}>Trở về</Button>
              </div>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Tên file
                    </th>
                    <th scope="col" className="border-0">
                      Người nộp
                    </th>
                    <th scope="col" className="border-0">
                      Ngày nộp
                    </th>
                    <th scope="col" className="border-0">
                      Xem
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    fileNops.map((fileNop, index) => (
                      <tr key={`thu-muc_${index}`}>
                        <td><span><img className="small-logo" src={Utils.getFileLogo(fileNop.name)}/></span>{fileNop.name}</td>
                        <td>{fileNop.user.name}</td>
                        <td>{fileNop.ngayNop}</td>
                        <td>
                          <LinkIcon color="primary" className="icon-button"
                            onClick={() => { onLinkClick(fileNop.driveId) }}/>
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
      <CreateOrEditThuMucModal selected={selectedFileNop} isModalOpen={isOpenModal}
        toggleModal={toggleModal} onClose={onModalClose} onUpdate={onUpdateThuMuc}/>
    </Container>
  )
};

export default ListFile;
