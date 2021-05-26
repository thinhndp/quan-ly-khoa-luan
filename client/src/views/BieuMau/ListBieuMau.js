import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import { getBieuMaus, deleteBieuMauById, updateBieuMauById, createBieuMau } from '../../api/bieuMauAPI';
import * as Utils from '../../utils/utils';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import CreateOrEditBieuMauModal from './CreateOrEditBieuMauModal';

const ListBieuMau = () => {
  const [ bieuMaus, setBieuMaus ] = useState([]);
  const [ selectedBM, setSelectedBM ] = useState(Utils.getNewBieuMau);
  const [ isOpenModal, setIsOpenModal ] = useState(false);

  let history = useHistory();

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (selectedBM._id != null) {
      setIsOpenModal(true);
    }
  }, [selectedBM]);

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

  const onEditClick = (bieuMau) => {
    // history.push('/giang-vien/edit', { bieuMauId: id });
    // history.push(`/giang-vien/edit/${id}`);
    setSelectedBM(bieuMau);
  }

  const onUpdated = () => {
    setIsOpenModal(false);
    getList();
  }

  const onCreated = () => {
    setIsOpenModal(false);
    getList();
  }

  const onClose = () => {
    setSelectedBM(Utils.getNewBieuMau);
  }

  const toggleBModal = () => {
    setIsOpenModal(!isOpenModal);
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
              <Button onClick={() => { setIsOpenModal(true) }}>Thêm Biểu mẫu</Button>
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
                            onEditClick={() => { onEditClick(bieuMau) }} />
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
      <CreateOrEditBieuMauModal isModalOpen={isOpenModal} toggleModal={toggleBModal} selected={selectedBM} onClose={onClose} onUpdated={onUpdated}
          onCreated={onCreated}/>
      {/* <EditBieuMauModal isOpen={isOpenModal}/> */}
    </Container>
  )
};

export default ListBieuMau;
