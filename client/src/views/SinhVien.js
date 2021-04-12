import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import xlsxParser from 'xlsx-parse-json';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";

const SinhVien = () => {
  const [sinhViens, setSinhViens] = useState([]);
  const inputFile = useRef(null);
  useEffect(() => {
    axios.get('http://localhost:5000/sinhViens')
      .then((res) => {
        console.log(res);
        setSinhViens(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    // console.log('init');
  }, []);
  useEffect(() => {
    console.log("asdasd");
  }, [inputFile]);
  const onImportButtonClick = () => {
    inputFile.current.click();
  }
  const handleImportList = e => {
    const { files } = e.target;
    console.log(files);
    xlsxParser
      .onFileSelection(files[0])
      .then(data => {
        var parsedData = data;
        var sinhViens = parsedData.Sheet1;
        console.log(sinhViens);
        axios.post('http://localhost:5000/sinhViens/create-many', sinhViens)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
      });
  }
  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách Sinh Viên" subtitle="QUẢN LÝ SINH VIÊN" className="text-sm-left" />
      </Row>

      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              {/* <h6 className="m-0">Active Users</h6> */}
              <Button onClick={onImportButtonClick}>Nhập danh sách</Button>
              <input type="file" id="file" ref={inputFile}
                  style={{ display: 'none' }}  onChange={handleImportList} />
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      MSSV
                    </th>
                    <th scope="col" className="border-0">
                      Ảnh
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    sinhViens.map((sinhVien, index) => (
                      <tr key={`sinh-vien_${index}`}>
                        <td>{sinhVien.maSV}</td>
                        <td>-</td>
                        <td>{sinhVien.name}</td>
                        <td>{sinhVien.lopSH}</td>
                        <td>{sinhVien.phone}</td>
                        <td>{sinhVien.email}</td>
                        <td>...</td>
                      </tr>
                    ))
                  }
                  {/* <tr>
                    <td>16520000</td>
                    <td>-</td>
                    <td>Nguyễn Văn A</td>
                    <td>KTPM2016</td>
                    <td>09000000000</td>
                    <td>16520000@gm.uit.edu.vn</td>
                    <td>...</td>
                  </tr> */}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default SinhVien;
