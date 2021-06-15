import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from "shards-react";

import './styles.css';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import * as Utils from '../../../utils/utils';
import FilterListIcon from '@material-ui/icons/FilterList';

const LyrTable = ({ children, buttonSection, data, getList, tableMode = false, headers = [] }) => {
  const [ searchInput, setSearchInput ] = useState('');
  const [ pagingOptions, setPagingOptions ] = useState(Utils.getNewPagingOptions());

  useEffect(() => {
    setPagingOptions({ ...pagingOptions, page: 1 });
  }, [searchInput]);

  useEffect(() => {
    getList(searchInput, pagingOptions);
  }, [pagingOptions]);

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
          { !tableMode && children }
          { tableMode && (
            <table className="table mb-0 c-table">
              <thead className="bg-light">
                <tr>
                  { headers.map((header) => (
                    <th scope="col" className="border-0">
                      { header }
                      <FilterListIcon color="action" className="icon-button ml-l small-icon"
                        onClick={() => { console.log('filter click') }}/>
                    </th>
                  )) }
                </tr>
              </thead>
              { children }
            </table>
          ) }
          <Pagination pageData={data} onChangePagingOptions={onChangePagingOptions}/>
        </CardBody>
      </Card>
    </div>
  );
}

export default LyrTable;
