/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card, CardHeader, CardBody, ListGroup, ListGroupItem, Button,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "shards-react";
import SubmitterPicker from "../SubmitterPicker/SubmitterPicker";

const SidebarActions = ({ title, onSaveClick, onPreviewClick, post, onLoaiTinChange, onPostClick }) => {
  const [ isOpenLoaiTin, setIsOpenLoaiTin ] = useState(false);
  const [ submitter, setSubmitter ] = useState(null);
  const [ submitterName, setSubmitterName ] = useState("Không");
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
  const onSelectSubmitter = (thuMuc) => {
    setSubmitter(thuMuc);
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
            <Button outline className="ml-2" theme="accent" size="sm" onClick={onPreviewClick}>
              <i className="material-icons">list_alt</i> Xem trước
            </Button>
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
  title: "Actions"
};

export default SidebarActions;
