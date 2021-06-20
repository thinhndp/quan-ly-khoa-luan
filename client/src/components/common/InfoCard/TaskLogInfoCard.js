import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ButtonGroup} from "shards-react";

import * as Utils from '../../../utils/utils';

import './styles.css';

const TaskInfoCard = ({ taskLog, flat = false }) => {
  return (
    <Card small className={"card-post mb-4 info-card blue-border m-15r" + (flat ? " flat-card" : "")}>
      <CardBody>
        <div>
          <h5>{taskLog.description}</h5>
          <Row>
            <Col md="6">
              <p><i class="material-icons icon">person</i><span className="label">Sinh Viên:</span>{taskLog.sinhVien.name}</p>
            </Col>
            <Col md="6">
              <p><i class="material-icons icon">calendar_today</i><span className="label">Ngày:</span>{ Utils.getFormattedDate(taskLog.logDate)}</p>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <p><i class="material-icons icon">schedule</i><span className="label">Thời gian làm:</span>{taskLog.spentTime}h</p>
            </Col>
            <Col md="6">
              <p><i class="material-icons icon">link</i><span className="label">Link commit:</span>{taskLog.commitLink ?
                  <a href={taskLog.commitLink} target='_blank'>Xem</a> : 'Không'}</p>
            </Col>
          </Row>
          {/* <p><i class="material-icons icon">person</i><span className="label">Sinh Viên:</span>{taskLog.sinhVien.name}</p>
          <p><i class="material-icons icon">calendar_today</i><span className="label">Ngày:</span>{ Utils.getFormattedDate(taskLog.logDate)}</p>
          <p><i class="material-icons icon">schedule</i><span className="label">Thời gian làm:</span>{taskLog.spentTime}h</p>
          <p><i class="material-icons icon">link</i><span className="label">Link commit:</span>{taskLog.commitLink ?
              <a href={taskLog.commitLink} target='_blank'>Xem</a> : 'Không'}</p> */}
          {/* <h5>{deTai.tenDeTai}</h5>
          <p>{deTai.moTa}</p>
          <p><i class="material-icons icon">event</i><span className="label">Kỳ thực hiện:</span>{deTai.kyThucHien.name}</p>
          <p><i class="material-icons icon">school</i><span className="label">Hệ đào tạo:</span>{Utils.getHeDaoTaoText(deTai.heDaoTao)}</p>
          <p><i class="material-icons icon">people</i><span className="label">SV Thực hiện:</span>{
            deTai.sinhVienThucHien.map((sinhVien, index) => index != 0 ? `, ${sinhVien.name}` : sinhVien.name)
          }</p> */}
        </div>
      </CardBody>
    </Card>
  );
}

export default TaskInfoCard
