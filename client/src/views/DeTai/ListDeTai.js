import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormInput} from "shards-react";
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LaunchIcon from '@material-ui/icons/Launch';

import commonStyles from '../../styles/CommonStyles.module.scss';
import styles from './styles.module.scss';
import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import { getDeTais, getDeTaisWithQuery, deleteDeTaiById } from '../../api/deTaiAPI';
import { getSystemSettings, updateSystemSetting } from '../../api/systemSettingAPI';
import CustomModal from '../../components/common/CustomModal/CustomModal';
import { FormGroup } from "@material-ui/core";
import * as Constants from '../../constants/constants';
import * as Utils from '../../utils/utils';
import GiangVienModal from './DetailGiangVienModal';
import DeXuatButton from '../../components/post/DeXuatButton';
import DangKyDTButton from '../../components/post/DangKyDTButton';
import LyrTable from '../../components/common/LyrTable/LyrTable';

const ListDeTai = () => {
  const [ deTais, setDeTais ] = useState([]);
  const [ isOpenActions, setIsOpenActions ] = useState(false);
  const [ isDKModalOpen, setIsDKModalOpen ] = useState(false);
  const [ isGVModalOpen, setIsGVModalOpen ] = useState(false);
  const [ deXuatToiDa, setDeXuatToiDa ] = useState(0);
  const [ selectedGV, setSelectedGV ] = useState(null);
  const [ resData, setResData ] = useState(Utils.getNewPageData());
  let history = useHistory();

  useEffect(() => {
    getDeTaiList();
    getDeXuatToiDa();
  }, []);

  useEffect(() => {
    setDeTais(resData.docs);
  }, [resData]);

  useEffect(() => {
    // toggleGVModal();
    if (selectedGV != null) {
      setIsGVModalOpen(true);
    }
    else {
      setIsGVModalOpen(false);
    }
  }, [selectedGV]);

  /* const getDeTaiList = () => {
    getDeTaisWithQuery()
      .then((res) => {
        console.log(res);
        setDeTais(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  } */

  const getDeTaiList = (search = '', pagingOptions = Utils.getNewPagingOptions()) => {
    getDeTaisWithQuery(search, pagingOptions)
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  const getDeXuatToiDa = () => {
    getSystemSettings()
      .then((res) => {
        console.log(res);
        if (res.data != null && res.data[0] != null && res.data[0].deXuatToiDa != null) {
          setDeXuatToiDa(res.data[0].deXuatToiDa);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const toggleActions = () => {
    setIsOpenActions(!isOpenActions);
  }

  const toggleDKModal = () => {
    setIsDKModalOpen(!isDKModalOpen);
  }

  const toggleGVModal = () => {
    setIsGVModalOpen(!isGVModalOpen);
  }

  const onEditClick = (id) => {
    history.push(`/de-tai/${id}`);
  }
  const onDeleteClick = (id) => {
    // console.log(id);
    deleteDeTaiById(id)
      .then((res) => {
        console.log(res);
        getDeTaiList();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const onDeXuatToiDaUpdate = () => {
    console.log(deXuatToiDa);
    updateSystemSetting({ deXuatToiDa: deXuatToiDa, instance: Constants.SYSTEM_SETTING_INSTANCE })
      .then((res) => {
        console.log(res);
        getDeXuatToiDa();
        toggleDKModal();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const onGVClick = (id) => {
    setSelectedGV(id);
  }

  const onGVModalClose = () => {
    setSelectedGV(null);
  }

  const onUpdateGV = () => {
    setSelectedGV(null);
    getDeTaiList();
  }

  const onCompleted = () => {
    getDeTaiList();
  }

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách Đề tài" subtitle="QUẢN LÝ ĐỀ TÀI" className="text-sm-left" />
      </Row>

      {/* Table */}
      <Row>
        <Col>
          <LyrTable
            buttonSection={
              <Row>
                <span class="pr-05r"/>
                <Button onClick={toggleDKModal}>Tùy chỉnh điều kiện</Button>
                <span class="pr-05r"/>
                <DeXuatButton onCompleted={onCompleted}/>
                <span class="pr-05r"/>
              </Row>
            }
            data={resData}
            getList={getDeTaiList}
          >
            <table className="table mb-0 c-table">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    Tên Đề tài
                  </th>
                  <th scope="col" className="border-0">
                    Giảng viên Hướng dẫn
                  </th>
                  <th scope="col" className="border-0">
                    Mô tả
                  </th>
                  <th scope="col" className="border-0">
                    Kỳ thực hiện
                  </th>
                  <th scope="col" className="border-0">
                    Trạng thái duyệt
                  </th>
                  <th scope="col" className="border-0">
                    Trạng thái thực hiện
                  </th>
                  <th scope="col" className="border-0">
                    Hệ đào tạo
                  </th>
                  <th scope="col" className="border-0">
                    Điểm số
                  </th>
                  <th scope="col" className="border-0">
                    Số SV Thực hiện
                  </th>
                  <th scope="col" className="border-0">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {
                deTais.map((deTai, index) => (
                  <tr key={`de-tai_${index}`}>
                    <td>{deTai.tenDeTai}</td>
                    <td>{deTai.giangVien.name}<span className={styles['small-icon-span']}>
                      <LaunchIcon className={commonStyles['icon-button']} color="primary"
                        style={{ fontSize: '1rem' }} onClick={() => { onGVClick(deTai.giangVien) }}/>
                      </span>
                    </td>
                    <td>{deTai.moTa}</td>
                    <td>{(deTai.kyThucHien != null) ? deTai.kyThucHien.name : ''}</td>
                    <td>{Utils.getDeTaiApproveStatusText(deTai.trangThaiDuyet)}</td>
                    <td>{Utils.getDeTaiProgressStatusText(deTai.trangThaiThucHien)}</td>
                    <td>{deTai.heDaoTao}</td>
                    <td>{deTai.diemSo}</td>
                    <td>{Utils.getSinhVienNumOfDeTai(deTai)}</td>
                    <td>
                      <ActionButtons onEditClick={() => onEditClick(deTai._id)}
                          onDeleteClick={() => onDeleteClick(deTai._id)} />
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </LyrTable>
          {/* <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Row>
                <span class="pr-05r"/>
                <Button onClick={toggleDKModal}>Tùy chỉnh điều kiện</Button>
                <span class="pr-05r"/>
                <DeXuatButton onCompleted={onCompleted}/>
                <span class="pr-05r"/>
              </Row>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Tên Đề tài
                    </th>
                    <th scope="col" className="border-0">
                      Giảng viên Hướng dẫn
                    </th>
                    <th scope="col" className="border-0">
                      Mô tả
                    </th>
                    <th scope="col" className="border-0">
                      Kỳ thực hiện
                    </th>
                    <th scope="col" className="border-0">
                      Trạng thái duyệt
                    </th>
                    <th scope="col" className="border-0">
                      Trạng thái thực hiện
                    </th>
                    <th scope="col" className="border-0">
                      Hệ đào tạo
                    </th>
                    <th scope="col" className="border-0">
                      Điểm số
                    </th>
                    <th scope="col" className="border-0">
                      Số SV Thực hiện
                    </th>
                    <th scope="col" className="border-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
                  deTais.map((deTai, index) => (
                    <tr key={`de-tai_${index}`}>
                      <td>{deTai.tenDeTai}</td>
                      <td>{deTai.giangVien.name}<span className={styles['small-icon-span']}>
                        <LaunchIcon className={commonStyles['icon-button']} color="primary"
                          style={{ fontSize: '1rem' }} onClick={() => { onGVClick(deTai.giangVien) }}/>
                        </span>
                      </td>
                      <td>{deTai.moTa}</td>
                      <td>{(deTai.kyThucHien != null) ? deTai.kyThucHien.name : ''}</td>
                      <td>{Utils.getDeTaiApproveStatusText(deTai.trangThaiDuyet)}</td>
                      <td>{Utils.getDeTaiProgressStatusText(deTai.trangThaiThucHien)}</td>
                      <td>{deTai.heDaoTao}</td>
                      <td>{deTai.diemSo}</td>
                      <td>{Utils.getSinhVienNumOfDeTai(deTai)}</td>
                      <td>
                        <ActionButtons onEditClick={() => onEditClick(deTai._id)}
                            onDeleteClick={() => onDeleteClick(deTai._id)} />
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
      {/* Dieu kien de xuat Modal */}
      <CustomModal isOpen={isDKModalOpen} toggle={toggleDKModal}
        title='Tùy chỉnh điều kiện'
        body={
          <div>
            <FormGroup>
              <label htmlFor="deXuatToiDa">Số đề tài đề xuất tối đa</label>
              <FormInput id="deXuatToiDa" placeholder="Số lượng đề tài tối đa được đăng ký"
                onChange={(e) => { setDeXuatToiDa(e.target.value) }} value={deXuatToiDa} />
            </FormGroup>
          </div>
        }
        footer={
          <div>
            <Button onClick={onDeXuatToiDaUpdate}>Cập nhật</Button>
          </div>
        }
      />
      {/* Giang Vien Dtail Modal */}
      <GiangVienModal selectedGV={selectedGV} isGVModalOpen={isGVModalOpen}
        toggleGVModal={toggleGVModal} onClose={onGVModalClose} onUpdateGV={onUpdateGV}/>
    </Container>
  );
}

export default ListDeTai;
