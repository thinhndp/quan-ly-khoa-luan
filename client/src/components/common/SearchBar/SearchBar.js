import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Button
} from "shards-react";
import SearchIcon from '@material-ui/icons/Search';

import "./search-bar.css";

const SearchBar = ({ value }) => {
  return (
    <div>
      <InputGroup seamless className="mb-3">
        <FormInput placeholder="Nhập nội dung tìm kiếm" value={value}/>
        <InputGroupAddon type="append">
          <Button theme="white" className="search-button">
            <SearchIcon fontSize="small" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export default SearchBar;
