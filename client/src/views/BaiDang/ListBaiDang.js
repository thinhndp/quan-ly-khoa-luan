import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { Container, Row, Col, Card, CardHeader, CardBody, Button,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "shards-react";
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import commonStyles from '../../styles/CommonStyles.module.scss';
import PageTitle from "../../components/common/PageTitle";

const ListBaiDang = () => {
  const [ posts, setPosts ] = useState([]);
  const [ isOpenActions, setIsOpenActions ] = useState(false);
  let history = useHistory();
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = () => {
    axios.get('http://localhost:5000/posts')
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const onNewPostClick = () => {
    // history.push('/bai-dang/new');
    history.push('/bai-dang/create-or-edit');
  }
  const toggleActions = () => {
    setIsOpenActions(!isOpenActions);
  }
  const onEditClick = (id) => {
    history.push('/bai-dang/create-or-edit', { postId: id });

  }
  const onDeleteClick = (id) => {
    console.log(id);
    axios.delete(`http://localhost:5000/posts/${id}`)
      .then((res) => {
        console.log(res);
        getPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách Bài đăng" subtitle="QUẢN LÝ BÀI ĐĂNG" className="text-sm-left" />
      </Row>

      {/* Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              {/* <h6 className="m-0">Active Users</h6> */}
              <Button onClick={onNewPostClick}>Bài đăng mới</Button>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Tiêu đề
                    </th>
                    <th scope="col" className="border-0">
                      Nội dung
                    </th>
                    <th scope="col" className="border-0">
                      Ngày đăng
                    </th>
                    <th scope="col" className="border-0">
                      Loại tin
                    </th>
                    <th scope="col" className="border-0">
                      Trạng thái
                    </th>
                    <th scope="col" className="border-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
                  posts.map((post, index) => (
                    <tr key={`post_${index}`}>
                      <td>{post.title}</td>
                      <td>Xem</td>
                      <td>{post.isPosted === true ? post.postedTime : '-'}</td>
                      <td>{post.type === 'CK' ? 'Công khai' : 'Nội bộ'}</td>
                      <td>{post.isPosted === true ? 'Đã đăng' : 'Chưa đăng'}</td>
                      <td>
                        {/* <MoreHorizIcon className={commonStyles['icon-button']}onClick={() => {}}/> */}
                        {/* <Dropdown className="ml-auto" open={isOpenActions} toggle={toggleActions}>
                          <MoreHorizIcon className={commonStyles['icon-button']}
                            onClick={toggleActions}/>
                          <DropdownMenu right>
                            <DropdownItem onClick={() => onEditClick()}>Sửa</DropdownItem>
                            <DropdownItem onClick={() => onDeleteClick(post._id)}>Xóa</DropdownItem>
                          </DropdownMenu>
                        </Dropdown> */}
                        {/* TODO: Move to common */}
                        <EditIcon style={{ color: 'blue' }} className={commonStyles['icon-button']}
                          onClick={() => onEditClick(post._id)}/>
                        <span style={{ margin: '0 5px' }} />
                        <DeleteIcon style={{ color: 'red' }} className={commonStyles['icon-button']}
                          onClick={() => onDeleteClick(post._id)}/>
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
    </Container>
  );
}

export default ListBaiDang;
