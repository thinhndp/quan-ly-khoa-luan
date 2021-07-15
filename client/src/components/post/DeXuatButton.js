import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalHeader, FormGroup, FormInput, FormSelect,
  FormTextarea } from "shards-react";
import { useRecoilValue } from 'recoil';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useHistory } from "react-router-dom";

import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';
import { MOCK_DATA } from '../../data/mock-data';
import { getGiangVienByEmail } from '../../api/giangVienAPI';
import { getOneActiveKyThucHien } from '../../api/kyThucHienAPI';
import { createManyDeTais } from '../../api/deTaiAPI';
import styles from './DeXuatButton.module.scss';
import userAtom from '../../recoil/user';
import CustomModal from '../../components/common/CustomModal/CustomModal';
import "./dx-button.css";

import toast from 'react-hot-toast';

const DeXuatButton = ({ renderAs, onCompleted }) => {
  const currentUser = useRecoilValue(userAtom);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ deXuatCount, setDeXuatCount ] = useState(1);
  const [ deXuatList, setDeXuatList ] = useState([{
    tmpId: Utils.ID(),
    ...Utils.getNewDeTai()
  }]);
  const [ selectedIndex, setSelectedIndex ] = useState(0);
  const [ giangVien, setGiangVien ] = useState({});
  const [ kyThucHien, setKyThucHien ] = useState();
  let history = useHistory();
  useEffect(() => {
    getGiangVienByEmail({ email: currentUser.email })
      .then((res) => {
        console.log('GV:');
        console.log(res);
        // if (res.data == null) {
        //   return null;
        // }
        setGiangVien(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getOneActiveKyThucHien()
      .then((res) => {
        setKyThucHien(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  }
  const renderDexuat = (deXuat, index) => {
    const onTenDeTaiChange = (event) => {
      const list = [ ...deXuatList ];
      list[index].deTaiName = event.target.value;
      setDeXuatList([ ...list ]);
    }
    const onEnglishNameChange = (event) => {
      const list = [ ...deXuatList ];
      list[index].englishName = event.target.value;
      setDeXuatList([ ...list ]);
    }
    const onHeDaoTaoChange = (event) => {
      const list = [ ...deXuatList ];
      list[index].heDaoTao = event.target.value;
      setDeXuatList([ ...list ]);
    }
    const onMoTaChange = (event) => {
      const list = [ ...deXuatList ];
      list[index].moTa = event.target.value;
      setDeXuatList([ ...list ]);
    }

    const onClickDeTaiTitle = (index) => {
      setSelectedIndex(index);
    }

    if (index != selectedIndex) {
      return null;
    }

    return (
      <div key={`de-xuat-${index}`} className="dx-list-container">
        <div className="title-container">
          { deXuatList.map((deXuat, index) => (
            <div className={index == selectedIndex ? "title title--active" : "title"}
                onClick={() => { onClickDeTaiTitle(index) }}
                >{(index == selectedIndex ? "Đề tài " : "") + `${index + 1}`}</div>
          )) }
        </div>
        <div className="de-xuat-container">
          <RemoveCircleOutlineIcon className={styles['close-button']}
              onClick={() => onRemoveClick(deXuat.tmpId)}/>
          <FormGroup>
            <label htmlFor={`deTaiName${index}`}>Tên đề tài</label>
            <FormInput id={`deTaiName${index}`} placeholder="Nhập tên đề tài"
                onChange={onTenDeTaiChange} value={deXuat.deTaiName}/>
          </FormGroup>
          <FormGroup>
            <label htmlFor={`englishName${index}`}>Tên đề tài (Tiếng Anh)</label>
            <FormInput id={`englishName${index}`} placeholder="Nhập tên đề tài tiếng Anh"
                onChange={onEnglishNameChange} value={deXuat.englishName}/>
          </FormGroup>
          <FormGroup>
            <label htmlFor={`heDaoTao${index}`}>Hệ đào tạo</label>
            <FormSelect id={`heDaoTao${index}`}
                onChange={onHeDaoTaoChange} value={deXuat.heDaoTao}>
              <option value=''>Chọn Hệ đào tạo...</option>
              <option value={Constants.DE_TAI_HDT_DAI_TRA}>Đại trà</option>
              <option value={Constants.DE_TAI_HDT_CHAT_LUONG_CAO}>Chất lượng cao</option>
            </FormSelect>
          </FormGroup>
          <FormGroup>
            <label htmlFor={`moTa${index}`}>Mô tả</label>
            <FormTextarea id={`moTa${index}`}
                onChange={onMoTaChange} value={deXuat.moTa}/>
          </FormGroup>
        </div>
      </div>
    );
  }
  useEffect(() => {
    setDeXuatCount(deXuatList.length);
    if (!(selectedIndex < deXuatList.length)) {
      setSelectedIndex(0);
    }
    console.log(deXuatCount);
    console.log(deXuatList);
  }, [deXuatList]);
  const onAddDeXuatClick = () => {
    setDeXuatList([ ...deXuatList, { tmpId: Utils.ID(), ...Utils.getNewDeTai() } ]);
  }
  const onRemoveClick = (id) => {
    if (deXuatCount <= 1) {
      return;
    }

    console.log(id);
    // console.log([ ...deXuatList.filter((deXuat) => deXuat.tmpId != id) ]);
    setDeXuatList([ ...deXuatList.filter((deXuat) => deXuat.tmpId != id) ]);
  }
  const onSubmit = () => {
    console.log(deXuatList);
    const deTais = [];
    deXuatList.map((deXuat) => {
      const deTai = Utils.getNewDeTai();
      deTai.tenDeTai = deXuat.deTaiName;
      deTai.englishName = deXuat.englishName;
      deTai.giangVien = giangVien._id;
      deTai.heDaoTao = deXuat.heDaoTao;
      deTai.moTa = deXuat.moTa;
      deTai.kyThucHien = kyThucHien._id;
      deTais.push(deTai);
    });
    // console.log('de tai');
    console.log(deTais);
    toast.promise(
      createManyDeTais(deTais),
      {
        loading: 'Đang tạo Đề xuất',
        success: (res) => {
          setIsOpen(false);
          if (onCompleted) {
            onCompleted();
          }
          setDeXuatList([{
            tmpId: Utils.ID(),
            ...Utils.getNewDeTai()
          }]);
          return 'Đề xuất thành công';
        },
        error: (err) => {
          return Utils.getFormattedErrMsg(err);
        }
      },
      Utils.getToastConfig()
    );
    /* createManyDeTais(deTais)
      .then((res) => {
        console.log(res);
        // history.push('/de-tai');
        setIsOpen(false);
        if (onCompleted) {
          onCompleted();
        }
        setDeXuatList([{
          tmpId: Utils.ID(),
          ...Utils.getNewDeTai()
        }]);
      })
      .catch((err) => {
        console.log(err);
      }) */
  }
  return (
    <div>
      {
        (giangVien != null) && (
          <div>
            {
              renderAs == null
              ? (
                <Button onClick={toggleModal}>Đề xuất</Button>
              )
              : (
                React.cloneElement( renderAs, { onClick: toggleModal } )
              )
            }
            {/* <Button onClick={toggleModal}>Test</Button> */}
            <CustomModal
              isOpen={isOpen}
              toggle={toggleModal}
              title="Đề xuất đề tài"
              body={
                <div>
                  <Scrollbars className={styles['list-de-tai-container']}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={459}>
                    {
                      deXuatList.map((value, index) => renderDexuat(value, index))
                    }
                  </Scrollbars>
                  <Button className={styles['add-de-xuat-button']}
                      onClick={onAddDeXuatClick} outline>
                    <ControlPointIcon />
                  </Button>
                  <Button className={styles['add-de-xuat-button'] + " nop-dx-button"}
                      onClick={onSubmit}>
                    {/* <AssignmentTurnedInIcon /> */}
                    Nộp đề xuất
                  </Button>
                </div>
              }
            />
            {/* <Modal open={isOpen} toggle={toggleModal}>
              <ModalHeader>Đề xuất đề tài</ModalHeader>
              <ModalBody>
                <Scrollbars className={styles['list-de-tai-container']}
                  autoHeight
                  autoHeightMin={0}
                  autoHeightMax={459}>
                  {
                    deXuatList.map((value, index) => renderDexuat(value, index))
                  }
                </Scrollbars>
                <Button className={styles['add-de-xuat-button']}
                    onClick={onAddDeXuatClick} outline>
                  <ControlPointIcon />
                </Button>
                <Button className={styles['add-de-xuat-button']}
                    onClick={onSubmit}>
                  <AssignmentTurnedInIcon />
                </Button>
              </ModalBody>
            </Modal> */}
          </div>
        )
      }
    </div>
  );
}

export default DeXuatButton;
