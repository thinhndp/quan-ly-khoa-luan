import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Card, CardBody, Button, Col } from "shards-react";
import ReactQuill from "react-quill";
import PageTitle from "../../components/common/PageTitle";
import DeXuatButton from "../../components/post/DeXuatButton";

const PreviewBaiDang = () => {
  let history = useHistory();
  const [content, setContent] = useState('');
  useEffect(() => {
    console.log(history.location);
    setContent(history.location.state.content);
  }, []);
  const onBackClick = () => {
    // history.goBack();
    window.history.back();
  }
  return (
    <Container fluid className="main-content-container px-4 pb-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Soạn Bài đăng" subtitle="Xem trước Bài đăng" className="text-sm-left" />
      </Row>

      <Row style={{ display: 'flex', flexDirection: 'row' }}>
        {/* <ReactQuill className="add-new-post__editor mb-1"
          value={content} readOnly={true} theme={"bubble"}/> */}
        <Card small className="mb-3 ml-3" style={{ width: '80%', minWidth: '300px' }}>
          <CardBody>
            {/* <Form className="add-new-post">
              <FormInput size="lg" className="mb-3" placeholder="Tên bài đăng"
                value={newPost.title} onChange={(e) => { setNewPost({ ...newPost, title: e.target.value}) }}/>
              <ReactQuill className="add-new-post__editor mb-1"
                value={newPost.content} onChange={(html) => { setNewPost({ ...newPost, content: html}) }}/>
            </Form> */}
            <ReactQuill className="add-new-post__editor mb-1"
              value={content} readOnly={true} theme={"bubble"}/>
          </CardBody>
        </Card>
      </Row>
      <div style={{ display: 'flex' }}>
        <Button onClick={onBackClick}>Trở về</Button>
        {/* <div style={{ margin: '10px' }} /> */}
        {/* <DeXuatButton /> */}
      </div>
    </Container>
  );
}

export default PreviewBaiDang;
