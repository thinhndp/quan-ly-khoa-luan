import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup} from "shards-react";
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ReactQuill from "react-quill";

import { getPostsWithQuery } from '../../api/postAPI';
import * as Utils from '../../utils/utils';
import commonStyles from '../../styles/CommonStyles.module.scss';
import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import PostReader from '../../components/post/PostReader';
import LyrTable from '../../components/common/LyrTable/LyrTable';

const ListBaiDang = () => {
  const [ viewMode, setViewMode ] = useState(0);
  const [ posts, setPosts ] = useState([]);
  const [ isOpenActions, setIsOpenActions ] = useState(false);
  let history = useHistory();
  const [ resData, setResData ] = useState(Utils.getNewPageData());

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setPosts(resData.docs);
  }, [resData]);

  /* const getList = () => {
    axios.get('http://localhost:5000/posts')
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } */

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions()) => {
    getPostsWithQuery(search, pagingOptions)
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const switchView = (mode) => {
    setViewMode(mode);
  }

  const onNewPostClick = () => {
    // history.push('/bai-dang/new');
    history.push('/bai-dang/create-or-edit/');
  }
  const toggleActions = () => {
    setIsOpenActions(!isOpenActions);
  }
  const onEditClick = (id) => {
    // history.push('/bai-dang/create-or-edit', { postId: id });
    history.push(`/bai-dang/create-or-edit/${id}`);
  }
  const onDeleteClick = (id) => {
    console.log(id);
    axios.delete(`http://localhost:5000/posts/${id}`)
      .then((res) => {
        console.log(res);
        getList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const renderPostsView = () => {
    return (
      <div>
        { posts.map((post) => (
          <Card small className="card-post m-4">
            <CardBody>
              <div className="relative_wrap">
                <h5>{post.title}</h5>
                <PostReader post={post} asPreview/>
                {/* <ReactQuill className="card-text text-muted"
                    value={post.content} readOnly={true} theme={"bubble"}/> */}
                {/* <p className="card-text text-muted">{post.content}</p> */}
                <div className="absolute_child-rb">
                  <ActionButtons onEditClick={() => onEditClick(post._id)}
                      onDeleteClick={() => onDeleteClick(post._id)} />
                </div>
              </div>
            </CardBody>
            {/* <CardFooter className="border-top d-flex">
              <div className="card-post__author d-flex">
                <a
                  href="#"
                  className="card-post__author-avatar card-post__author-avatar--small"
                  style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                >
                  Written by James Khan
                </a>
                <div className="d-flex flex-column justify-content-center ml-3">
                  <span className="card-post__author-name">
                    {post.author}
                  </span>
                  <small className="text-muted">{post.date}</small>
                </div>
              </div>
              <div className="my-auto ml-auto">
                <Button size="sm" theme="white">
                  <i className="far fa-bookmark mr-1" /> Bookmark
                </Button>
              </div>
            </CardFooter> */}
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách Thông báo" subtitle="QUẢN LÝ THÔNG BÁO" className="text-sm-left" />
      </Row>

      {/* Table */}
      <Row>
        <Col>
          <LyrTable
            buttonSection={
              <div>
                <ButtonGroup className="mr-2 btn-group">
                  <Button onClick={() => { switchView(1) }}>
                    <ViewListIcon fontSize="small"/>
                  </Button>
                  <Button onClick={() => { switchView(0) }}>
                    <ViewModuleIcon fontSize="small"/>
                  </Button>
                </ButtonGroup>
                <Button onClick={onNewPostClick}>Bài đăng mới</Button>
              </div>
            }
            data={resData}
            getList={getList}
          >
            <div>
              { viewMode == 1 && (
                <CardBody className="p-0 pb-3 c-table">
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
                            <ActionButtons onEditClick={() => onEditClick(post._id)}
                              onDeleteClick={() => onDeleteClick(post._id)} />
                          </td>
                        </tr>
                      ))
                    }
                    </tbody>
                  </table>
                </CardBody>
              )}
              { viewMode == 0 && renderPostsView() }
            </div>
          </LyrTable>
          {/* <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <ButtonGroup className="mr-2 btn-group">
                <Button onClick={() => { switchView(1) }}>
                  <ViewListIcon fontSize="small"/>
                </Button>
                <Button onClick={() => { switchView(0) }}>
                  <ViewModuleIcon fontSize="small"/>
                </Button>
              </ButtonGroup>
              <Button onClick={onNewPostClick}>Bài đăng mới</Button>
            </CardHeader>
            { viewMode == 1 && (
              <CardBody className="p-0 pb-3 c-table">
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
                          <ActionButtons onEditClick={() => onEditClick(post._id)}
                            onDeleteClick={() => onDeleteClick(post._id)} />
                        </td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
              </CardBody>
            )}
            { viewMode == 0 && renderPostsView() }
          </Card> */}
        </Col>
      </Row>
    </Container>
  );
}

export default ListBaiDang;
