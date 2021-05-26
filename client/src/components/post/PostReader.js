import React, { useState } from 'react';
import ReactQuill from "react-quill";

import './post-reader.css';
import FileSubmitterButton from '../FileSubmitter/FileSubmitterButton';

const PostReader = ({ post }) => {
  return (
    <div>
      <ReactQuill value={post.content} readOnly={true} theme={"bubble"}/>
      { (post.submitterObj != null) && (
        <FileSubmitterButton folderId={post.submitter}
            folderDriveId={post.submitterObj.driveId}
            renderAs={
              <div className="blue_link">Click để nộp file</div>
            }
        />
      )}
    </div>
  );
}

export default PostReader;
