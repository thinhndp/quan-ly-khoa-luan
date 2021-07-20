import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import ReactLoading from 'react-loading';
import { Button, ButtonGroup } from "shards-react";

import { getCurDeTaisByGiangVienId, getPastDeTaisByGiangVienId } from '../../api/deTaiAPI';
import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';

import LyrTable from '../../components/common/LyrTable/LyrTable';
import DeTaiInfoCard from '../../components/common/InfoCard/DeTaiInfoCard';
import userAtom from '../../recoil/user';

const ListCurrentDeTaisOfGVPage = () => {
  const currentUser = useRecoilValue(userAtom);
  const [ resData, setResData ] = useState(Utils.getNewPageData());
  const [ deTais, setDeTais ] = useState([]);
  const [ listMode, setListMode ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);

  let history = useHistory();
  // let { id } = useParams();

  useEffect(() => {
    if (!Utils.isUserValidGiangVien(currentUser)) {
      history.push('/');
    }
    else {
      getList();
    }
  }, []);

  useEffect(() => {
    if (listMode == 0) {
      let sorted = resData.docs.sort((dt1, dt2) => {
        if (dt1.trangThaiDuyet == 'CD') {
          return -1;
        }
        if (dt1.trangThaiDuyet == 'DTC') {
          return 1;
        }
        if (dt2.trangThaiDuyet == 'CD') {
          return 1;
        }
        if (dt2.trangThaiDuyet == 'DTC') {
          return -1;
        }
        return 0;
      })
      setDeTais(sorted);
    }
    else {
      setDeTais(resData.docs);
    }
  }, [resData]);

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
    if (listMode == 0) {
      getCurDeTaisByGiangVienId(currentUser.relatedInfoGV._id, search, pagingOptions)
        .then((res) => {
          console.log(res);
          setResData(res.data);
        })
        .catch((err) => {
          console.log(err.response);
          Utils.showErrorToast(Utils.getFormattedErrMsg(err));
        });
    }
    else {
      getPastDeTaisByGiangVienId(currentUser.relatedInfoGV._id, search, pagingOptions)
        .then((res) => {
          console.log(res);
          setResData(res.data);
        })
        .catch((err) => {
          console.log(err.response);
          Utils.showErrorToast(Utils.getFormattedErrMsg(err));
        });
    }
  }

  const onDeTaiClick = (id) => {
    history.push(`/de-tai-huong-dan/${id}`);
  }

  const onUpdate = () => {
    getList();
  }

  return (
    <div className="container min_height_100">
      <div className="public-pages-container">
        <div className="main-area">
          {/* <h3 className="page-title">Danh sách Đề tài đang hướng dẫn</h3>
          <div className="de_tai_card_container">
            { deTais.map((deTai) => (
              <div className="de_tai_card">
                <DeTaiInfoCard deTai={deTai} onClick={() => { onDeTaiClick(deTai._id) }} onUpdate={onUpdate} />
              </div>
            )) }
          </div> */}
          <ButtonGroup className="mr-2 btn-group width-100 mb-15">
            <Button className={listMode == 0 ? "t-button-font" : "t-button"} onClick={() => { setListMode(0) }}>
              Danh sách đề tài hướng dẫn của Kỳ hiện tại
            </Button>
            <Button className={listMode != 0 ? "t-button-font" : "t-button"} onClick={() => { setListMode(1) }}>
              Danh sách đề tài hướng dẫn trong quá khứ
            </Button>
          </ButtonGroup>
          { listMode == 0 && (
            <LyrTable
              buttonSection={
                <div>
                  <h4>Danh sách Đề tài đang hướng dẫn</h4>
                </div>
              }
              data={resData}
              getList={getList}
              flat
            >
              <div className="de_tai_card_container">
                { deTais.map((deTai) => (
                  <div className="de_tai_card">
                    <DeTaiInfoCard flat deTai={deTai} onClick={() => { onDeTaiClick(deTai._id) }} onUpdate={onUpdate} />
                  </div>
                )) }
              </div>
            </LyrTable>
          ) }
          { listMode == 1 && (
            <LyrTable
              buttonSection={
                <div>
                  <h4>Danh sách Đề tài trong quá khứ</h4>
                </div>
              }
              data={resData}
              getList={getList}
              flat
            >
              <div className="de_tai_card_container">
                { deTais.map((deTai) => (
                  <div className="de_tai_card">
                    <DeTaiInfoCard flat deTai={deTai} onClick={() => { onDeTaiClick(deTai._id) }} onUpdate={onUpdate} />
                  </div>
                )) }
              </div>
            </LyrTable>
          ) }
        </div>
      </div>
    </div>
  )
};

export default ListCurrentDeTaisOfGVPage;
