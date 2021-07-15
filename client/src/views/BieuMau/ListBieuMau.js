import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import { getBieuMaus, deleteBieuMauById, updateBieuMauById, createBieuMau,
  getBieuMausWithQuery } from '../../api/bieuMauAPI';
import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import CreateOrEditBieuMauModal from './CreateOrEditBieuMauModal';
import LyrTable from '../../components/common/LyrTable/LyrTable';

import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal/ConfirmDeleteModal";

const ListBieuMau = () => {
  const [ bieuMaus, setBieuMaus ] = useState([]);
  const [ selectedBM, setSelectedBM ] = useState(Utils.getNewBieuMau);
  const [ isOpenModal, setIsOpenModal ] = useState(false);
  const [ resData, setResData ] = useState(Utils.getNewPageData());

  let history = useHistory();

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setBieuMaus(resData.docs);
  }, [resData]);

  useEffect(() => {
    if (selectedBM._id != null) {
      setIsOpenModal(true);
    }
  }, [selectedBM]);

  /* const getList = () => {
    getBieuMaus()
      .then((res) => {
        console.log(res);
        setBieuMaus(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } */

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
    getBieuMausWithQuery(search, pagingOptions, filters)
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => {
        setResData(Utils.getNewPageData());
        Utils.showErrorToast(Utils.getFormattedErrMsg(err));
        console.log(err);
      });
  }

  const onDeleteClick = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmDeleteModal onClose={onClose} onConfirm={() => {
            toast.promise(
              deleteBieuMauById(id),
              {
                loading: 'Đang xóa',
                success: (res) => {
                  getList();
                  onClose();
                  return 'Xóa thành công';
                },
                error: (err) => {
                  return Utils.getFormattedErrMsg(err);
                }
              },
              Utils.getToastConfig()
            );
          }} />
        );
      }
    });
    /* deleteBieuMauById(id)
      .then((res) => {
        console.log(res);
        getList();
      })
      .catch((err) => {
        console.log(err);
      }); */
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
          <LyrTable
            buttonSection={
              <Button onClick={() => { setIsOpenModal(true) }}>Thêm Biểu mẫu</Button>
            }
            data={resData}
            getList={getList}
            tableMode={true}
            headers={[
              {
                label: "Tên Biểu mẫu",
                type: Constants.FILTER_TYPE_EQ,
                field: 'name',
              },
              {
                label: "Link",
                type: Constants.FILTER_TYPE_EQ,
                field: 'link',
              },
              {
                label: "Thao tác",
                type: Constants.FILTER_TYPE_NL,
              },
            ]}
          >
            <tbody>
              {
                bieuMaus.map((bieuMau, index) => (
                  <tr key={`bieu-mau_${index}`}>
                    <td>{bieuMau.name}</td>
                    <td><a href={bieuMau.link} target="_blank">{bieuMau.link}</a></td>
                    <td>
                      <ActionButtons
                        onDeleteClick={() => { onDeleteClick(bieuMau._id) }}
                        onEditClick={() => { onEditClick(bieuMau) }} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </LyrTable>
        </Col>
      </Row>
      <CreateOrEditBieuMauModal isModalOpen={isOpenModal} toggleModal={toggleBModal} selected={selectedBM} onClose={onClose} onUpdated={onUpdated}
          onCreated={onCreated}/>
    </Container>
  )
};

export default ListBieuMau;
