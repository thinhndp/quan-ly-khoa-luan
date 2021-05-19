const MOCK_USERS = [
  {
    "_id": "60914ac233d7509fc050fa71",
    "email": "16521178@gm.uit.edu.vn",
    "name": "THINH NGUYEN DINH PHU",
    "picture": "https://lh3.googleusercontent.com/a/AATXAJz4oPUDrD9RzCc9JJgJc2wmF43R20HYoaPV-suk=s96-c",
    "relatedInfoGV": null,
    "relatedInfoSV": "60914f1933d7509fc0517a83",
    "role": "SinhVien"
  },
  {
    "_id": "6095325433d7509fc0c4429b",
    "email": "tligodsp@gmail.com",
    "name": "Thinh Nguyen",
    "picture": "https://lh3.googleusercontent.com/a-/AOh14GgIvf6mEf0cNBAXvS8OlO3vWs5Q_0Xbm0nAC-SC=s96-c",
    "relatedInfoGV": "6081820633d7509fc043b904",
    "relatedInfoSV": null,
    "role": "GiangVien"
  },
  {
    "_id": "6095339533d7509fc0c46b52",
    "email": "yuufuwa@gmail.com",
    "name": "Yuu Fuwa",
    "picture": "https://lh3.googleusercontent.com/a-/AOh14Gjs6RuZZNEEhZygGVzK3AmYqY54vtBrius3ZYWZ=s96-c",
    "relatedInfoGV": null,
    "relatedInfoSV": "60800cdc33d7509fc017659b",
    "role": "SinhVien"
  }
];

export const MOCK_FILES = [
  {
    name: '16521178_GTDT',
    ngayNop: (new Date()).toISOString(),
    user: MOCK_USERS[0]._id,
    userObj: MOCK_USERS[0],
    link: 'https://drive.google.com/file/d/1Xob4CEuGeeiehNAJRD_rO7498nKHV_US/view?usp=sharing'
  },
  {
    name: '16521178_GTDT2',
    ngayNop: (new Date()).toISOString(),
    user: MOCK_USERS[1]._id,
    userObj: MOCK_USERS[1],
    link: 'https://drive.google.com/file/d/1Xob4CEuGeeiehNAJRD_rO7498nKHV_US/view?usp=sharing'
  },
  {
    name: '16521178_GTDT3',
    ngayNop: (new Date()).toISOString(),
    user: MOCK_USERS[2]._id,
    userObj: MOCK_USERS[2],
    link: 'https://drive.google.com/file/d/1Xob4CEuGeeiehNAJRD_rO7498nKHV_US/view?usp=sharing'
  },
];

export const MOCK_DATA = {
  currentUser: {
    role: 'GV',
    email: 'etv@uit.edu.vn'
  },
  users: MOCK_USERS,
  thuMucs: [
    {
      name: 'Giới thiệu đề tài',
      files: MOCK_FILES,
      deadline: (new Date((new Date()).getTime() + (1 * 86400000))).toISOString(),
      status: 'Open',
    },
    {
      name: 'Folder 2',
      files: MOCK_FILES,
      deadline: (new Date((new Date()).getTime() + (1 * 86400000))).toISOString(),
      status: 'Open',
    },
    {
      name: 'Folder 3',
      files: MOCK_FILES,
      deadline: (new Date((new Date()).getTime() + (1 * 86400000))).toISOString(),
      status: 'Open',
    },
    {
      name: 'Folder 4',
      files: MOCK_FILES,
      deadline: (new Date((new Date()).getTime() + (1 * 86400000))).toISOString(),
      status: 'Open',
    },
    {
      name: 'Folder 5',
      files: MOCK_FILES,
      deadline: (new Date((new Date()).getTime() + (1 * 86400000))).toISOString(),
      status: 'Open',
    },
    {
      name: 'Folder 6',
      files: [ ...MOCK_FILES, ...MOCK_FILES ],
      deadline: (new Date((new Date()).getTime() + (1 * 86400000))).toISOString(),
      status: 'Open',
    },
  ],
};
