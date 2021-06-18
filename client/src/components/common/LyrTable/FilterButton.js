import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardFooter,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button,
  Container
} from "shards-react";
import MomentUtils from '@date-io/moment';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';


import * as Utils from '../../../utils/utils';
import * as Constants from '../../../constants/constants';
import CustomModal from '../CustomModal/CustomModal';
import FilterListIcon from '@material-ui/icons/FilterList';

const FilterButton = ({ headerData, onFilter, isActive }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ eqValue, setEQValue ] = useState('');
  const [ slValue, setSLValue ] = useState('');
  const [ ftdFromValue, setFTDFromValue ] = useState('');
  const [ ftdToValue, setFTDToValue ] = useState('');
  const [ ftnFromValue, setFTNFromValue ] = useState('');
  const [ ftnToValue, setFTNToValue ] = useState('');

  const ftdFromPickerRef = useRef();
  const ftdToPickerRef = useRef();

  let history = useHistory();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  const onClearClick = () => {
    setEQValue('');
    setSLValue('');
    setFTDFromValue('');
    setFTDToValue('');
    setFTNFromValue('');
    setFTNToValue('');
  }

  const onFilterClick = () => {
    if (headerData.type == Constants.FILTER_TYPE_EQ) {
      onFilter(headerData.field, { [headerData.field]: {
        value: eqValue,
        type: Constants.FILTER_TYPE_EQ,
      }});
    }
    else if (headerData.type == Constants.FILTER_TYPE_SL) {
      onFilter(headerData.field, { [headerData.field]: {
        value: slValue,
        type: Constants.FILTER_TYPE_SL,
      }});
    }
    else if (headerData.type == Constants.FILTER_TYPE_FTD) {
      onFilter(headerData.field, { [headerData.field]: {
        fromValue: ftdFromValue,
        toValue: ftdToValue,
        type: Constants.FILTER_TYPE_FTD,
      }});
    }
    else if (headerData.type == Constants.FILTER_TYPE_FTN) {
      onFilter(headerData.field, { [headerData.field]: {
        fromValue: ftnFromValue,
        toValue: ftnToValue,
        type: Constants.FILTER_TYPE_FTN,
      }});
    }
    setIsOpen(false);
  }

  const renderTypeEQForm = () => {
    return (
      <FormGroup>
        <label htmlFor="eqValue">{headerData.label}</label>
        <FormInput id="eqValue"
          onChange={(e) => { setEQValue(e.target.value) }} value={eqValue} />
      </FormGroup>
    );
  }

  const renderTypeSLForm = () => {
    return (
      <div>
        <label htmlFor="slValue">{headerData.label}</label>
        <FormSelect value={slValue} id="slValue"
            onChange={(e) => { setSLValue(e.target.value) }}>
          <option value=''>Chọn...</option>
          {
            headerData.selectList.map((slData) => (
              <option value={slData.value}>{slData.label}</option>
            ))
          }
        </FormSelect>
      </div>
    );
  }

  const callFTDFromPicker = () => {
    ftdFromPickerRef.current.click();
  }

  const callFTDToPicker = () => {
    ftdToPickerRef.current.click();
  }

  const renderTypeFTDForm = () => {
    return (
      <Row form>
        <Col md="6" className="form-group">
          <FormGroup>
            <div id="mui-date-hidden" style={{ display: 'none' }}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker value={ftdFromValue}
                    onChange={(date) => {
                      if (date) {
                        setFTDFromValue(date.toISOString());
                      }
                    }}
                    innerRef={ftdFromPickerRef} />
              </MuiPickersUtilsProvider>
            </div>
            <label htmlFor="ftdFromValue">Từ</label>
            <FormInput
              id="ftdFromValue"
              value={ftdFromValue}
              onClick={callFTDFromPicker}
            />
          </FormGroup>
        </Col>
        <Col md="6" className="form-group">
          <FormGroup>
            <div id="mui-date-hidden" style={{ display: 'none' }}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker value={ftdToValue}
                    onChange={(date) => {
                      if (date) {
                        setFTDToValue(date.toISOString());
                      }
                    }}
                    innerRef={ftdToPickerRef} />
              </MuiPickersUtilsProvider>
            </div>
            <label htmlFor="ftdToValue">Đến</label>
            <FormInput
              id="ftdToValue"
              value={ftdToValue}
              onClick={callFTDToPicker}
            />
          </FormGroup>
        </Col>
      </Row>
    );
  }

  const renderTypeFTNForm = () => {
    return (
      <Row form>
        <Col md="6" className="form-group">
          <label htmlFor="ftnFromValue">Từ</label>
          <FormInput
            type="number"
            id="ftnFromValue"
            value={ftnFromValue}
            onChange={(e) => { setFTNFromValue(e.target.value) }}
          />
        </Col>
        <Col md="6" className="form-group">
          <label htmlFor="ftnToValue">Đến</label>
          <FormInput
            type="number"
            id="ftnToValue"
            value={ftnToValue}
            onChange={(e) => { setFTNToValue(e.target.value) }}
          />
        </Col>
      </Row>
    );
  }

  if (headerData.type == Constants.FILTER_TYPE_NL) {
    return null;
  }

  return (
    <div className="dis-inline filter-button">
      <FilterListIcon color={ isActive ? "primary" : "action" } className="icon-button ml-l small-icon"
          onClick={toggleModal}/>
      <CustomModal
          isOpen={isOpen}
          toggle={toggleModal}
          title={`Lọc ${headerData.label}`}
          body={
            <div>
              { headerData.type == Constants.FILTER_TYPE_EQ && renderTypeEQForm() }
              { headerData.type == Constants.FILTER_TYPE_SL && renderTypeSLForm() }
              { headerData.type == Constants.FILTER_TYPE_FTD && renderTypeFTDForm() }
              { headerData.type == Constants.FILTER_TYPE_FTN && renderTypeFTNForm() }
            </div>
          }
          footer={
            <div className="t-button-group">
              <Button onClick={onClearClick}>Xóa</Button>
              <div className="mr-05r"/>
              <Button onClick={onFilterClick}>Lọc</Button>
            </div>
          }
      />
    </div>
  );
}

export default FilterButton;
