import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";

const GiangVien = () => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Danh sách Sinh Viên" subtitle="QUẢN LÝ SINH VIÊN" className="text-sm-left" />
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          {/* <CardHeader className="border-bottom">
            <h6 className="m-0">Active Users</h6>
          </CardHeader> */}
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
                <tr>
                  <td>16520000</td>
                  <td>-</td>
                  <td>Nguyễn Văn A</td>
                  <td>KTPM2016</td>
                  <td>09000000000</td>
                  <td>16520000@gm.uit.edu.vn</td>
                  <td>...</td>
                </tr>
                <tr>
                  <td>16520000</td>
                  <td>-</td>
                  <td>Nguyễn Văn A</td>
                  <td>KTPM2016</td>
                  <td>09000000000</td>
                  <td>16520000@gm.uit.edu.vn</td>
                  <td>...</td>
                </tr>
                <tr>
                  <td>16520000</td>
                  <td>-</td>
                  <td>Nguyễn Văn A</td>
                  <td>KTPM2016</td>
                  <td>09000000000</td>
                  <td>16520000@gm.uit.edu.vn</td>
                  <td>...</td>
                </tr>
                <tr>
                  <td>16520000</td>
                  <td>-</td>
                  <td>Nguyễn Văn A</td>
                  <td>KTPM2016</td>
                  <td>09000000000</td>
                  <td>16520000@gm.uit.edu.vn</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default GiangVien;
