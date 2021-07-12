import React from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar } from "shards-react";
import WebIcon from '@material-ui/icons/Web';
import AssignmentIcon from '@material-ui/icons/Assignment';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

import NavbarNav from "./SV_NavbarNav/SV_NavbarNav";
import userAtom, { userAsToken } from '../../../recoil/user';
import * as Utils from '../../../utils/utils';

const SV_MainNavbar = ({ layout, stickyTop }) => {
  let history = useHistory();
  const currentUser = useRecoilValue(userAtom);
  const classes = classNames(
    "main-navbar",
    "c-nav-bar",
    stickyTop && "sticky-top"
  );

  const onTinTucClick = () => {
    history.push(`/thong-bao`);
  }

  const onLogClick = () => {
    history.push(`/de-tai-thuc-hien`);
  }

  const onDeTaiClick = () => {
    history.push(`/de-tai-huong-dan`);
  }

  const onAdminClick = () => {
    history.push(`/ky-thuc-hien`);
  }

  return (
    <div className={classes}>
      <Container className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          <div className="nav-bar-icon-container">
            <div className="nav-bar-icon-button" onClick={onTinTucClick}>
              <WebIcon className="icon-button nav-bar-icon" />
              <div>Thông báo</div>
            </div>
            { Utils.isUserValidGiangVien(currentUser) && (
              <div className="nav-bar-icon-button" onClick={onDeTaiClick}>
                <AssignmentIcon className="icon-button nav-bar-icon" />
                <div>Đề tài</div>
              </div>
            ) }
            { Utils.isUserValidSinhVien(currentUser) && (
              <div className="nav-bar-icon-button" onClick={onLogClick}>
                <AssignmentIcon className="icon-button nav-bar-icon" />
                <div>Đề tài</div>
              </div>
            ) }
            { Utils.isUserAdmin(currentUser) && (
              <div className="nav-bar-icon-button" onClick={onAdminClick}>
                <OpenInBrowserIcon className="icon-button nav-bar-icon" />
                <div>Quản lý</div>
              </div>
            ) }
          </div>
          <NavbarNav />
        </Navbar>
      </Container>
    </div>
  );
};

SV_MainNavbar.propTypes = {
  /**
   * The layout type where the SV_MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

SV_MainNavbar.defaultProps = {
  stickyTop: true
};

export default SV_MainNavbar;
