import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup} from "shards-react";
import Calendar from 'react-calendar';

import PostReader from '../../components/post/PostReader';
import "./styles.css";
import { getAllPosts } from '../../api/postAPI';

const SV_TinTuc = () => {
  const [ tinTucs, setTinTucs ] = useState([]);
  useEffect(() => {
    getAllPosts()
      .then((res) => {
        console.log(res);
        setTinTucs(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <div className="container">
      <div className="tin_tuc_page-container">
        <div className="posts-container">
          { tinTucs.map((post) => (
            <Card small className="card-post mb-4">
              <CardBody>
                <div className="relative_wrap">
                  <h5>{post.title}</h5>
                  <PostReader post={post}/>
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
