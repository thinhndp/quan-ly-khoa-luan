import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import { getBieuMaus, deleteBieuMauById, updateBieuMauById, createBieuMau } from '../../api/bieuMauAPI';
import * as Utils from '../../utils/utils';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
// import EditBieuMauModal from './EditBieuMauModal';

const ListBieuMau = () => {
  const [ bieuMaus, setBieuMaus ] = useState([]);
  const [ isOpenEditModal, setIsOpenEditModal ] = useState(false);

  let history = useHistory();

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    getBieuMaus()
      .then((res) => {
        console.log(res);
        setBieuMaus(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onDeleteClick = (id) => {
    deleteBieuMauById(id)
      .then((res) => {
        console.log(res);
        getList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onEditClick = (id) => {
    // history.push('/giang-vien/edit', { bieuMauId: id });
    // history.push(`/giang-vien/edit/${id}`);
  }

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách Biểu mẫu" subtitle="QUẢN LÝ BIỂU MẪU" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Button onClick={() => {}}>Thêm Biểu mẫu</Button>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Tên Biểu mẫu
                    </th>
                    <th scope="col" className="border-0">
                      Link
                    </th>
                    <th scope="col" className="border-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    bieuMaus.map((bieuMau, index) => (
                      <tr key={`bieu-mau_${index}`}>
                        <td>{bieuMau.name}</td>
                        <td>{bieuMau.link}</td>
                        <td>
                          <ActionButtons
                            onDeleteClick={() => { onDeleteClick(bieuMau._id) }}
                            onEditClick={() => { onEditClick(bieuMau._id) }} />
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* <EditBieuMauModal isOpen={isOpenEditModal}/> */}
    </Container>
  )
};

export default ListBieuMau;
