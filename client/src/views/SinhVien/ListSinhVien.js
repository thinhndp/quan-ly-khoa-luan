import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import xlsxParser from 'xlsx-parse-json';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import { getSinhViens, deleteSinhVienById, upsertSinhViens, getSinhViensWithQuery } from '../../api/sinhVienAPI';
import * as Utils from '../../utils/utils';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import LyrTable from '../../components/common/LyrTable/LyrTable';

const ListSinhVien = () => {
  const [ sinhViens, setSinhViens ] = useState([]);
  const [ isFileResetting, setIsFileResetting ] = useState(false);
  const [ isOpenEditModal, setIsOpenEditModal ] = useState(false);
  const [ resData, setResData ] = useState(Utils.getNewPageData());

  const inputFile = useRef(null);
  let history = useHistory();

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setSinhViens(resData.docs);
  }, [resData]);

  useEffect(() => {
    if (isFileResetting) {
      setIsFileResetting(false);
    }
  }, [isFileResetting]);

/*   const getList = () => {
    getSinhViens()
      .then((res) => {
        console.log(res);
        setSinhViens(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } */

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions()) => {
    getSinhViensWithQuery(search, pagingOptions)
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onImportButtonClick = () => {
    inputFile.current.click();
  }

  const handleImportList = event => {
    const { files } = event.target;
    console.log(files);
    xlsxParser
      .onFileSelection(files[0])
      .then(data => {
        var parsedData = data;
        var sinhViens = parsedData.Sheet1;
        console.log(sinhViens);
        upsertSinhViens(sinhViens)
          .then((res) => {
            console.log(res);
            setIsFileResetting(true);
            getList();
          })
          .catch((err) => {
            console.log(err);
          })
      });
  }

  const onDeleteClick = (id) => {
    deleteSinhVienById(id)
      .then((res) => {
        console.log(res);
        getList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onEditClick = (id) => {
    // history.push('/sinh-vien/edit', { sinhVienId: id });
    history.push(`/sinh-vien/edit/${id}`);
  }
  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách Sinh Viên" subtitle="QUẢN LÝ SINH VIÊN" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <LyrTable
            buttonSection={
              !isFileResetting &&
              <div>
                <Button onClick={onImportButtonClick}>Nhập danh sách</Button>
                <input type="file" id="file" ref={inputFile}
                  style={{ display: 'none' }} onChange={(e) => handleImportList(e)} on />
              </div>
            }
            data={resData}
            getList={getList}
          >
            <table className="table mb-0 c-table">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    MSSV
                  </th>
                  <th scope="col" className="border-0">
                    Họ Tên
                  </th>
                  <th scope="col" className="border-0">
                    Lớp Sinh hoạt
                  </th>
                  <th scope="col" className="border-0">
                    Số điện thoại
                  </th>
                  <th scope="col" className="border-0">
                    Email
                  </th>
                  <th scope="col" className="border-0">
                    Trạng thái thực hiện Khóa luận
                  </th>
                  <th scope="col" className="border-0">
                    Điểm TBCTL
                  </th>
                  <th scope="col" className="border-0">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  sinhViens.map((sinhVien, index) => (
                    <tr key={`sinh-vien_${index}`}>
                      <td>{sinhVien.maSV}</td>
                      {/* <td>-</td> */}
                      <td>{sinhVien.name}</td>
                      <td>{sinhVien.lopSH}</td>
                      <td>{sinhVien.phone}</td>
                      <td>{sinhVien.email}</td>
                      <td>{Utils.getSinhVienStatusText(sinhVien.status)}</td>
                      <td>{sinhVien.diemTB}</td>
                      <td>
                        <ActionButtons
                          onDeleteClick={() => { onDeleteClick(sinhVien._id) }}
                          onEditClick={() => { onEditClick(sinhVien._id) }} />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </LyrTable>
          {/* <Card small className="mb-4">
            <CardHeader className="border-bottom">
              {
                !isFileResetting &&
                <div>
                  <Button onClick={onImportButtonClick}>Nhập danh sách</Button>
                  <input type="file" id="file" ref={inputFile}
                    style={{ display: 'none' }} onChange={(e) => handleImportList(e)} on />
                </div>
              }
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      MSSV
                    </th>
                    <th scope="col" className="border-0">
                      Họ Tên
                    </th>
                    <th scope="col" className="border-0">
                      Lớp Sinh hoạt
                    </th>
                    <th scope="col" className="border-0">
                      Số điện thoại
                    </th>
                    <th scope="col" className="border-0">
                      Email
                    </th>
                    <th scope="col" className="border-0">
                      Trạng thái thực hiện Khóa luận
                    </th>
                    <th scope="col" className="border-0">
                      Điểm TBCTL
                    </th>
                    <th scope="col" className="border-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    sinhViens.map((sinhVien, index) => (
                      <tr key={`sinh-vien_${index}`}>
                        <td>{sinhVien.maSV}</td>
                        <td>{sinhVien.name}</td>
                        <td>{sinhVien.lopSH}</td>
                        <td>{sinhVien.phone}</td>
                        <td>{sinhVien.email}</td>
                        <td>{Utils.getSinhVienStatusText(sinhVien.status)}</td>
                        <td>{sinhVien.diemTB}</td>
                        <td>
                          <ActionButtons
                            onDeleteClick={() => { onDeleteClick(sinhVien._id) }}
                            onEditClick={() => { onEditClick(sinhVien._id) }} />
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
    </Container>
  )
};

export default ListSinhVien;
