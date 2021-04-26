import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, CardBody, Button,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "shards-react";
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import commonStyles from '../../styles/CommonStyles.module.scss';
import PageTitle from "../../components/common/PageTitle";
import ActionButtons from '../../components/common/ActionButtons';
import { getDeTais } from '../../api/deTaiAPI';

const ListDeTai = () => {
  const [ deTais, setDeTais ] = useState([]);
  const [ isOpenActions, setIsOpenActions ] = useState(false);
  let history = useHistory();
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

  const toggleActions = () => {
    setIsOpenActions(!isOpenActions);
  }
  const onEditClick = (id) => {
    // history.push('/bai-dang/create-or-edit', { postId: id });
  }
  const onDeleteClick = (id) => {
    // console.log(id);
    // axios.delete(`http://localhost:5000/posts/${id}`)
    //   .then((res) => {
    //     console.log(res);
    //     getPosts();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Danh sách Đề tài" subtitle="QUẢN LÝ ĐỀ TÀI" className="text-sm-left" />
      </Row>

      {/* Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            {/* <CardHeader className="border-bottom">
              <Button onClick={onNewPostClick}>Bài đăng mới</Button>
            </CardHeader> */}
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Tên Đề tài
                    </th>
                    <th scope="col" className="border-0">
                      Giảng viên Hướng dẫn
                    </th>
                    <th scope="col" className="border-0">
                      Trạng thái
                    </th>
                    <th scope="col" className="border-0">
                      Hệ đào tạo
                    </th>
                    <th scope="col" className="border-0">
                      Điểm số
                    </th>
                    <th scope="col" className="border-0">
                      Số SV Thực hiện
                    </th>
                    <th scope="col" className="border-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
                  deTais.map((deTai, index) => (
                    <tr key={`de-tai_${index}`}>
                      <td>{deTai.tenDeTai}</td>
                      <td>{deTai.giangVien.name}</td>
                      <td>{deTai.trangThai}</td>
                      <td>{deTai.heDaoTao}</td>
                      <td>{deTai.diemSo}</td>
                      <td>-</td>
                      <td>
                        <ActionButtons onEditClick={() => onEditClick(deTai._id)}
                            onDeleteClick={() => onDeleteClick(deTai._id)} />
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ListDeTai;
