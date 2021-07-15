/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card, CardHeader, CardBody, ListGroup, ListGroupItem, Button,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "shards-react";
import SubmitterPicker from "../SubmitterPicker/SubmitterPicker";
import * as Utils from '../../utils/utils';

const SidebarActions = ({ title, onSaveClick, onPreviewClick, post, onLoaiTinChange, onHasDXButtonChange,
    onHasDKDTButtonChange, onPostClick, onThuMucChange, thuMuc, onDeadlineClick }) => {
  const [ isOpenLoaiTin, setIsOpenLoaiTin ] = useState(false);
  const [ isOpenDXButton, setIsOpenDXButton ] = useState(false);
  const [ isOpenDKDTButton, setIsOpenDKDTButton ] = useState(false);
  const [ submitter, setSubmitter ] = useState(null);
  const [ submitterName, setSubmitterName ] = useState("Không");

  useEffect(() => {
    console.log('thuMuc');
    console.log(thuMuc);
    if (thuMuc != null) {
      console.log(thuMuc);
      setSubmitter(thuMuc);
    }
  }, [thuMuc]);

  useEffect(() => {
    if (submitter != null) {
      setSubmitterName(submitter.name);
    }
    else {
      setSubmitterName("Không")
    }
  }, [submitter]);
  const toggleLoaiTin = () => {
    setIsOpenLoaiTin(!isOpenLoaiTin);
  }
  const toggleDX = () => {
    setIsOpenDXButton(!isOpenDXButton);
  }
  const toggleDKDT = () => {
    setIsOpenDKDTButton(!isOpenDKDTButton);
  }
  const onSelectSubmitter = (thuMuc) => {
    setSubmitter(thuMuc);
    if (thuMuc != null && thuMuc._id !=  null) {
      onThuMucChange(thuMuc._id);
    }
    else {
      onThuMucChange(null);
    }
  }
  return (
    <Card small className="mb-3">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>

      <CardBody className="p-0">
        <ListGroup flush>
          <ListGroupItem className="p-3">
            {/* <span className="d-flex mb-2">
              <i className="material-icons mr-1">flag</i>
              <strong className="mr-1">Trạng thái:</strong> Nháp{" "}
              <a className="ml-auto" href="#">
                Edit
              </a>
            </span> */}
            <span className="d-flex mb-2">
              <i className="material-icons mr-1">visibility</i>
              <strong className="mr-1">Loại tin:</strong>{" "}
              <strong style={{ color: "#007BFF" }}>{post.type === 'CK' ? ' Công khai ' : ' Nội bộ '}</strong>{" "}
              <Dropdown className="ml-auto" open={isOpenLoaiTin} toggle={toggleLoaiTin}>
                <a href="#" onClick={toggleLoaiTin}>
                  Sửa
                </a>
                <DropdownMenu right>
                  <DropdownItem onClick={() => onLoaiTinChange('CK')}>Công khai</DropdownItem>
                  <DropdownItem onClick={() => onLoaiTinChange('NB')}>Nội bộ</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {/* <a className="ml-auto" href="#">
                Edit
              </a> */}
            </span>
            <span className="d-flex mb-2">
              <i className="material-icons mr-1">source</i>
              <strong className="mr-1">Thư mục nộp file:</strong>{" "}
              <strong style={(submitterName != "Không") ? { color: "#007BFF" } : {}}>{submitterName}</strong>{" "}
              <div className="ml-auto">
                <SubmitterPicker onSelectThuMuc={onSelectSubmitter} renderAs={
                  <a className="ml-auto" href="#">
                    Sửa
                  </a>
                }/>
              </div>
            </span>
            <span className="d-flex mb-2">
              <i className="material-icons mr-1">assignment</i>
              <strong className="mr-1">Thêm nút đề xuất:</strong>{" "}
              <strong style={post.hasDeXuatButton ? { color: "#007BFF" } : {}}
                  >{post.hasDeXuatButton ? ' Có ' : ' Không '}</strong>{" "}
              <Dropdown className="ml-auto" open={isOpenDXButton} toggle={toggleDX}>
                <a href="#" onClick={toggleDX}>
                  Sửa
                </a>
                <DropdownMenu right>
                  <DropdownItem onClick={() => onHasDXButtonChange(true)}>Có</DropdownItem>
                  <DropdownItem onClick={() => onHasDXButtonChange(false)}>Không</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </span>
            <span className="d-flex mb-2">
              <i className="material-icons mr-1">assignment_ind</i>
              <strong className="mr-1">Thêm nút ĐKĐT:</strong>{" "}
              <strong style={post.hasDKDTButton ? { color: "#007BFF" } : {}}
                  >{post.hasDKDTButton ? ' Có ' : ' Không '}</strong>{" "}
              <Dropdown className="ml-auto" open={isOpenDKDTButton} toggle={toggleDKDT}>
                <a href="#" onClick={toggleDKDT}>
                  Sửa
                </a>
                <DropdownMenu right>
                  <DropdownItem onClick={() => onHasDKDTButtonChange(true)}>Có</DropdownItem>
                  <DropdownItem onClick={() => onHasDKDTButtonChange(false)}>Không</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </span>
            <span className="d-flex mb-2">
              <i className="material-icons mr-1">visibility</i>
              <strong className="mr-1">Deadline:</strong>{" "}
              <strong style={{ color: "#007BFF" }}>{Utils.getLocaleDateString(post.deadline)}</strong>{" "}
              <div className="ml-auto">
                <a className="ml-auto" href="#" onClick={onDeadlineClick}>
                  Sửa
                </a>
              </div>
            </span>
            {/* <span className="d-flex mb-2">
              <i className="material-icons mr-1">calendar_today</i>
              <strong className="mr-1">Lịch đăng:</strong> Bây giờ{" "}
              <a className="ml-auto" href="#">
                Edit
              </a>
            </span> */}
            {/* <span className="d-flex">
              <i className="material-icons mr-1">score</i>
              <strong className="mr-1">Readability:</strong>{" "}
              <strong className="text-warning">Ok</strong>
            </span> */}
          </ListGroupItem>
          <ListGroupItem className="d-flex px-3 border-0" style={{ justifyContent: 'flex-end' }}>
            <Button outline theme="accent" size="sm" onClick={onSaveClick}>
              <i className="material-icons">save</i> Lưu
            </Button>
            {/* <Button outline className="ml-2" theme="accent" size="sm" onClick={onPreviewClick}>
              <i className="material-icons">list_alt</i> Xem trước
            </Button> */}
            <Button className="ml-2" theme="accent" size="sm" onClick={onPostClick}>
              <i className="material-icons">file_copy</i> Đăng
            </Button>
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
  );
}

SidebarActions.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SidebarActions.defaultProps = {
  title: "Thuộc tính"
};

export default SidebarActions;
