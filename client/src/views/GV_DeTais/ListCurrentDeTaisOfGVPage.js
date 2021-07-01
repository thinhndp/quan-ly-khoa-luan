import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from 'recoil';

import { getCurDeTaisByGiangVienId } from '../../api/deTaiAPI';
import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';

import DeTaiInfoCard from '../../components/common/InfoCard/DeTaiInfoCard';
import userAtom from '../../recoil/user';

const ListCurrentDeTaisOfGVPage = () => {
  const currentUser = useRecoilValue(userAtom);
  const [ deTais, setDeTais ] = useState([]);

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

  const getList = () => {
    getCurDeTaisByGiangVienId(currentUser.relatedInfoGV._id)
      .then((res) => {
        console.log(res);
        setDeTais(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  const onDeTaiClick = (id) => {
    history.push(`/de-tai-huong-dan/${id}`);
  }

  return (
    <div className="container min_height_100">
      <div className="public-pages-container">
        <div className="main-area">
          <h3 className="page-title">Danh sách Đề tài đang hướng dẫn</h3>
          <div className="de_tai_card_container">
            { deTais.map((deTai) => (
              <div className="de_tai_card" onClick={() => { onDeTaiClick(deTai._id) }}>
                <DeTaiInfoCard deTai={deTai} />
              </div>
            )) }
          </div>
        </div>
      </div>
    </div>
  )
};

export default ListCurrentDeTaisOfGVPage;
