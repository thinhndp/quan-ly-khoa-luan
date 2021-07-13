import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { useRecoilValue } from 'recoil';

import CustomModal from '../../components/common/CustomModal/CustomModal';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import { getBieuMausWithQuery } from '../../api/bieuMauAPI';
import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';
import userAtom from '../../recoil/user';
import LyrTable from '../../components/common/LyrTable/LyrTable';

// import "./dang-ki-btn.css";

const BieuMauListModal = ({ isModalOpen, toggleModal, onClose, onSelectBM }) => {
  const [ bieuMaus, setBieuMaus ] = useState([]);
  const [ resData, setResData ] = useState(Utils.getNewPageData());
  const user = Utils.getUser();
  const currentUser = useRecoilValue(userAtom);


  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setBieuMaus(resData.docs);
  }, [resData]);

  const getList = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
    getBieuMausWithQuery(search, pagingOptions, filters)
      .then((res) => {
        console.log(res);
        setResData(res.data);
      })
      .catch((err) => {
        console.log(err);
        Utils.showErrorToast(err.response.data.message);
        setResData(Utils.getNewPageData());
      });
  }

  const onSelect = (bieuMau) => {
    console.log(bieuMau);
    // setIsOpen(false);
    onSelectBM(bieuMau);
  }

  return (
    <div>
      <CustomModal
        isOpen={isModalOpen} toggle={toggleModal} onClose={onClose}
        title="Danh sách Biểu mẫu"
        size="lg"
        body={
          <div>
            <Row>
              <Col>
                <LyrTable
                  data={resData}
                  getList={getList}
                  tableMode={true}
                  flat
                  headers={[
                    {
                      label: "Tên Biểu mẫu",
                      type: Constants.FILTER_TYPE_NL,
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
                      bieuMaus.map((bieuMau, index) => (
                        <tr key={`bieu-mau_${index}`}>
                          <td><a href={bieuMau.link} target="_blank">{bieuMau.name}</a></td>
                          <td>
                            <Button onClick={() => { onSelect(bieuMau) } }>Chọn</Button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </LyrTable>
              </Col>
            </Row>
          </div>
        }
      />
    </div>
  );
}

export default BieuMauListModal;
