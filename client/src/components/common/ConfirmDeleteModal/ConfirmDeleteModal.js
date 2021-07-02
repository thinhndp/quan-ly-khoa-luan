import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
} from "shards-react";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import './styles.css';

const ConfirmDeleteModal = ({ onClose, onConfirm }) => {
  return (
    <Card large className="mb-4">
      <CardHeader className="modal-header">
        <h5 className="m-0">Xác nhận</h5>
      </CardHeader>
      <CardBody>
        <div className="confirm-delete-body">
          <DeleteOutlineIcon className="delete-icon" />
          <div>Bạn có thực sự muốn xóa?</div>
        </div>
      </CardBody>
      <CardFooter className="modal-footer">
        <Button theme="light" onClick={onClose}>Hủy</Button>
        <Button onClick={onConfirm} theme="danger">Xóa</Button>
      </CardFooter>
    </Card>
  );
}

export default ConfirmDeleteModal;
