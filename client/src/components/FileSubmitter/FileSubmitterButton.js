import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { Button, FormGroup, FormInput, FormSelect, FormTextarea, CardBody } from "shards-react";
import {useDropzone} from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';
import { Scrollbars } from 'react-custom-scrollbars-2';

import CustomModal from '../../components/common/CustomModal/CustomModal';
import * as Utils from '../../utils/utils';
import "./styles.css";
import { uploadFileToFolder } from '../../services/googleDriveServices';
import { createFilesInFolder } from '../../api/fileNopAPI';
import userAtom from '../../recoil/user';

import toast from 'react-hot-toast';

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

const FOLDER_ID = '1gOOoOXUaISEs06bp1COm_oHnVAKu1Ugn';

const FileSubmitterButton = ({ renderAs, folderId, folderDriveId, onUploaded }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ renderFiles, setRenderFiles ] = useState([]);
  const currentUser = useRecoilValue(userAtom);
  const toggleButtonRef = useRef();
  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ noClick: true, noKeyboard: true, multiple: true });

  useEffect(() => {
    setRenderFiles([ ...acceptedFiles ]);
    console.log('ay');
  }, [acceptedFiles]);

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

  const onRemoveFile = (file) => {
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
    setRenderFiles([ ...acceptedFiles ]);
    console.log(file);
    console.log(acceptedFiles);
  }

  const files = renderFiles.map(file => (
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
          onClick={() => { onRemoveFile(file) }}/>
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

  const createFiles = async(gDriveUploadPromises) => {
    const res = await Promise.all([...gDriveUploadPromises]);
    let uploadedFiles = [];
    for (let i = 0; i < res.length; i++) {
      if (res[i].status == 200) {
        uploadedFiles.push({
          name: res[i].data.name,
          driveId: res[i].data.id,
          user: currentUser,
          ngayNop: Date.now()
        });
      }
    }
    console.log(res);
    return createFilesInFolder(folderId, uploadedFiles)
  }

  const onSubmitClick = () => {
    console.log(acceptedFiles);
    const gDriveUploadPromises = [];
    let fileList = [];
    acceptedFiles.forEach((file) => {
      console.log(Utils.getFileExtension(file.name));
      console.log(file);
      const fileMetadata = {
        name: file.name,
        parents: [ folderDriveId ]
      };

      gDriveUploadPromises.push(uploadFileToFolder(fileMetadata, file));
      fileList.push(file);
    });
    toast.promise(
      createFiles(gDriveUploadPromises),
      {
        loading: 'Đang Upload Files',
        success: (res) => {
          console.log("db'ed");
          console.log(res);
          setIsOpen(false);
          if (onUploaded != null) {
            onUploaded();
          }
          return 'Upload thành công';
        },
        error: (err) => {
          return Utils.getFormattedErrMsg(err.response.data.message);
        }
      },
      Utils.getToastConfig()
    );
    /* Promise.all([...gDriveUploadPromises])
        .then((res) => {
          let uploadedFiles = [];
          for (let i = 0; i < res.length; i++) {
            if (res[i].status == 200) {
              uploadedFiles.push({
                name: res[i].data.name,
                driveId: res[i].data.id,
                user: currentUser,
                ngayNop: Date.now()
              });
            }
          }
          console.log(res);
          createFilesInFolder(folderId, uploadedFiles)
            .then((res2) => {
              console.log("db'ed");
              console.log(res2);
              setIsOpen(false);
              if (onUploaded != null) {
                onUploaded();
              }
            })
        })
        .catch((err) => {
          console.log(err);
        }); */
  }

  const toggleRefHandler = () => {
    toggleButtonRef.current.click();
  }

  return (
    <div>
      {
        renderAs == null
        ? (
          <Button onClick={toggleModal}>Submit File</Button>
        )
        : (
          React.cloneElement( renderAs, { onClick: toggleModal } )
        )
      }
      {/* <div onClick={toggleRefHandler}>test</div>
      <Button innerRef={toggleButtonRef} onClick={toggleModal}>Submit File</Button> */}
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
            {
              renderFiles.length > 0 &&
              (<Scrollbars autoHeight className="scroll-area">
                {files}
              </Scrollbars>)
            }
            {/* <aside>
              <div>{files}</div>
            </aside> */}
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
