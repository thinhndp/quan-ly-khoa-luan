import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from "shards-react";

import './styles.css';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import * as Utils from '../../../utils/utils';

const LyrTable = ({ children, buttonSection, data, getList }) => {
  const [ searchInput, setSearchInput ] = useState('');
  const [ pagingOptions, setPagingOptions ] = useState(Utils.getNewPagingOptions());

  useEffect(() => {
    getList(searchInput, pagingOptions);
  }, [searchInput, pagingOptions]);

  const onSearch = (value) => {
    setSearchInput(value);
  }

  const onChangePagingOptions = (pagingOptions) => {
    setPagingOptions(pagingOptions);
    // getList(searchInput, pagingOptions);
  }

  return (
    <div className="l-table">
      <Card small className="mb-4">
        <CardHeader className="border-bottom header">
          <div className="button-section">
            { buttonSection }
          </div>
          <div className="query-options">
            <SearchBar onSearch={onSearch} />
          </div>
        </CardHeader>
        <CardBody className="p-0 pb-3 c-table_container">
          { children }
          <Pagination pageData={data} onChangePagingOptions={onChangePagingOptions}/>
        </CardBody>
      </Card>
    </div>
  );
}

export default LyrTable;
