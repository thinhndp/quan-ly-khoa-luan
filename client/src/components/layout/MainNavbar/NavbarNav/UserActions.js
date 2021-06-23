import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { useRecoilValue, useRecoilState } from 'recoil';
import { GoogleLogout } from 'react-google-login';
import { gapi, loadAuth2 } from 'gapi-script'
import { useHistory } from 'react-router-dom';

import * as Utils from '../../../../utils/utils';
import { DEFAULT_USER } from '../../../../constants/constants';
import { userAsSafeVal, userAsIsAuth } from '../../../../recoil/user';
import userAtom from '../../../../recoil/user';


const UserActions = () => {
  const [ visible, setVisible ] = useState(false);
  // let [user, setUser] = useState({ name: "Khách", photo: "https://lh3.googleusercontent.com/a/AATXAJz4oPUDrD9RzCc9JJgJc2wmF43R20HYoaPV-suk=s96-c" });
  // const user = useRecoilValue(userAsSafeVal);
  const isAuth = useRecoilValue(userAsIsAuth);
  const [user, setUser] = useRecoilState(userAtom);
  const logOutButton = useRef();
  let history = useHistory();


  useEffect(() => {
    // setUser(Utils.getUser());
    console.log(user);
  }, []);

  const onLogOutClick = () => {
    // logOutButton.current.click();
    // console.log(logOutButton.current);
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (auth2 != null) {
        auth2.signOut().then(auth2.disconnect()
          .then(() => {
            console.log('out');
            localStorage.setItem('token', null);
            setUser(DEFAULT_USER);
            history.push('/login');
          }))
      }
    }
  }

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  const toggleUserActions = () => {
    setVisible(!visible);
  }

  return (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
        <img
          className="user-avatar rounded-circle mr-2"
          src={ user.picture }
          alt="User Avatar"
        />{" "}
        <span className="d-none d-md-inline-block">{ user.name }</span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible}>
        {/* <DropdownItem tag={Link} to="user-profile">
          <i className="material-icons">&#xE7FD;</i> Profile
        </DropdownItem>
        <DropdownItem tag={Link} to="edit-user-profile">
          <i className="material-icons">&#xE8B8;</i> Edit Profile
        </DropdownItem>
        <DropdownItem tag={Link} to="file-manager-list">
          <i className="material-icons">&#xE2C7;</i> Files
        </DropdownItem> */}
        {/* <DropdownItem tag={Link} to="transaction-history">
          <i className="material-icons">&#xE896;</i> Transactions
        </DropdownItem> */}
        {/* <DropdownItem divider /> */}
        <DropdownItem tag={Link} onClick={onLogOutClick} className="text-danger">
          <i className="material-icons text-danger">&#xE879;</i> Đăng xuất
        </DropdownItem>
        {/* <div className="hiddenn">
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_LOG_IN_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={() => { console.log('log out') }}

          >
          </GoogleLogout>
        </div> */}
      </Collapse>
    </NavItem>
  );
}

export default UserActions;
