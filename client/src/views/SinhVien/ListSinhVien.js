import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import xlsxParser from 'xlsx-parse-json';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import { deleteSinhVienById, upsertSinhViens, getSinhViensWithQuery } from '../../api/sinhVienAPI';
import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import LyrTable from '../../components/common/LyrTable/LyrTable';

import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal/ConfirmDeleteModal";

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

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
    getSinhViensWithQuery(search, pagingOptions, filters)
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => {
        setResData(Utils.getNewPageData());
        Utils.showErrorToast(err.response.data.message);
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
        if (!sinhViens || sinhViens.length == 0) {
          Utils.showErrorToast('Đã có lỗi xảy ra');
          return;
        }
        if (!Utils.isObjHasAllKeys(sinhViens[0], [ 'maSV', 'name', 'lopSH', 'image', 'phone', 'email' ])) {
          Utils.showErrorToast('Dữ liệu hoặc file Không hợp lệ');
          return;
        }
        toast.promise(
          upsertSinhViens(sinhViens),
          {
            loading: 'Đang cập nhật thông tin Sinh viên',
            success: (res) => {
              setIsFileResetting(true);
              getList();
              return 'Cập nhật thành công';
            },
            error: (err) => {
              return err.response.data.message;
            }
          },
          Utils.getToastConfig()
        );
        /* upsertSinhViens(sinhViens)
          .then((res) => {
            console.log(res);
            setIsFileResetting(true);
            getList();
          })
          .catch((err) => {
            console.log(err);
          }) */
      });
  }

  const onDeleteClick = (id) => {
    /* deleteSinhVienById(id)
      .then((res) => {
        console.log(res);
        getList();
      })
      .catch((err) => {
        console.log(err);
      }); */
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmDeleteModal onClose={onClose} onConfirm={() => {
            toast.promise(
              deleteSinhVienById(id),
              {
                loading: 'Đang xóa',
                success: (res) => {
                  getList();
                  onClose();
                  return 'Xóa thành công';
                },
                error: (err) => {
                  console.log(err.response);
                  return err.response.data.message;
                }
              },
              Utils.getToastConfig()
            );
          }} />
        );
      }
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
            tableMode={true}
            headers={[
              {
                label: "MSSV",
                type: Constants.FILTER_TYPE_EQ,
                field: 'maSV',
              },
              {
                label: "Họ Tên",
                type: Constants.FILTER_TYPE_EQ,
                field: 'name',
              },
              {
                label: "Lớp Sinh hoạt",
                type: Constants.FILTER_TYPE_EQ,
                field: 'lopSH',
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
                label: "Trạng thái thực hiện Khóa luận",
                type: Constants.FILTER_TYPE_SL,
                selectList: Utils.getSinhVienStatusSL(),
                field: 'status',
              },
              {
                label: "Điểm TBCTL",
                type: Constants.FILTER_TYPE_FTN,
                field: 'diemTB',
              },
              {
                label: "Thao tác",
                type: Constants.FILTER_TYPE_NL,
              },
            ]}
          >
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
