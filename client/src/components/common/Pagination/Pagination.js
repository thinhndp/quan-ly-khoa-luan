import React, { useState, useEffect } from 'react';
import { Button, FormInput, FormGroup, Row, Col, FormSelect } from "shards-react";

import './styles.css';
import * as Utils from '../../../utils/utils';

const DATA_LIST = [
  "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo",
  "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo", "foo",
]

const Pagination = ({ dataList = DATA_LIST, pageData, getData }) => {
  const [ pageSize, setPageSize ] = useState(10);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(1);

  /* useEffect(() => {
    setTotalPages(dataList.length / pageSize);
  }, []); */
  useEffect(() => {
    console.log(pageData);
    setCurrentPage(pageData.page);
    setPageSize(pageData.limit);
    setTotalPages(pageData.totalPages);
  }, [pageData]);

  /* useEffect(() => {
    console.log('aaaa');
    setTotalPages(Math.ceil(dataList.length / pageSize));
  }, [ pageSize, dataList ]); */

  const onNextClick = () => {
    /* if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } */
    if (pageData.hasNextPage) {
      getData('', Utils.getNewPagingOptions(pageData.nextPage, pageSize));
    }
  }

  const onPreviousClick = () => {
    /* if (currentPage > 1) {
      getData('', Utils.getNewPagingOptions(currentPage + 1, pageSize));
    } */
    if (pageData.hasPrevPage) {
      getData('', Utils.getNewPagingOptions(pageData.prevPage, pageSize));
    }
  }

  const onTotalPageChange = (e) => {
    getData('', Utils.getNewPagingOptions(pageData.page, e.target.value));
  }

  return (
    <div className="pagination_container">
      <Button className="previous t-button" disabled={currentPage == 1}
        onClick={onPreviousClick}>Trang trước</Button>
      {/* <div className="center">
        <span>Trang</span>
        <FormInput
          type="number"
          value={currentPage}
          onChange={(e) => { setCurrentPage(e.target.value) }}
        />
        <span>trên tổng 10</span>
        <FormSelect value={pageSize}
            onChange={(e) => { setPageSize(e.target.value) }}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </FormSelect>
      </div> */}
      <div className="center">
        <span className="page_info">
          Trang
          <FormSelect value={currentPage} className="select_page_size"
              onChange={(e) => { setCurrentPage(e.target.value) }}
          >
            { Array.from({length: totalPages}, (val, index) => (
              <option value={index + 1}>{index + 1}</option>
            )) }
          </FormSelect>
          {/* <span className="page_jump">
            <FormInput
              type="number"
              value={currentPage}
              onChange={(e) => {
                console.log(e);
                console.log(e.type);
                console.log(e.nativeEvent);
                if (e.target.value > 0 && e.target.value <= totalPages) {
                  setCurrentPage(e.target.value)
                }
              }}
            />
          </span> */}
          trên
          <span className="total_pages">{totalPages}</span>
          <FormSelect value={pageSize} className="total_pages_size"
              onChange={onTotalPageChange}>
            <option value={5}>5 hàng</option>
            <option value={10}>10 hàng</option>
            <option value={25}>25 hàng</option>
            <option value={50}>50 hàng</option>
          </FormSelect>
        </span>
        {/* <span className="page_size_options">
          <FormSelect value={pageSize}
              onChange={(e) => { setPageSize(e.target.value) }}>
            <option value={5}>5 hàng</option>
            <option value={10}>10 hàng</option>
            <option value={25}>25 hàng</option>
            <option value={50}>50 hàng</option>
          </FormSelect>
        </span> */}
      </div>
      <Button className="next t-button" disabled={currentPage == totalPages}
        onClick={onNextClick}>Trang sau</Button>
    </div>
  );
}

export default Pagination;
