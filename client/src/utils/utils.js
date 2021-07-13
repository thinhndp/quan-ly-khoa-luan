import toast from 'react-hot-toast';

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

export const getNewPagingOptions = (page = 1, limit = 10) => {
  return ({
    page: page,
    limit: limit,
  });
}

export const getNewPageData = () => {
  return ({
    docs: [],
    totalDocs: 1,
    limit: 10,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  });
}

export const getNewUser = () => {
  return ({
    name: '',
    role: 'Khach',
    email: '',
    picture: 'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png',
    canApprove: false,
    relatedInfoSV: null,
    relatedInfoGV: null,
  });
}

export const getNewBieuMau = () => {
  return ({ name: "", link: "" });
}

export const getNewKyThucHien = () => {
  return ({ name: "", status: "CBD", startDate: null, endDate: null });
}

export const getNewPhongHoc = () => {
  return ({ name: "" });
}

export const getNewPost = (userId) => {
  return ({
    title: "",
    content: "",
    creator: userId,
    type: "NB",
    isPosted: false,
    postedTime: (new Date()).toISOString(),
    submitter: null,
    hasDeXuatButton: false,
    hasDKDTButton: false
  });
}

export const getNewHoiDong = () => {
  return ({
    name: "",
    phongHoc: "",
    canBoPhanBien: "",
    canBoHuongDan: "",
    chuTich: "",
    thuKy: "",
    uyVien: "",
    startAt: "",
    endAt: "",
    deTais: []
  });
}

export const getNewDeTai = () => {
  return ({
    tenDeTai: "",
    giangVien: "",
    trangThaiDuyet: "CD",
    trangThaiThucHien: "CDK",
    heDaoTao: "",
    diemSo: [ 0, 0 ],
    sinhVienThucHien: [],
    moTa: "",
    kyThucHien: "",
  });
}

export const getNewTaskLog = (sinhVienId = '') => {
  return ({
    description: '',
    sinhVien: sinhVienId,
    logDate: (new Date()).toISOString(),
    spentTime: '',
    commitLink: ''
  });
}

export const getUserTier = (user) => {
  switch(user.role) {
    case 'GiangVien':
    case 'CanBoKhoa':
    case 'ChuNhiemKhoa':
      return 0;
    case 'Khach':
    case 'SinhVien':
    default:
      return 1;
  }
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

export const getHocHamSL = () => {
  return ([
    { value: Constants.GIANG_VIEN_HOC_HAM_PGS_TS, label: getHocHamText(Constants.GIANG_VIEN_HOC_HAM_PGS_TS) },
    { value: Constants.GIANG_VIEN_HOC_HAM_TS, label: getHocHamText(Constants.GIANG_VIEN_HOC_HAM_TS) },
    { value: Constants.GIANG_VIEN_HOC_HAM_THS, label: getHocHamText(Constants.GIANG_VIEN_HOC_HAM_THS) },
  ]);
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

export const getSinhVienStatusSL = () => {
  return ([
    {
      value: Constants.SINH_VIEN_STATUS_NOT_STARTED,
      label: getSinhVienStatusText(Constants.SINH_VIEN_STATUS_NOT_STARTED)
    },
    {
      value: Constants.SINH_VIEN_STATUS_IN_PROGRESS,
      label: getSinhVienStatusText(Constants.SINH_VIEN_STATUS_IN_PROGRESS)
    },
    {
      value: Constants.SINH_VIEN_STATUS_DONE,
      label: getSinhVienStatusText(Constants.SINH_VIEN_STATUS_DONE)
    },
    {
      value: Constants.SINH_VIEN_STATUS_ABANDONED,
      label: getSinhVienStatusText(Constants.SINH_VIEN_STATUS_ABANDONED)
    },
  ]);
}

export const getKyThucHienStatusText = (abbr) => {
  switch(abbr) {
    case Constants.KY_THUC_HIEN_STATUS_NOT_STARTED:
      return "Chưa bắt đầu";
    case Constants.KY_THUC_HIEN_STATUS_ON_GOING:
      return "Đang diễn ra";
    case Constants.KY_THUC_HIEN_STATUS_FINISHED:
      return "Đã hoàn thành";
    default:
      return "-";
  }
}

export const getKyThucHienStatusSL = () => {
  return ([
    {
      value: Constants.KY_THUC_HIEN_STATUS_NOT_STARTED,
      label: getKyThucHienStatusText(Constants.KY_THUC_HIEN_STATUS_NOT_STARTED)
    },
    {
      value: Constants.KY_THUC_HIEN_STATUS_ON_GOING,
      label: getKyThucHienStatusText(Constants.KY_THUC_HIEN_STATUS_ON_GOING)
    },
    {
      value: Constants.KY_THUC_HIEN_STATUS_FINISHED,
      label: getKyThucHienStatusText(Constants.KY_THUC_HIEN_STATUS_FINISHED)
    },
  ]);
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

export const getHeDaoTaoSL = () => {
  return ([
    { value: Constants.DE_TAI_HDT_DAI_TRA, label: getHeDaoTaoText(Constants.DE_TAI_HDT_DAI_TRA) },
    { value: Constants.DE_TAI_HDT_CHAT_LUONG_CAO, label: getHeDaoTaoText(Constants.DE_TAI_HDT_CHAT_LUONG_CAO) },
  ]);
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

export const getDeTaiApproveStatusSL = () => {
  return ([
    {
      value: Constants.DE_TAI_APPROVE_STATUS_NOT_APPROVED,
      label: getDeTaiApproveStatusText(Constants.DE_TAI_APPROVE_STATUS_NOT_APPROVED)
    },
    {
      value: Constants.DE_TAI_APPROVE_STATUS_APPROVED,
      label: getDeTaiApproveStatusText(Constants.DE_TAI_APPROVE_STATUS_APPROVED)
    },
    {
      value: Constants.DE_TAI_APPROVE_STATUS_REJECTED,
      label: getDeTaiApproveStatusText(Constants.DE_TAI_APPROVE_STATUS_REJECTED)
    },
  ]);
}

export const getUserRoleText = (abbr) => {
  switch(abbr) {
    case Constants.USER_ROLE_GUEST:
      return "Khách";
    case Constants.USER_ROLE_SINH_VIEN:
      return "Sinh viên";
    case Constants.USER_ROLE_GIANG_VIEN:
      return "Giảng viên";
    case Constants.USER_ROLE_CB_KHOA:
      return "Cán bộ Nội vụ";
    case Constants.USER_ROLE_CN_KHOA:
      return "Chủ nhiệm Khoa";
    default:
      return "Khách";
  }
}

export const getUserRoleSL = () => {
  return ([
    {
      value: Constants.USER_ROLE_SINH_VIEN,
      label: getUserRoleText(Constants.USER_ROLE_SINH_VIEN)
    },
    {
      value: Constants.USER_ROLE_GIANG_VIEN,
      label: getUserRoleText(Constants.USER_ROLE_GIANG_VIEN)
    },
    {
      value: Constants.USER_ROLE_CB_KHOA,
      label: getUserRoleText(Constants.USER_ROLE_CB_KHOA)
    },
    {
      value: Constants.USER_ROLE_CN_KHOA,
      label: getUserRoleText(Constants.USER_ROLE_CN_KHOA)
    },
  ]);
}

export const getDeTaiProgressStatusText = (abbr) => {
  switch(abbr) {
    case Constants.DE_TAI_PROGRESS_STATUS_AVAILABLE:
      return "Chờ đăng ký";
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

export const getDeTaiProgressStatusSL = () => {
  return ([
    {
      value: Constants.DE_TAI_PROGRESS_STATUS_AVAILABLE,
      label: getDeTaiProgressStatusText(Constants.DE_TAI_PROGRESS_STATUS_AVAILABLE)
    },
    {
      value: Constants.DE_TAI_PROGRESS_STATUS_IN_PROGRESS,
      label: getDeTaiProgressStatusText(Constants.DE_TAI_PROGRESS_STATUS_IN_PROGRESS)
    },
    {
      value: Constants.DE_TAI_PROGRESS_STATUS_ABANDONED,
      label: getDeTaiProgressStatusText(Constants.DE_TAI_PROGRESS_STATUS_ABANDONED)
    },
    {
      value: Constants.DE_TAI_PROGRESS_STATUS_DONE,
      label: getDeTaiProgressStatusText(Constants.DE_TAI_PROGRESS_STATUS_DONE)
    },
  ]);
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

export const getThongBaoTypeSL = () => {
  return ([
    {
      value: 'NB',
      label: 'Nội bộ'
    },
    {
      value: 'CK',
      label: 'Công khai'
    },
  ]);
}

export const getThongBaoStatusSL = () => {
  return ([
    {
      value: 'NOT_POSTED',
      label: 'Chưa đăng'
    },
    {
      value: 'POSTED',
      label: 'Đã đăng'
    },
  ]);
}

export const getTrueFalseSL = () => {
  return ([
    {
      value: 'FALSE',
      label: 'Không'
    },
    {
      value: 'TRUE',
      label: 'Có'
    },
  ]);
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
  let user = JSON.parse(localStorage.getItem('current_user'));
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

export const getContentAsPreview = (content) => {
  return content.substr(0, 200);
}

export const getFilterString = (filters) => {
  var res = '';
  Object.keys(filters).forEach((key) => {
    if (filters[key].type == Constants.FILTER_TYPE_EQ || filters[key].type == Constants.FILTER_TYPE_SL) {
      res += `&${key}=${filters[key].value}`;
    }
    else if (filters[key].type == Constants.FILTER_TYPE_FTD || filters[key].type == Constants.FILTER_TYPE_FTN) {
      if (filters[key].fromValue != '') {
        res += `&${key}[gte]=${filters[key].fromValue}`;
      }
      if (filters[key].toValue != '') {
        res += `&${key}[lte]=${filters[key].toValue}`;
      }
    }
  });
  console.log('res');
  console.log(res);
  return res;
}

export const isUserValidSinhVien = (user) => {
  return (user && user.role && (user.role == Constants.USER_ROLE_SINH_VIEN) && user.relatedInfoSV && user.relatedInfoSV._id);
}

export const isUserValidGiangVien = (user) => {
  return (user && user.role && (user.role == Constants.USER_ROLE_GIANG_VIEN) && user.relatedInfoGV && user.relatedInfoGV._id);
}

export const isUserAdmin = (user) => {
  return (user && user.role && ((user.role == Constants.USER_ROLE_CB_KHOA) || (user.role == Constants.USER_ROLE_CN_KHOA)));
}

export const getFormattedDate = (dateStr) => {
  var date = new Date(dateStr);
  const offset = date.getTimezoneOffset();
  console.log('time zone');
  console.log(offset);
  date = new Date(date.getTime() - (offset*60*1000));
  return date.toISOString().split('T')[0];
}

export const getLocaleDateString = (dateStr) => {
  var date = new Date(dateStr);
  return date.toLocaleDateString();
}

const calTotalSpentTime = (dayReport) => {
  var totalSpentTime = 0;
  for (var log of dayReport) {
    totalSpentTime += log.spentTime;
  }
  return totalSpentTime;
}

export const getHeatmapSeriesFromReportData = (report) => {
  var series = [
    { name: "CN", data: [] },
    { name: "T7", data: [] },
    { name: "T6", data: [] },
    { name: "T5", data: [] },
    { name: "T4", data: [] },
    { name: "T3", data: [] },
    { name: "T2", data: [] },
  ];
  var curDOW = 0;
  var curW = 0;
  for (var date of Object.keys(report)) {
    series[6 - curDOW].data.push({ x: `Tuần ${curW + 1}`, y: `${calTotalSpentTime(report[date])}h` });
    if (curDOW == 6) {
      curDOW = 0;
      curW++;
    }
    else {
      curDOW++
    }
  }
  return series;
}

export const getToastConfig = () => {
  return ({
    style: {
      minWidth: '250px',
      overflow: 'hidden',
      wordBreak: 'break-all',
      whiteSpace: 'normal'
    },
    position: 'bottom-center',
  });
}

export const showErrorToast = (message) => {
  toast.error(message, getToastConfig());
}

export const showSuccessToast = (message) => {
  toast.success(message, getToastConfig());
}

export const isObjHasAllKeys = (obj, keys) => {
  for (var key of keys) {
    console.log(key);
    if (!(key in obj)) {
      console.log(key);
      return false;
    }
  }
  return true;
}

/* export const notify = (type, message) => {
  return () => {
    switch (type) {
      case Constants.NOTIFICATION_TYPE_INFO:
        toast.info(message);
        break;
      case Constants.NOTIFICATION_TYPE_SUCCESS:
        toast.success(message);
        break;
      case Constants.NOTIFICATION_TYPE_WARNING:
        toast.warning(message);
        break;
      case Constants.NOTIFICATION_TYPE_ERROR:
        toast.error(message);
        break;
      default:
        break;
    }
  };
} */
