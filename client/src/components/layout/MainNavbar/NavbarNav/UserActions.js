import React, { useEffect, useState } from "react";
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
import { useRecoilValue } from 'recoil';

import * as Utils from '../../../../utils/utils';
import { userAsSafeVal, userAsIsAuth } from '../../../../recoil/user';

const UserActions = () => {
  const [ visible, setVisible ] = useState(false);
  // let [user, setUser] = useState({ name: "Khách", photo: "https://lh3.googleusercontent.com/a/AATXAJz4oPUDrD9RzCc9JJgJc2wmF43R20HYoaPV-suk=s96-c" });
  const user = useRecoilValue(userAsSafeVal);
  const isAuth = useRecoilValue(userAsIsAuth);

  useEffect(() => {
    // setUser(Utils.getUser());
    console.log(user);
  }, []);

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
        <DropdownItem tag={Link} to="user-profile">
          <i className="material-icons">&#xE7FD;</i> Profile
        </DropdownItem>
        <DropdownItem tag={Link} to="edit-user-profile">
          <i className="material-icons">&#xE8B8;</i> Edit Profile
        </DropdownItem>
        <DropdownItem tag={Link} to="file-manager-list">
          <i className="material-icons">&#xE2C7;</i> Files
        </DropdownItem>
        {/* <DropdownItem tag={Link} to="transaction-history">
          <i className="material-icons">&#xE896;</i> Transactions
        </DropdownItem> */}
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/" className="text-danger">
          <i className="material-icons text-danger">&#xE879;</i> Logout
        </DropdownItem>
      </Collapse>
    </NavItem>
  );
}

export default UserActions;
