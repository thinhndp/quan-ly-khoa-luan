import React, { useEffect, useState } from 'react';
import { Button, FormGroup, FormInput, FormSelect, FormTextarea, CardBody } from "shards-react";

import CustomModal from '../../components/common/CustomModal/CustomModal';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import { getThuMucs } from '../../api/fileNopAPI';
import * as Utils from '../../utils/utils';

import "./styles.css";

const SubmitterPicker = ({ renderAs, onSelectThuMuc }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ thuMucs, setThuMucs ] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    getThuMucs()
      .then((res) => {
        console.log(res);
        setThuMucs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

//   const onApplyClick = (deTaiId) => {
//     const sinhVienId = user.relatedInfoSV;
//     console.log(deTaiId);
//     console.log(sinhVienId);
//     applyForDeTai(deTaiId, sinhVienId)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }
  const onSelect = (thuMuc) => {
    console.log(thuMuc);
    if (onSelectThuMuc != null) {
      onSelectThuMuc(thuMuc);
    }
    setIsOpen(false);
  }

  return (
    <div>
      {
        renderAs == null
        ? (
          <Button onClick={toggleModal}>Đăng ký Đề tài</Button>
        )
        : (
          React.cloneElement( renderAs, { onClick: toggleModal } )
        )
      }
      <CustomModal
        isOpen={isOpen}
        toggle={toggleModal}
        title="Danh sách thư mục"
        body={
          <div id="submitter_picker">
            <SearchBar />
            <CardBody className="p-0 pb-3">
              {/* <table className="table mb-0">
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
                  thuMucs.map((deTai, index) => (
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
              </table> */}
              <div>
                <div className="blue_link cancel_option" onClick={() => onSelect(null)}>Không sử dụng</div>
                {
                  thuMucs.map((thuMuc) => (
                    <div className="blue_link" onClick={() => onSelect(thuMuc)}>{thuMuc.name}</div>
                  ))
                }
              </div>
            </CardBody>
          </div>
        }
      />
    </div>
  );
}

export default SubmitterPicker;
