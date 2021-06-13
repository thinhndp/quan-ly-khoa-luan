import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import { getUsers, deleteUserById, updateUserById, createUser,
  getUsersWithQuery } from '../../api/userAPI';
import * as Utils from '../../utils/utils';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import CreateOrEditUserModal from './CreateOrEditUserModal';
import LyrTable from '../../components/common/LyrTable/LyrTable';

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

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions()) => {
    getUsersWithQuery(search, pagingOptions)
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  const onDeleteClick = (id) => {
    deleteUserById(id)
      .then((res) => {
        console.log(res);
        getList();
      })
      .catch((err) => {
        console.log(err.response);
      });
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
          >
            <table className="table mb-0 c-table">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    Tên
                  </th>
                  <th scope="col" className="border-0">
                    Ảnh
                  </th>
                  <th scope="col" className="border-0">
                    Vai trò
                  </th>
                  <th scope="col" className="border-0">
                    Quyền duyệt Đề xuất
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
            </table>
          </LyrTable>
        </Col>
      </Row>
      <CreateOrEditUserModal isModalOpen={isOpenModal} toggleModal={toggleUserModal} selected={selectedUser} onClose={onClose} onUpdated={onUpdated}
          onCreated={onCreated}/>
    </Container>
  )
};

export default ListUser;
