import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import { getUsers, deleteUserById, updateUserById, createUser,
  getUsersWithQuery } from '../../api/userAPI';
import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import CreateOrEditUserModal from './CreateOrEditUserModal';
import LyrTable from '../../components/common/LyrTable/LyrTable';

import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal/ConfirmDeleteModal";

const ListUser = () => {
  const [ users, setUsers ] = useState([]);
  const [ selectedUser, setSelectedUser ] = useState(Utils.getNewUser);
  const [ isOpenModal, setIsOpenModal ] = useState(false);
  const [ resData, setResData ] = useState(Utils.getNewPageData());

  let history = useHistory();

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setUsers(resData.docs);
  }, [resData]);

  useEffect(() => {
    if (selectedUser._id != null) {
      setIsOpenModal(true);
    }
  }, [selectedUser]);

  /* const getList = () => {
    getUsers()
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } */

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
    getUsersWithQuery(search, pagingOptions, filters)
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => {
        setResData(Utils.getNewPageData());
        Utils.showErrorToast(err.response.data.message);
        console.log(err.response);
      });
  }

  const onDeleteClick = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmDeleteModal onClose={onClose} onConfirm={() => {
            toast.promise(
              deleteUserById(id),
              {
                loading: 'Đang xóa',
                success: (res) => {
                  getList();
                  onClose();
                  return 'Xóa thành công';
                },
                error: (err) => {
                  return err.response.data.message;
                }
              },
              Utils.getToastConfig()
            );
          }} />
        );
      }
    });
    /* deleteUserById(id)
      .then((res) => {
        console.log(res);
        getList();
      })
      .catch((err) => {
        console.log(err.response);
      }); */
  }

  const onEditClick = (user) => {
    // history.push('/giang-vien/edit', { userId: id });
    // history.push(`/giang-vien/edit/${id}`);
    setSelectedUser(user);
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
    setSelectedUser(Utils.getNewUser);
  }

  const toggleUserModal = () => {
    setIsOpenModal(!isOpenModal);
  }

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách User" subtitle="QUẢN LÝ USER" className="text-sm-left" />
      </Row>
      <Row>
        <Col>
          <LyrTable
            buttonSection={
              <Button onClick={() => { setIsOpenModal(true) }}>Tạo User</Button>
            }
            data={resData}
            getList={getList}
            tableMode={true}
            headers={[
              {
                label: "Tên",
                type: Constants.FILTER_TYPE_EQ,
                field: 'name',
              },
              {
                label: "Ảnh",
                type: Constants.FILTER_TYPE_NL,
              },
              {
                label: "Vai trò",
                type: Constants.FILTER_TYPE_SL,
                selectList: Utils.getUserRoleSL(),
                field: 'role',
              },
              {
                label: "Quyền duyệt Đề xuất",
                type: Constants.FILTER_TYPE_SL,
                selectList: Utils.getTrueFalseSL(),
                field: 'canApprove',
              },
              {
                label: "Email",
                type: Constants.FILTER_TYPE_EQ,
                field: 'email',
              },
              {
                label: "Thao tác",
                type: Constants.FILTER_TYPE_NL,
              },
            ]}
          >
            <tbody>
              {
                users.map((user, index) => (
                  <tr key={`user_${index}`}>
                    <td>{user.name}</td>
                    <td><img className="avatar-pic" src={user.picture} alt="User Picture"/></td>
                    <td>{Utils.getUserRoleText(user.role)}</td>
                    <td>{user.canApprove ? 'Có' : 'Không'}</td>
                    <td>{user.email}</td>
                    <td>
                      <ActionButtons
                        onDeleteClick={() => { onDeleteClick(user._id) }}
                        onEditClick={() => { onEditClick(user) }} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </LyrTable>
        </Col>
      </Row>
      <CreateOrEditUserModal isModalOpen={isOpenModal} toggleModal={toggleUserModal} selected={selectedUser} onClose={onClose} onUpdated={onUpdated}
          onCreated={onCreated}/>
    </Container>
  )
};

export default ListUser;
