import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup} from "shards-react";

import PostReader from '../../components/post/PostReader';
import LyrCalendar from '../../components/common/LyrCalendar/LyrCalendar';
import "./styles.css";
import { getPostWSubmitterById } from '../../api/postAPI';
import userAtom from '../../recoil/user';

const SV_ChiTietTinTuc = () => {
  const [ tinTuc, setTinTuc ] = useState();
  let { id } = useParams();
  let history = useHistory();
  useEffect(() => {
    console.log('chi tiet');
    getPostWSubmitterById(id)
      .then((res) => {
        console.log('chi tiet tin tuc');
        console.log(res);
        setTinTuc(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container min_height_100">
      <div className="public-pages-container">
        <div className="posts-container main-area">
          <Card small className="card-post mb-4">
            { tinTuc &&
              <CardBody>
                <div className="relative_wrap">
                  <h5 className="clickable title">{tinTuc.title}</h5>
                  <PostReader post={tinTuc} />
                  <div className="absolute_child-rb">
                  </div>
                </div>
              </CardBody>
            }
          </Card>
        </div>
        <LyrCalendar />
      </div>
    </div>
  );
}

export default SV_ChiTietTinTuc;
