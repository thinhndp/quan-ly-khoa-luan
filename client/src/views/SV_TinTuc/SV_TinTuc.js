import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup} from "shards-react";
import { useRecoilValue } from 'recoil';
import Calendar from 'react-calendar';

import PostReader from '../../components/post/PostReader';
import "./styles.css";
import { getPublicPosts, getPrivatePosts } from '../../api/postAPI';
import userAtom from '../../recoil/user';
import * as Utils from '../../utils/utils';

const SV_TinTuc = () => {
  const currentUser = useRecoilValue(userAtom);
  const [ tinTucs, setTinTucs ] = useState([]);
  let history = useHistory();
  useEffect(() => {
    if (Utils.getUserTier(currentUser) == 0) {
      getPrivatePosts()
        .then((res) => {
          console.log(res);
          setTinTucs(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      getPublicPosts()
        .then((res) => {
          console.log(res);
          setTinTucs(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, []);

  const onClickPost = (id) => {
    history.push(`/thong-bao/${id}`);
  }

  return (
    <div className="container min_height_100">
      <div className="tin_tuc_page-container">
        <div className="posts-container">
          { tinTucs.map((post) => (
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
          ))}
        </div>
        <div className="calendar-container">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default SV_TinTuc;
