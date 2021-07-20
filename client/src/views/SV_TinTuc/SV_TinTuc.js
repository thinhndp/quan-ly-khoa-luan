import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup} from "shards-react";
import { useRecoilValue } from 'recoil';

import PostReader from '../../components/post/PostReader';
import LyrCalendar from '../../components/common/LyrCalendar/LyrCalendar';
import LyrTable from '../../components/common/LyrTable/LyrTable';
import "./styles.css";
import { getPublicPosts, getPrivatePosts } from '../../api/postAPI';
import userAtom from '../../recoil/user';
import * as Utils from '../../utils/utils';

const SV_TinTuc = () => {
  const currentUser = useRecoilValue(userAtom);
  const [ tinTucs, setTinTucs ] = useState([]);
  let history = useHistory();
  const [ resData, setResData ] = useState(Utils.getNewPageData());

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setTinTucs(resData.docs);
  }, [resData]);

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
    if (Utils.getUserTier(currentUser) == 0) {
      getPrivatePosts(search, pagingOptions, filters)
        .then((res) => {
          console.log(res);
          setResData(res.data);
        })
        .catch((err) => {
          setResData(Utils.getNewPageData());
          Utils.showErrorToast(Utils.getFormattedErrMsg(err));
        })
    }
    else {
      getPublicPosts(search, pagingOptions, filters)
        .then((res) => {
          console.log(res);
          setResData(res.data);
        })
        .catch((err) => {
          setResData(Utils.getNewPageData());
          Utils.showErrorToast(Utils.getFormattedErrMsg(err));
        })
    }
  }

  const onClickPost = (id) => {
    history.push(`/thong-bao/${id}`);
  }

  return (
    <div className="container min_height_100">
      <div className="public-pages-container">
        <div className="posts-container main-area">
          {/* { tinTucs.map((post) => (
            <Card small className="card-post mb-4">
              <CardBody>
                <div className="relative_wrap">
                  <h5 className="clickable title" onClick={() => { onClickPost(post._id) }}>{post.title}</h5>
                  <PostReader post={post} asPreview/>
                  <div className="absolute_child-rb">
                  </div>
                </div>
              </CardBody>
            </Card>
          ))} */}
          <LyrTable
            buttonSection={
              <div>
                <h4>Thông báo mới</h4>
              </div>
            }
            data={resData}
            getList={getList}
            flat
          >
            <div>
              { tinTucs.map((post) => (
                <Card small className="card-post mb-4 flat-card">
                  <CardBody>
                    <div className="relative_wrap">
                      <h5 className="clickable title" onClick={() => { onClickPost(post._id) }}>{post.title}</h5>
                      <PostReader post={post} asPreview/>
                      <div className="absolute_child-rb">
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </LyrTable>
        </div>
        <LyrCalendar />
      </div>
    </div>
  );
}

export default SV_TinTuc;
