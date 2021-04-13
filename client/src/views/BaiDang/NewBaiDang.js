import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormInput } from "shards-react";
import moment from 'moment';
import ReactQuill from "react-quill";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

import PageTitle from "../../components/common/PageTitle";
import SidebarActions from "../../components/add-new-post/SidebarActions";
import SidebarCategories from "../../components/add-new-post/SidebarCategories";

const NewBaiDang = () => {
  const [ newPost, setNewPost ] = useState({
    title: '',
    content: '',
    creator: '01234',
    category: 'Học vụ',
    type: 'Nội bộ',
    isPosted: false,
    postedTime: moment().toISOString()
  });
  let history = useHistory();
  const onSaveClick = () => {
    console.log(newPost);
    if (newPost.title == '' || newPost.content == '') {
      return;
    }
    axios.post('http://localhost:5000/posts', newPost)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const onPreviewClick = () => {
    console.log('asdasd');
    history.push('/bai-dang/preview', { content: newPost.content });
  }
  return (
    <Container fluid className="main-content-container px-4 pb-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Soạn Bài đăng" subtitle="Quản lý Bài đăng" className="text-sm-left" />
      </Row>

      <Row>
        {/* Editor */}
        <Col lg="9" md="12">
          <Card small className="mb-3">
            <CardBody>
              <Form className="add-new-post">
                <FormInput size="lg" className="mb-3" placeholder="Tên bài đăng"
                  value={newPost.title} onChange={(e) => { setNewPost({ ...newPost, title: e.target.value}) }}/>
                <ReactQuill className="add-new-post__editor mb-1"
                  value={newPost.content} onChange={(html) => { setNewPost({ ...newPost, content: html}) }}/>
              </Form>
            </CardBody>
          </Card>
        </Col>

        {/* Sidebar Widgets */}
        <Col lg="3" md="12">
          <SidebarActions onSaveClick={onSaveClick} onPreviewClick={onPreviewClick}/>
          <SidebarCategories />
        </Col>
      </Row>
    </Container>
  );
}

export default NewBaiDang;
