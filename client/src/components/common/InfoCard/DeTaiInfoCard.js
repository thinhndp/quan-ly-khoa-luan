import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup} from "shards-react";

import ColoredTag from '../ColoredTag/ColoredTag';
import * as Utils from '../../../utils/utils';

import './styles.css';
import * as Constants from '../../../constants/constants';
import { green } from '@material-ui/core/colors';

const DeTaiInfoCard = ({ deTai }) => {

  const getTagColor = (trangThaiDuyet) => {
    switch (trangThaiDuyet) {
      case Constants.DE_TAI_APPROVE_STATUS_REJECTED:
        return 'red';
      case Constants.DE_TAI_APPROVE_STATUS_NOT_APPROVED:
        return 'blue';
      case Constants.DE_TAI_APPROVE_STATUS_APPROVED:
        return 'green';
      default:
        return '#5a6169';
    }
  }

  return (
    <Card small className="card-post mb-4 info-card">
      <CardBody>
        <div>
          <h5>{deTai.tenDeTai}</h5>
          <p>{deTai.moTa}</p>
          <p><i class="material-icons icon">event</i><span className="label">Kỳ thực hiện:</span>{deTai.kyThucHien.name}</p>
          <p><i class="material-icons icon">school</i><span className="label">Hệ đào tạo:</span>{Utils.getHeDaoTaoText(deTai.heDaoTao)}</p>
          <p><i class="material-icons icon">person</i><span className="label">GV Hướng dẫn:</span>{deTai.giangVien.name}</p>
          <p><i class="material-icons icon">people</i><span className="label">SV Thực hiện:</span>{
            deTai.sinhVienThucHien.map((sinhVien, index) => index != 0 ? `, ${sinhVien.name}` : sinhVien.name)
          }</p>
          <div className="status-tag">
            <ColoredTag label={ Utils.getDeTaiApproveStatusText(deTai.trangThaiDuyet) } color={ getTagColor(deTai.trangThaiDuyet) }/>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default DeTaiInfoCard
