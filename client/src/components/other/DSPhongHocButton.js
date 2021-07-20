import React, { useEffect, useState } from 'react';
import { Button, FormGroup, FormInput, FormSelect, FormTextarea, CardBody } from "shards-react";
import { useRecoilValue, useRecoilState } from 'recoil';
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal/ConfirmDeleteModal";

import CustomModal from '../../components/common/CustomModal/CustomModal';
import LyrTable from '../../components/common/LyrTable/LyrTable';
import ActionButtons from '../../components/common/ActionButtons';
import CreateOrEditPhongHocModal from '../../views/HoiDong/CreateOrEditPhongHocModal';

import { getPhongHocById, getPhongHocsWithQuery, deletePhongHocById, updatePhongHocById } from '../../api/phongHocAPI';
import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';
import userAtom from '../../recoil/user';

const DSPhongHocButton = ({ renderAs }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ phongHocs, setPhongHocs ] = useState([]);
  const [ resData, setResData ] = useState(Utils.getNewPageData());
  const [ selectedPH, setSelectedPH ] = useState(Utils.getNewPhongHoc);
  const [ isOpenPHModal, setIsOpenPHModal ] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (selectedPH._id != null) {
      setIsOpenPHModal(true);
    }
  }, [selectedPH]);

  useEffect(() => {
    setPhongHocs(resData.docs);
  }, [resData]);

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
    getPhongHocsWithQuery(search, pagingOptions, filters)
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

  const onDeleteClick = (id) => {
    console.log('delete');
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmDeleteModal onClose={onClose} onConfirm={() => {
            toast.promise(
              deletePhongHocById(id),
              {
                loading: 'Đang xóa',
                success: (res) => {
                  getList();
                  onClose();
                  return 'Xóa thành công';
                },
                error: (err) => {
                  return Utils.getFormattedErrMsg(err);
                }
              },
              Utils.getToastConfig()
            );
          }} />
        );
      }
    });
  }

  const onEditClick = (phongHoc) => {
    setSelectedPH(phongHoc);
  }

  const onEditPHClick = (phongHoc) => {
    setSelectedPH(phongHoc);
  }

  const onPHUpdated = () => {
    setIsOpenPHModal(false);
    getList();
  }

  const onPHCreated = () => {
    setIsOpenPHModal(false);
    getList();
  }

  const onPHClose = () => {
    setSelectedPH(Utils.getNewPhongHoc);
  }

  const togglePHModal = () => {
    setIsOpenPHModal(!isOpenPHModal);
  }

  return (
    <div>
      {
        renderAs == null
        ? (
          <Button onClick={toggleModal}>Phòng học</Button>
        )
        : (
          React.cloneElement( renderAs, { onClick: toggleModal } )
        )
      }
      <CustomModal
        isOpen={isOpen}
        toggle={toggleModal}
        title="Danh sách phòng học"
        size="lg"
        body={
          <div>
            {/* <SearchBar /> */}
            <CardBody className="p-0 pb-3">
              <LyrTable
                buttonSection={
                  <Button onClick={() => { setIsOpenPHModal(true) }}>Thêm Phòng học</Button>
                }
                data={resData}
                getList={getList}
                tableMode={true}
                flat
                headers={[
                  {
                    label: "Tên Phòng",
                    type: Constants.FILTER_TYPE_EQ,
                    field: 'name',
                  },
                  {
                    label: "Thao tác",
                    type: Constants.FILTER_TYPE_NL,
                  },
                ]}
              >
              <tbody>
                {
                  phongHocs.map((phongHoc, index) => (
                    <tr key={`de-tai_${index}`}>
                      <td>{phongHoc.name}</td>
                      <td>
                        <ActionButtons
                            onDeleteClick={() => { onDeleteClick(phongHoc._id) }}
                            onEditClick={() => { onEditClick(phongHoc) }} />
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
      <CreateOrEditPhongHocModal isModalOpen={isOpenPHModal} toggleModal={togglePHModal} selected={selectedPH} onClose={onPHClose} onUpdated={onPHUpdated}
          onCreated={onPHCreated}/>
    </div>
  );
}

export default DSPhongHocButton;
