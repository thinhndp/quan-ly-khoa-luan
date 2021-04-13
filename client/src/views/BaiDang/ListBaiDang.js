import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import PageTitle from "../../components/common/PageTitle";

const ListBaiDang = () => {
  const [posts, setPosts] = useState([]);
  let history = useHistory();
  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onNewPostClick = () => {
    history.push('/bai-dang/new');
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
                      <td>{post.postedTime}</td>
                      <td>{post.type}</td>
                      <td>{post.isPosted == true ? 'Đã đăng' : 'Chưa đăng'}</td>
                      <td>...</td>
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
