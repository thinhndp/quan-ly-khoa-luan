import React, { useEffect, useState } from 'react';
import { Button, FormGroup, FormInput, FormSelect, FormTextarea, CardBody } from "shards-react";

import CustomModal from '../../components/common/CustomModal/CustomModal';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import { getDeTais, applyForDeTai } from '../../api/deTaiAPI';
import * as Utils from '../../utils/utils';

import "./dang-ki-btn.css";

const DangKyDTButton = ({ user }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ deTais, setDeTais ] = useState([]);

  useEffect(() => {
    getDeTaiList();
  }, []);

  const getDeTaiList = () => {
    getDeTais()
      .then((res) => {
        console.log(res);
        setDeTais(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  const onApplyClick = (deTaiId) => {
    const sinhVienId = user.relatedInfoSV;
    console.log(deTaiId);
    console.log(sinhVienId);
    applyForDeTai(deTaiId, sinhVienId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <Button onClick={toggleModal}>DKDT</Button>
      <CustomModal
        isOpen={isOpen}
        toggle={toggleModal}
        title="Đăng ký đề tài"
        size="lg"
        body={
          <div>
            <SearchBar />
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-white">
                  <tr>
                    <th scope="col" className="border-0">
                      Tên Đề tài
                    </th>
                    <th scope="col" className="border-0">
                      Giảng viên Hướng dẫn
                    </th>
                    <th scope="col" className="border-0">
                      Hệ đào tạo
                    </th>
                    <th scope="col" className="border-0">
                      Đã đăng ký
                    </th>
                    <th scope="col" className="border-0">
                      Đăng ký đề tài
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
                  deTais.map((deTai, index) => (
                    <tr key={`de-tai_${index}`}>
                      <td>{deTai.tenDeTai}</td>
                      <td>{deTai.giangVien.name}</td>
                      <td>{deTai.heDaoTao}</td>
                      <td>{Utils.getSinhVienNumOfDeTai(deTai)}</td>
                      <td>
                        <Button onClick={() => { onApplyClick(deTai._id) }}>Đăng ký</Button>
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </CardBody>
          </div>
        }
      />
    </div>
  );
}

export default DangKyDTButton;
