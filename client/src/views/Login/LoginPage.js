import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardImg, CardTitle, CardHeader } from "shards-react";
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useRecoilState } from 'recoil';

import './styles.css';
import userAtom from '../../recoil/user';
import MyGoogleLogin from '../../components/common/GoogleAuthButton/GoogleLogin';

const LoginPage = () => {
  const [user, setUser] = useRecoilState(userAtom);
  let history = useHistory();

  const handleLogin = (googleData) => {
    console.log(googleData);
    // const token = googleData.tokenId;
    const token = googleData.accessToken;
    axios.post('/auth/google', { token: token })
      .then((res) => {
        console.log(res);
        // setUser(res.data);
        localStorage.setItem('token', token);
        setUser({ ...res.data });
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div class="login-container">
      <Container>
        <Row className="item-center">
          {/* <Col>
            <Card style={{ maxWidth: "300px" }}>
              <CardImg src="https://tuyensinh.uit.edu.vn/sites/default/files/uploads/files/dai-hoc-uit-3.jpg" />
              <CardBody>
                <CardTitle>Đăng Nhập</CardTitle>
              </CardBody>
            </Card>
          </Col> */}
          <Col className="login-card">
            <Card small className="card-post card-post--1">
              {/* <CardHeader>
                <h3 className="card-title">
                  <a href="#" className="text-fiord-blue">
                    Đăng nhập
                  </a>
                </h3>
              </CardHeader> */}
              {/* <div
                className="card-post__image"
                style={{ backgroundImage: `url("https://se.uit.edu.vn/templates/mimety/images/banner5.jpg")` }}
              >
              </div> */}
              <div
                className="card-post__image"
                style={{ backgroundImage: `url("https://tuyensinh.uit.edu.vn/sites/default/files/uploads/files/dai-hoc-uit-3.jpg")` }}
              >
              </div>
              <CardBody>
                {/* <h3 className="card-title">
                  <a href="#" className="text-fiord-blue">
                    Đăng nhập
                  </a>
                </h3> */}
                <div class="logo-container">
                  <div class="logo-uit"/>
                </div>
                {/* <GoogleLogin
                  className="google-button"
                  clientId={process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID}
                  buttonText="Đăng nhập bằng tài khoản Google"
                  onSuccess={handleLogin}
                  onFailure={handleLogin}
                  cookiePolicy={'single_host_origin'}
                /> */}
                <MyGoogleLogin
                  onSuccess={handleLogin}
                  onFailure={(err) => { console.log(err) }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
