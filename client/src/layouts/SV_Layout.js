import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import { Toaster } from 'react-hot-toast';

import MainNavbar from "../components/layout/SV_MainNavbar/SV_Navbar";
import MainFooter from "../components/layout/MainFooter";

const SV_Layout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
      <Col
        className="main-content p-0"
      >
        {!noNavbar && <MainNavbar />}
        {children}
        {!noFooter && <MainFooter />}
      </Col>
    </Row>
    <div className="toaster-container">
      <Toaster />
    </div>
  </Container>
);

SV_Layout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

SV_Layout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default SV_Layout;
