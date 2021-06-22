import React, { useState } from "react";
import { Col, Button } from "shards-react";
import CustomModal from '../../components/common/CustomModal/CustomModal';
import * as Utils from '../../utils/utils';
import { useHistory } from "react-router-dom";

const DeTaiPhanBien = ({ isOpen, toggle, selected, onClose }) => {
  let history = useHistory();
  const [ hoiDong, setHoiDong ] = useState(Utils.getNewHoiDong);

  const onEnter = () => {
    console.log('selected in');
    setHoiDong(selected);
  }

  const onUpdateClick = () => {
    history.push(`/hoi-dong/create-or-edit/${hoiDong._id}`);
  }

  const onDeTaiClick = (id) => {
    window.open(`de-tai/detail/${id}`, "_blank");
  }

  return (
    <CustomModal isOpen={isOpen} toggle={toggle} onClose={onClose}
      onEnter={onEnter}
      title={`Các Đề tài phản biện của ${hoiDong.name}`}
      body={
        <div>
          { hoiDong != null && (
            <div>
              <Col className="form-group">
                {/* <label >Các Đề tài</label> */}
                { hoiDong.deTais.map((deTai) => (
                  <div className="blue_link" onClick={() => { onDeTaiClick(deTai._id) }}>{deTai.tenDeTai}</div>
                )) }
              </Col>
            </div>)
          }
        </div>
      }
      footer={
        <div>
          <Button onClick={onUpdateClick}>Cập nhật Hội đồng</Button>
        </div>
      }
    />
  );
}

export default DeTaiPhanBien;
