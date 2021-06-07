import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import { getKyThucHiens, deleteKyThucHienById, updateKyThucHienById, createKyThucHien } from '../../api/kyThucHienAPI';
import * as Utils from '../../utils/utils';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import CreateOrEditKyThucHienModal from './CreateOrEditKTHModal';

const ListKyThucHien = () => {
  const [ kyThucHiens, setKyThucHiens ] = useState([]);
  const [ selectedKTH, setSelectedKTH ] = useState(Utils.getNewKyThucHien);
  const [ isOpenModal, setIsOpenModal ] = useState(false);

  let history = useHistory();

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (selectedKTH._id != null) {
      setIsOpenModal(true);
    }
  }, [selectedKTH]);

  const getList = () => {
    getKyThucHiens()
      .then((res) => {
        console.log(res);
        setKyThucHiens(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onDeleteClick = (id) => {
    deleteKyThucHienById(id)
      .then((res) => {
        console.log(res);
        getList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onEditClick = (kyThucHien) => {
    // history.push('/giang-vien/edit', { kyThucHienId: id });
    // history.push(`/giang-vien/edit/${id}`);
    setSelectedKTH(kyThucHien);
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
    setSelectedKTH(Utils.getNewKyThucHien);
  }

  const toggleBModal = () => {
    setIsOpenModal(!isOpenModal);
  }

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách các Kỳ thực hiện Khóa luận" subtitle="QUẢN LÝ KỲ THỰC HIỆN KHÓA LUẬN" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Button onClick={() => { setIsOpenModal(true) }}>Thêm Kỳ thực hiện Khóa luận</Button>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Tên
                    </th>
                    <th scope="col" className="border-0">
                      Trạng thái
                    </th>
                    <th scope="col" className="border-0">
                      Ngày bắt đầu
                    </th>
                    <th scope="col" className="border-0">
                      Ngày kết thúc
                    </th>
                    <th scope="col" className="border-0">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    kyThucHiens.map((kyThucHien, index) => (
                      <tr key={`ky-thuc-hien_${index}`}>
                        <td>{kyThucHien.name}</td>
                        <td>{Utils.getKyThucHienStatusText(kyThucHien.status)}</td>
                        <td>{kyThucHien.startDate}</td>
                        <td>{kyThucHien.endDate}</td>
                        <td>
                          <ActionButtons
                            onDeleteClick={() => { onDeleteClick(kyThucHien._id) }}
                            onEditClick={() => { onEditClick(kyThucHien) }} />
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
      <CreateOrEditKyThucHienModal isModalOpen={isOpenModal} toggleModal={toggleBModal} selected={selectedKTH} onClose={onClose} onUpdated={onUpdated}
          onCreated={onCreated}/>
      {/* <EditKyThucHienModal isOpen={isOpenModal}/> */}
    </Container>
  )
};

export default ListKyThucHien;
