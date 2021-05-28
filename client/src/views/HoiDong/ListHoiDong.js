import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import { getHoiDongs, createHoiDong } from '../../api/hoiDongAPI';
import * as Utils from '../../utils/utils';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import CreateOrEditPhongHocModal from './CreateOrEditPhongHocModal';

const ListHoiDong = () => {
  const [ hoiDongs, setHoiDongs ] = useState([]);
  const [ selectedPH, setSelectedPH ] = useState(Utils.getNewPhongHoc);
  const [ isOpenPHModal, setIsOpenPHModal ] = useState(false);

  let history = useHistory();

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (selectedPH._id != null) {
      setIsOpenPHModal(true);
    }
  }, [selectedPH]);

  const getList = () => {
    getHoiDongs()
      .then((res) => {
        console.log(res);
        setHoiDongs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onDeleteClick = (id) => {
    // deleteHoiDongById(id)
    //   .then((res) => {
    //     console.log(res);
    //     getList();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  const onEditClick = (bieuMau) => {
    setSelectedPH(bieuMau);
  }

  const onEditPHClick = (phongHoc) => {
    setSelectedPH(phongHoc);
  }

  const onUpdated = () => {
    setIsOpenPHModal(false);
    getList();
  }

  const onPHUpdated = () => {
    setIsOpenPHModal(false);
    getList();
  }

  const onCreated = () => {
    setIsOpenPHModal(false);
    getList();
  }

  const onPHCreated = () => {
    setIsOpenPHModal(false);
    // getList();
  }

  const onClose = () => {
    setSelectedPH(Utils.getNewPhongHoc);
  }

  const onPHClose = () => {
    setSelectedPH(Utils.getNewPhongHoc);
  }

  const togglePHModal = () => {
    setIsOpenPHModal(!isOpenPHModal);
  }

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách Hội đồng chấm" subtitle="QUẢN LÝ HỘI ĐỒNG CHẤM" className="text-sm-left" />
      </Row>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Button onClick={() => {  }}>Thêm Biểu mẫu</Button>
              <span class="pr-05r"/>
              <Button onClick={() => { setIsOpenPHModal(true) }}>Thêm Phòng học</Button>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Tên Biểu mẫu
                    </th>
                    {/* <th scope="col" className="border-0">
                      Link
                    </th>
                    <th scope="col" className="border-0">
                      Action
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {
                    hoiDongs.map((hoiDong, index) => (
                      <tr key={`hoi-dong_${index}`}>
                        <td>{hoiDong.name}</td>
                        {/* <td>{bieuMau.link}</td>
                        <td>
                          <ActionButtons
                            onDeleteClick={() => { onDeleteClick(bieuMau._id) }}
                            onEditClick={() => { onEditClick(bieuMau) }} />
                        </td> */}
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <CreateOrEditPhongHocModal isModalOpen={isOpenPHModal} toggleModal={togglePHModal} selected={selectedPH} onClose={onPHClose} onUpdated={onPHUpdated}
          onCreated={onPHCreated}/>
      {/* <EditHoiDongModal isOpen={isOpenPHModal}/> */}
    </Container>
  )
};

export default ListHoiDong;
