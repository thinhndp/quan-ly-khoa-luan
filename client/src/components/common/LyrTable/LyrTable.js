import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from "shards-react";

import './styles.css';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import * as Utils from '../../../utils/utils';
import * as Constants from '../../../constants/constants';
import FilterListIcon from '@material-ui/icons/FilterList';
import FilterButton from './FilterButton';

const LyrTable = ({ children, buttonSection, data, getList, tableMode = false, headers = [], flat = false }) => {
  const [ searchInput, setSearchInput ] = useState('');
  const [ pagingOptions, setPagingOptions ] = useState(Utils.getNewPagingOptions());
  const [ filters, setFilters ] = useState({});

  useEffect(() => {

  }, []);

  useEffect(() => {
    setPagingOptions({ ...pagingOptions, page: 1 });
  }, [searchInput]);

  useEffect(() => {
    console.log('onFilterChange');
    console.log(filters);
    getList(searchInput, pagingOptions, filters);
  }, [pagingOptions, filters]);

  const onSearch = (value) => {
    setSearchInput(value);
  }

  const onChangePagingOptions = (pagingOptions) => {
    setPagingOptions(pagingOptions);
    // getList(searchInput, pagingOptions);
  }

  const onFilter = (fieldName, filter) => {
    var filtersAfter = { ...filters };
    if (!filters[fieldName]) {
      filtersAfter = { ...filtersAfter, ...filter };
      setFilters({ ...filtersAfter });
      return;
    }

    if (filters[fieldName].type == Constants.FILTER_TYPE_EQ || filters[fieldName].type == Constants.FILTER_TYPE_SL) {
      if (!filter[fieldName].value || filter[fieldName].value == '') {
        delete filtersAfter[fieldName];
      }
      else {
        filtersAfter = { ...filtersAfter, ...filter };
      }
    }
    else if (filters[fieldName].type == Constants.FILTER_TYPE_FTD || filters[fieldName].type == Constants.FILTER_TYPE_FTN) {
      if (filter[fieldName].fromValue == '' && filter[fieldName].toValue == '') {
        delete filtersAfter[fieldName];
      }
      else {
        filtersAfter = { ...filtersAfter, ...filter };
      }
    }
    setFilters({ ...filtersAfter });
  }

  return (
    <div className="l-table">
      <Card small className={"mb-4"  + (flat ? " flat-card" : "")}>
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
                      { header.label }
                      <FilterButton headerData={header}
                          onFilter={onFilter}
                          isActive={filters[header.field] != null}
                      />
                      {/* <FilterListIcon color="action" className="icon-button ml-l small-icon"
                        onClick={() => { console.log('filter click') }}/> */}
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
