import React, { useState } from 'react';
import ReactQuill from "react-quill";

import './post-reader.css';
import FileSubmitterButton from '../FileSubmitter/FileSubmitterButton';
import * as Utils from '../../utils/utils';
import DeXuatButton from '../post/DeXuatButton';
import DangKyDTButton from '../post/DangKyDTButton';

const PostReader = ({ post, asPreview }) => {
  return (
    <div class={asPreview ? "c-fade" : ""}>
      <ReactQuill value={post.content}
          readOnly={true} theme={"bubble"}/>
      { (asPreview == null && post.submitter != null) && (
        <FileSubmitterButton folderId={post.submitter._id}
            folderDriveId={post.submitter.driveId}
            renderAs={
              <div className="blue_link">Click để nộp file</div>
            }
        />
      )}
      { (asPreview == null && post.hasDKDTButton) && (
        <DangKyDTButton
          renderAs={
            <div className="blue_link">Click để Đăng ký Đề tài</div>
          }
        />
      )}
      { (asPreview == null && post.hasDeXuatButton) && (
        <DeXuatButton
          renderAs={
            <div className="blue_link">Click để Nộp đề xuất</div>
          }
        />
      )}
    </div>
  );
}

export default PostReader;
