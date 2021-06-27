import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import XLSX from 'xlsx';
import { useHistory, useParams } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import { getDeTaisByKTHId } from '../../api/deTaiAPI';
import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';

import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import DeTaiInfoCard from '../../components/common/InfoCard/DeTaiInfoCard';
import CreateOrEditKyThucHienModal from './CreateOrEditKTHModal';
import LyrTable from '../../components/common/LyrTable/LyrTable';
import './styles.css';

const ListKyThucHien = () => {
  const [ kyThucHien, setKyThucHien ] = useState(Utils.getNewKyThucHien);
  const [ deTais, setDeTais ] = useState([]);

  let history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (deTais. length > 0) {
      setKyThucHien(deTais[0]. kyThucHien);
    }
  }, [deTais]);

  const getList = () => {
    getDeTaisByKTHId(id)
      .then((res) => {
        console.log(res);
        setDeTais(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  const onDeTaiClick = (id) => {
    history.push(`/de-tai/detail/${id}`);
  }

  const onExportClick = () => {
    var exportData = {};
    exportData.cols = [
      { name:"STT", key: 0 },
      { name:"MSSV", key: 1 },
      { name:"HỌ TÊN", key: 2 },
      { name:"TÊN ĐỀ TÀI TIẾNG VIỆT", key: 3 },
      { name:"TÊN ĐỀ TÀI TIẾNG ANH", key: 4 },
      { name:"TÊN CB HƯỚNG DẪN", key: 5 },
      { name:"GHI CHÚ", key: 6 },
    ];
    var data = [];
    var merge = [];
    data.push([ "STT", "MSSV", "HỌ TÊN", "TÊN ĐỀ TÀI TIẾNG VIỆT", "TÊN ĐỀ TÀI TIẾNG ANH", "TÊN CB HƯỚNG DẪN", "GHI CHÚ" ]);
    var stt = 0;
    deTais.forEach((deTai) => {
      if (deTai.trangThaiDuyet != Constants.DE_TAI_APPROVE_STATUS_APPROVED
          || !deTai.sinhVienThucHien || deTai.sinhVienThucHien.length < 1) {
        return;
      }
      for (var i = 0; i < deTai.sinhVienThucHien.length; i++) {
        var sinhVien = deTai.sinhVienThucHien[i];
        if (i == 0) {
          data.push([ (stt + 1) + '', sinhVien.maSV, sinhVien.name, deTai.tenDeTai, deTai.englishName || '', deTai.giangVien.name, '' ]);
          stt++;
        }
        else {
          data.push([ 'merge_up', sinhVien.maSV, sinhVien.name, 'merge_up', 'merge_up', 'merge_up', 'merge_up' ]);
          merge = [
            ...merge,
            { s: { r: data.length - 2, c: 0}, e: { r: data.length - 1, c: 0 } },
            { s: { r: data.length - 2, c: 3}, e: { r: data.length - 1, c: 3 } },
            { s: { r: data.length - 2, c: 4}, e: { r: data.length - 1, c: 4 } },
            { s: { r: data.length - 2, c: 5}, e: { r: data.length - 1, c: 5 } },
            { s: { r: data.length - 2, c: 6}, e: { r: data.length - 1, c: 6 } },
          ]
        }
      }
    });
    exportData.data = data;
    console.log(exportData);

    /* convert state.data to worksheet */
    const ws = XLSX.utils.aoa_to_sheet(exportData.data);
    ws["!merges"] = merge;
    ws["A1"].s = {									// set the style for target cell
      font: {
        name: 'Calibri',
        sz: 24,
        bold: true,
        color: { rgb: "FFFFAA00" }
      },
      alignment: {
        vertical: "center",
        horizontal: "center"
      }
    };
    console.log(ws['A1']);
    console.log(ws);
    /* build a workbook */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DanhSachDeTai");
    var defaultCellStyle = { font: { name: "Verdana", sz: 30, color: "FF00FF88"}, fill: {fgColor: {rgb: "FFFFAA00"}}};
    var sheet_name_list = wb.SheetNames;

    sheet_name_list.forEach(function(y) { /* iterate through sheets */
      var worksheet = wb.Sheets[y];
      for (let z in worksheet) {
        /* all keys that do not begin with "!" correspond to cell addresses */
        if(z[0] === '!') continue;
        console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].s));
      }
    });

    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "danh_sach_de_tai.xlsx", { defaultCellStyle: defaultCellStyle });
  }

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title={"Danh sách các đề tài" + (kyThucHien.name.length > 0 ? ` thuộc ${kyThucHien.name}` : "")}
            subtitle="QUẢN LÝ KỲ THỰC HIỆN KHÓA LUẬN" className="text-sm-left" />
      </Row>
      <Row>
        <div><Button className="export-button" onClick={() => { onExportClick() }}>Xuất DSSV Thực hiện</Button></div>
        <div className="de_tai_card_container">
          { deTais.map((deTai) => (
            <div className="de_tai_card" onClick={() => { onDeTaiClick(deTai._id) }}>
              <DeTaiInfoCard deTai={deTai} />
            </div>
          )) }
        </div>
      </Row>
    </Container>
  )
};

export default ListKyThucHien;
