import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import xlsxParser from 'xlsx-parse-json';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import { getGiangViens, deleteGiangVienById, upsertGiangViens, getGiangViensWithQuery } from '../../api/giangVienAPI';
import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import Pagination from '../../components/common/Pagination/Pagination';
import LyrTable from '../../components/common/LyrTable/LyrTable';
// import EditGiangVienModal from './EditGiangVienModal';

const ListGiangVien = () => {
  const [ giangViens, setGiangViens ] = useState([]);
  const [ isFileResetting, setIsFileResetting ] = useState(false);
  const [ isOpenEditModal, setIsOpenEditModal ] = useState(false);
  const [ resData, setResData ] = useState(Utils.getNewPageData());
  const inputFile = useRef(null);
  let history = useHistory();
  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setGiangViens(resData.docs);
  }, [resData]);

  useEffect(() => {
    if (isFileResetting) {
      setIsFileResetting(false);
    }
  }, [isFileResetting]);

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
    getGiangViensWithQuery(search, pagingOptions, filters)
      .then((res) => {
        console.log(res);
        // setGiangViens(res.data);
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
        var giangViens = parsedData.Sheet1;
        console.log(giangViens);
        upsertGiangViens(giangViens)
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
    deleteGiangVienById(id)
      .then((res) => {
        console.log(res);
        getList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onEditClick = (id) => {
    // history.push('/giang-vien/edit', { giangVienId: id });
    history.push(`/giang-vien/edit/${id}`);
  }
  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách Giảng Viên" subtitle="QUẢN LÝ GIẢNG VIÊN" className="text-sm-left" />
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
            tableMode={true}
            headers={[
              {
                label: "Mã Giảng viên",
                type: Constants.FILTER_TYPE_EQ,
                field: 'maGV',
              },
              {
                label: "Họ Tên",
                type: Constants.FILTER_TYPE_EQ,
                field: 'name',
              },
              {
                label: "Học hàm",
                type: Constants.FILTER_TYPE_SL,
                selectList: Utils.getHocHamSL(),
                field: 'hocHam',
              },
              {
                label: "Số điện thoại",
                type: Constants.FILTER_TYPE_EQ,
                field: 'phone',
              },
              {
                label: "Email",
                type: Constants.FILTER_TYPE_EQ,
                field: 'email',
              },
              {
                label: "Hướng nghiên cứu",
                type: Constants.FILTER_TYPE_EQ,
                field: 'huongNghienCuu',
              },
              {
                label: "Thao tác",
                type: Constants.FILTER_TYPE_NL,
              },
            ]}
          >
            <tbody>
              {
                giangViens.map((giangVien, index) => (
                  <tr key={`giang-vien_${index}`}>
                    <td>{giangVien.maGV}</td>
                    <td>{giangVien.name}</td>
                    <td>{giangVien.hocHam}</td>
                    <td>{giangVien.phone}</td>
                    <td>{giangVien.email}</td>
                    <td>{giangVien.huongNghienCuu}</td>
                    <td>
                      <ActionButtons
                        onDeleteClick={() => { onDeleteClick(giangVien._id) }}
                        onEditClick={() => { onEditClick(giangVien._id) }} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
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
            <CardBody className="p-0 pb-3 c-table_container">
              <table className="table mb-0 c-table">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Mã Giảng viên
                    </th>
                    <th scope="col" className="border-0">
                      Họ Tên
                    </th>
                    <th scope="col" className="border-0">
                      Học hàm
                    </th>
                    <th scope="col" className="border-0">
                      Số điện thoại
                    </th>
                    <th scope="col" className="border-0">
                      Email
                    </th>
                    <th scope="col" className="border-0">
                      Hướng nghiên cứu
                    </th>
                    <th scope="col" className="border-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    giangViens.map((giangVien, index) => (
                      <tr key={`giang-vien_${index}`}>
                        <td>{giangVien.maGV}</td>
                        <td>{giangVien.name}</td>
                        <td>{giangVien.hocHam}</td>
                        <td>{giangVien.phone}</td>
                        <td>{giangVien.email}</td>
                        <td>{giangVien.huongNghienCuu}</td>
                        <td>
                          <ActionButtons
                            onDeleteClick={() => { onDeleteClick(giangVien._id) }}
                            onEditClick={() => { onEditClick(giangVien._id) }} />
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <Pagination pageData={resData} getData={getList}/>
            </CardBody>
          </Card> */}
        </Col>
      </Row>
      {/* <EditGiangVienModal isOpen={isOpenEditModal}/> */}
    </Container>
  )
};

export default ListGiangVien;
