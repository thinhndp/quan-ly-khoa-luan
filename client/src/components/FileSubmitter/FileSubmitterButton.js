import React, { useEffect, useState, useMemo } from 'react';
import { Button, FormGroup, FormInput, FormSelect, FormTextarea, CardBody } from "shards-react";
import {useDropzone} from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';

import CustomModal from '../../components/common/CustomModal/CustomModal';
import * as Utils from '../../utils/utils';
import "./styles.css";

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#2196f3'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const FileSubmitterButton = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ noClick: true, noKeyboard: true, multiple: true });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const files = acceptedFiles.map(file => (
    <div className="file-row">
      <div className="file-type">
        <span>{ Utils.getFileExtension(file.name) }</span>
      </div>
      <div className="file-info truncate">
        <div className="file-name truncate">{file.name}</div>
        <div className="file-size">{Utils.getFormattedSize(file.size)}</div>
      </div>
      <div className="file-action">
        <CloseIcon color="action" className="icon-button"
          onClick={() => { console.log('hello') }}/>
      </div>
    </div>
  ));

  // const files = (
  //   <div className="file-row">
  //     <div className="file-type">
  //       <span>HTML</span>
  //     </div>
  //     <div className="file-info">
  //       <div className="file-name">Biodata.pdf</div>
  //       <div className="file-size">1.2KB</div>
  //     </div>
  //     <div className="file-action">
  //       <CloseIcon color="primary" className="icon-button"
  //         onClick={() => { console.log('hello') }}/>
  //     </div>
  //   </div>
  // );

  const onSubmitClick = () => {
    console.log(acceptedFiles);
    acceptedFiles.forEach((file) => {
      console.log(Utils.getFileExtension(file.name));
    })
  }

  return (
    <div>
      <Button onClick={toggleModal}>File Submitter</Button>
      <CustomModal
        isOpen={isOpen}
        toggle={toggleModal}
        title="Nộp file"
        body={
          <div className="submitter">
            <div {...getRootProps({style})}>
              <input {...getInputProps()} />
              <CloudUploadIcon fontSize="large"/>
              {/* <h5>Kéo thả file</h5>
              <h6>hoặc</h6>
              <Button onClick={open}>
                Duyệt thư mục
              </Button> */}
              <h6>Kéo thả file hoặc <span
                  className="submitter-browse_link"
                  onClick={open}>Duyệt thư mục</span></h6>
            </div>
            <aside>
              {/* <h4>Files</h4> */}
              <div>{files}</div>
            </aside>
          </div>
        }
        footer={
          <div>
            <Button onClick={onSubmitClick}>Submit</Button>
          </div>
        }
      />
    </div>
  );
}

export default FileSubmitterButton;
