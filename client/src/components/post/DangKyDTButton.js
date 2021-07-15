import React, { useEffect, useState } from 'react';
import { Button, FormGroup, FormInput, FormSelect, FormTextarea, CardBody } from "shards-react";
import { useRecoilValue, useRecoilState } from 'recoil';
import toast from 'react-hot-toast';

import CustomModal from '../../components/common/CustomModal/CustomModal';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import LyrTable from '../../components/common/LyrTable/LyrTable';

import { getDeTais, applyForDeTai, getCurrrentKTHDeTais, cancelDeTaiApplication } from '../../api/deTaiAPI';
import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';
import userAtom from '../../recoil/user';

import "./dang-ki-btn.css";

const DangKyDTButton = ({ renderAs }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ deTais, setDeTais ] = useState([]);
  const [ resData, setResData ] = useState(Utils.getNewPageData());
  // const currentUser = useRecoilValue(userAtom);
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);


  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setDeTais(resData.docs);
  }, [resData]);

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
    getCurrrentKTHDeTais(search, pagingOptions, filters)
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => {
        console.log(err);
        Utils.showErrorToast(Utils.getFormattedErrMsg(err));
        setResData(Utils.getNewPageData());
      });
  }
  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  const onApplyClick = (deTaiId) => {
    const sinhVienId = currentUser.relatedInfoSV;
    console.log(deTaiId);
    console.log(sinhVienId);
    /* applyForDeTai(deTaiId, sinhVienId)
      .then((res) => {
        console.log(res);
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
      }) */
    toast.promise(
      applyForDeTai(deTaiId, sinhVienId),
      {
        loading: 'Đang đăng ký',
        success: (res) => {
          setIsOpen(false);
          var newUserInfo = { ...currentUser, relatedInfoSV: { ...currentUser.relatedInfoSV, status: Constants.SINH_VIEN_STATUS_IN_PROGRESS } };
          setCurrentUser(newUserInfo);
          return 'Đăng ký thành công';
        },
        error: (err) => {
          console.log(err);
          // return 'Utils.getFormattedErrMsg(err)';
          return Utils.getFormattedErrMsg(err);
        }
      },
      Utils.getToastConfig()
    );
  }

  const onCancelClick = (deTaiId) => {
    const sinhVienId = currentUser.relatedInfoSV._id;
    toast.promise(
      cancelDeTaiApplication(deTaiId, sinhVienId),
      {
        loading: 'Đang hủy đăng ký',
        success: (res) => {
          setIsOpen(false);
          var newUserInfo = { ...currentUser, relatedInfoSV: { ...currentUser.relatedInfoSV, status: Constants.SINH_VIEN_STATUS_NOT_STARTED } };
          // console.log(newUserInfo);
          // newUserInfo.relatedInfoSV.status = Constants.SINH_VIEN_STATUS_NOT_STARTED;
          setCurrentUser(newUserInfo);
          return 'Hủy đăng ký thành công';
        },
        error: (err) => {
          return Utils.getFormattedErrMsg(err);
        }
      },
      Utils.getToastConfig()
    );
  }

  const isCurrentUsersDeTai = (deTai) => {
    if (!Utils.isUserValidSinhVien(currentUser)) {
      return false;
    }
    if (!deTai.sinhVienThucHien || deTai.sinhVienThucHien.length == 0) {
      return false;
    }
    for (var sinhVien of deTai.sinhVienThucHien) {
      if (sinhVien._id == currentUser.relatedInfoSV._id) {
        return true;
      }
    }
    return false;
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
        title="Đăng ký đề tài"
        size="lg"
        body={
          <div>
            {/* <SearchBar /> */}
            <CardBody className="p-0 pb-3">
              <LyrTable
                data={resData}
                getList={getList}
                tableMode={true}
                flat
                headers={[
                  {
                    label: "Tên Đề tài",
                    type: Constants.FILTER_TYPE_EQ,
                    field: 'tenDeTai',
                  },
                  {
                    label: "Giảng viên Hướng dẫn",
                    type: Constants.FILTER_TYPE_EQ,
                    field: 'giangVien',
                  },
                  {
                    label: "Hệ đào tạo",
                    type: Constants.FILTER_TYPE_SL,
                    selectList: Utils.getHeDaoTaoSL(),
                    field: 'heDaoTao',
                  },
                  {
                    label: "Đã đăng ký",
                    type: Constants.FILTER_TYPE_NL,
                  },
                  {
                    label: "Thao tác",
                    type: Constants.FILTER_TYPE_NL,
                  },
                ]}
              >
              <tbody>
                {
                  deTais.map((deTai, index) => (
                    <tr key={`de-tai_${index}`}>
                      <td>{deTai.tenDeTai}</td>
                      <td>{deTai.giangVien.name}</td>
                      <td>{Utils.getHeDaoTaoText(deTai.heDaoTao)}</td>
                      <td>{Utils.getSinhVienNumOfDeTai(deTai)}</td>
                      <td>
                        { isCurrentUsersDeTai(deTai) && (
                          <Button theme="danger" onClick={() => { onCancelClick(deTai._id) }}>Hủy đăng ký</Button>
                        ) }
                        { !isCurrentUsersDeTai(deTai) && (
                          <Button disabled={!(currentUser.relatedInfoSV && currentUser.relatedInfoSV.status == Constants.SINH_VIEN_STATUS_NOT_STARTED)}
                              onClick={() => { onApplyClick(deTai._id) }}>Đăng ký</Button>
                        ) }
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </LyrTable>
            </CardBody>
          </div>
        }
      />
    </div>
  );
}

export default DangKyDTButton;
