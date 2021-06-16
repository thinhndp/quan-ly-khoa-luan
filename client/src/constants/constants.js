export const SINH_VIEN_STATUS_NOT_STARTED = 'CDK';
export const SINH_VIEN_STATUS_IN_PROGRESS = 'DTH';
export const SINH_VIEN_STATUS_DONE = 'DHT';
export const SINH_VIEN_STATUS_ABANDONED = 'DD';

export const GIANG_VIEN_HOC_HAM_THS = 'ThS.';
export const GIANG_VIEN_HOC_HAM_PGS_TS = 'PGS.TS.';
export const GIANG_VIEN_HOC_HAM_TS = 'TS.';

export const KY_THUC_HIEN_STATUS_NOT_STARTED = 'CBD';
export const KY_THUC_HIEN_STATUS_ON_GOING = 'DDR';
export const KY_THUC_HIEN_STATUS_FINISHED = 'DKT';

export const DE_TAI_HDT_DAI_TRA = 'DT';
export const DE_TAI_HDT_CHAT_LUONG_CAO = 'CLC';

export const DE_TAI_APPROVE_STATUS_NOT_APPROVED = 'CD';
export const DE_TAI_APPROVE_STATUS_APPROVED = 'DD';
export const DE_TAI_APPROVE_STATUS_REJECTED = 'DTC';

export const DE_TAI_PROGRESS_STATUS_AVAILABLE = 'CDK';
export const DE_TAI_PROGRESS_STATUS_IN_PROGRESS = 'DTH';
export const DE_TAI_PROGRESS_STATUS_ABANDONED = 'DH';
export const DE_TAI_PROGRESS_STATUS_DONE = 'DHT';

export const THU_MUC_STATUS_OPEN = 'Open';
export const THU_MUC_STATUS_CLOSED = 'Closed';

export const SYSTEM_SETTING_INSTANCE = 'DEFAULT';

export const DETAIL_MODE_VIEW = 'VIEW';
export const DETAIL_MODE_EDIT = 'EDIT';

export const USER_ROLE_GUEST = 'Khach';
export const USER_ROLE_SINH_VIEN = 'SinhVien';
export const USER_ROLE_GIANG_VIEN = 'GiangVien';
export const USER_ROLE_CB_KHOA = 'CanBoKhoa';
export const USER_ROLE_CN_KHOA = 'ChuNhiemKhoa';
export const DEFAULT_USER = {
  email: "guest",
  name: "Khách",
  picture: "https://lh3.googleusercontent.com/a/AATXAJz4oPUDrD9RzCc9JJgJc2wmF43R20HYoaPV-suk=s96-c",
  relatedInfoGV: null,
  relatedInfoSV: null,
  role: USER_ROLE_GUEST,
  _id: "guest"
};

export const FILTER_TYPE_EQ = 'EQ';
export const FILTER_TYPE_SL = 'SL';
export const FILTER_TYPE_FTD = 'FTD';
export const FILTER_TYPE_FTN = 'FTN';
export const FILTER_TYPE_NL = 'NL';
