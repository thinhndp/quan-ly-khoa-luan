import React, { useState } from 'react';
import ReactQuill from "react-quill";

import './post-reader.css';
import FileSubmitterButton from '../FileSubmitter/FileSubmitterButton';
import * as Utils from '../../utils/utils';
import * as Constants from '../../constants/constants';
import DeXuatButton from '../post/DeXuatButton';
import DangKyDTButton from '../post/DangKyDTButton';
import userAtom, { userAsToken } from '../../recoil/user';
import { useRecoilValue } from 'recoil';

const PostReader = ({ post, asPreview }) => {
  const currentUser = useRecoilValue(userAtom);

  const canUserSubmitFile = () => {
    if (post.deadline != null && Utils.compareDateWithNow(Date.parse(post.deadline)) == -1) {
      return false;
    }
    return (asPreview == null && post.submitter != null && post.submitter._id != null && currentUser && (currentUser.role != Constants.USER_ROLE_GUEST));
  }

  const canUserDKDT = () => {
    if (post.deadline != null && Utils.compareDateWithNow(Date.parse(post.deadline)) == -1) {
      return false;
    }
    return (asPreview == null && post.hasDKDTButton && Utils.isUserValidSinhVien(currentUser)
        && (currentUser.relatedInfoSV.status != Constants.SINH_VIEN_STATUS_ABANDONED && currentUser.relatedInfoSV.status != Constants.SINH_VIEN_STATUS_DONE))
  }

  const canUserDeXuat = () => {
    if (post.deadline != null && Utils.compareDateWithNow(Date.parse(post.deadline)) == -1) {
      return false;
    }
    return (asPreview == null && post.hasDeXuatButton && Utils.isUserValidGiangVien(currentUser))
  }

  return (
    <div class={asPreview ? "c-fade" : ""}>
      <ReactQuill value={post.content}
          readOnly={true} theme={"bubble"}/>
      { canUserSubmitFile() && (
        <FileSubmitterButton folderId={post.submitter._id}
            folderDriveId={post.submitter.driveId}
            renderAs={
              <div className="blue_link">Click để nộp file</div>
            }
        />
      )}
      { canUserDKDT() && (
        <DangKyDTButton
          renderAs={
            <div className="blue_link">Click để Đăng ký Đề tài</div>
          }
        />
      )}
      { canUserDeXuat() && (
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
