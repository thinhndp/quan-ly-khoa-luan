import * as Constants from '../constants/constants';
import ExcelLogo from '../resources/file-icons/excel.svg';
import PDFLogo from '../resources/file-icons/pdf.svg';
import PowerpointLogo from '../resources/file-icons/powerpoint.svg';
import TextLogo from '../resources/file-icons/text.svg';
import WordLogo from '../resources/file-icons/word.svg';
import ZipLogo from '../resources/file-icons/zip.svg';
import ImageLogo from '../resources/file-icons/jpg.svg';

export var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const refreshPage = () => {
  window.location.reload();
}

export const getFileLogo = (fileName) => {
  const extension = getFileExtension(fileName).toLowerCase();
  console.log(extension);
  switch (extension) {
    case 'xls':
    case 'xlsx':
      return ExcelLogo;
    case 'pdf':
      return PDFLogo;
    case 'ppt':
    case 'pptx':
      return PowerpointLogo;
    case 'doc':
    case 'docx':
      return WordLogo;
    case 'zip':
    case 'rar':
    case '7z':
      return ZipLogo;
    case 'jpg':
    case 'jpeg':
    case 'png':
      return ImageLogo;
    default:
      return TextLogo;
  }
}

export const getHocHamText = (abbr) => {
  switch(abbr) {
    case Constants.GIANG_VIEN_HOC_HAM_PGS_TS:
      return "Phó Giáo sư Tiến sĩ";
    case Constants.GIANG_VIEN_HOC_HAM_TS:
      return "Tiến sĩ";
    case Constants.GIANG_VIEN_HOC_HAM_THS:
      return "Thạc sĩ";
    default:
      return "-";
  }
}

export const getSinhVienStatusText = (abbr) => {
  switch(abbr) {
    case Constants.SINH_VIEN_STATUS_NOT_STARTED:
      return "Chưa đăng ký";
    case Constants.SINH_VIEN_STATUS_IN_PROGRESS:
      return "Đang thực hiện";
    case Constants.SINH_VIEN_STATUS_DONE:
      return "Đã hoàn thành";
    case Constants.SINH_VIEN_STATUS_ABANDONED:
      return "Đã dừng";
    default:
      return "-";
  }
}

export const getHeDaoTaoText = (abbr) => {
  switch(abbr) {
    case Constants.DE_TAI_HDT_DAI_TRA:
      return "Đại trà";
    case Constants.DE_TAI_HDT_CHAT_LUONG_CAO:
      return "Chất lượng cao";
    default:
      return "-";
  }
}

export const getDeTaiApproveStatusText = (abbr) => {
  switch(abbr) {
    case Constants.DE_TAI_APPROVE_STATUS_NOT_APPROVED:
      return "Chưa duyệt";
    case Constants.DE_TAI_APPROVE_STATUS_APPROVED:
      return "Đã duyệt";
    case Constants.DE_TAI_APPROVE_STATUS_REJECTED:
      return "Đã từ chối";
    default:
      return "-";
  }
}

export const getDeTaiProgressStatusText = (abbr) => {
  switch(abbr) {
    case Constants.DE_TAI_PROGRESS_STATUS_AVAILABLE:
      return "Chưa được đăng ký";
    case Constants.DE_TAI_PROGRESS_STATUS_IN_PROGRESS:
      return "Đang thực hiện";
    case Constants.DE_TAI_PROGRESS_STATUS_ABANDONED:
      return "Đã dừng";
    case Constants.DE_TAI_PROGRESS_STATUS_DONE:
      return "Đã hoàn thành";
    default:
      return "-";
  }
}

export const getThuMucStatusText = (abbr) => {
  switch(abbr) {
    case Constants.THU_MUC_STATUS_OPEN:
      return "Đang mở nộp";
    case Constants.THU_MUC_STATUS_CLOSED:
      return "Đã đóng";
    default:
      return "-";
  }
}

export const getSinhVienNumOfDeTai = (deTai) => {
  let count = 0;
  if (deTai != null) {
    if (deTai.sinhVien1 != null) {
      count += 1;
    }
    if (deTai.sinhVien2 != null) {
      count += 1;
    }
  }
  return count;
}

export const getUser = () => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user == null) {
    user = {
      email: "guess",
      name: "Khách",
      picture: "https://lh3.googleusercontent.com/a/AATXAJz4oPUDrD9RzCc9JJgJc2wmF43R20HYoaPV-suk=s96-c",
      relatedInfoGV: null,
      relatedInfoSV: null,
      role: "Khach",
      _id: "guess"
    }
  }
  return user;
}

export const getFileExtension = (fileName) => {
  return fileName.split('.').pop().toUpperCase();
}

export const getFormattedSize = (bytes) => {
  return bytes.toString() + ' bytes';
}

export const getUniqueUploader = (files) => {
  const userList = files.map(file => file.user);
  const retArr = [ ...new Map(userList.map(user => [ user.email, user ])).values() ];
  console.log('@@@retArr');
  console.log(retArr);
  return retArr;
}
