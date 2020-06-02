export const POST_TYPES = {
  STATUS: 1,
  PHOTO: 2,
  SHARE: 3,
  LINK: 4,
  VIDEO: 5
};

export const LIKE_SOURCE_TYPES = {
  POST: 1,
  COMMENT: 2
};

export const LIKE_TYPES = {
  LIKE: 1,
  HAPPY: 2,
  ANGRY: 3
};

export const APP_INPUT_VALIDATE_STATUS = {
  DEFAULT: 0,
  SUCCESS: 1,
  ERROR: 2,
  WARNING: 3
};

export const SOCIAL_LINK_SCHEMA = {
  type: "",
  url: "",
  image: "",
  title: "",
  description: "",
  updatedTime: "",
  imageWidth: "",
  imageHeight: "",
  videoUrl: "",
  videoSecureUrl: "",
  videoType: "",
  videoWidth: "",
  videoHeight: "",
  videoTag: "",
  siteName: ""
};

export const ELEARNING_TYPES = {
  COURSE: "COURSE",
  LECTURE: "LECTURE"
};

export const ELEARNING_TYPES_VALUE = {
  COURSE: "course",
  LECTURE: "lecture"
};

export const ELEARNING_TYPES_TEXT = {
  lecture: "bài giảng",
  course: "khoá học"
};

export const ELEARNING_STATUSES = {
  PASSED: "PASSED",
  FAILED: "FAILED",
  PENDING: "PENDING"
};

export const CHAT = {
  JOIN_ROOM: "join_room",
  MESSAGE: "message",
  LEAVE_ROOM: "leave_room",
  STATUS_HANDLE: "status_handle",
  USER_TYPING: "user_typing",
  READ_MESSAGE: "read_message"
};

export const SHARE_OPTS = {
  TIMELINE: 0,
  FRIEND: 1,
  MESSAGE: 2
};

export const EXERCISE_TYPES = {
  CHOICE: "CHOICE",
  ESSAY: "ESSAY"
};

export const EXERCISE_CATEGORIES = {
  EXERCISE: "EXERCISE",
  TEST: "TEST"
};

export const STUDY_MODE = {
  DEFAULT: "",
  VIDEO_PLAYING: "VIDEO_PLAYING",
  DOCS: "DOCS",
  ARTICLE: "ARTICLE",
  IMAGE: "IMAGE",
  DO_EXERCISE: "DO_EXERCISE",
  DO_EXERCISE_BEFORE_BEGIN: "DO_EXERCISE_BEFORE_BEGIN",
  DO_EXERCISE_DOING: "DO_EXERCISE_DOING",
  REVIEW_EXERCISE_RESULT: "REVIEW_EXERCISE_RESULT"
  // DO_TEST: 'DO_TEST',
};

export const EXERCISE_STATUS = {
  NONE: "NONE",
  PENDING: "PENDING",
  FAILED: "FAILED",
  PASSED: "PASSED"
};

export const LESSION_STATUS = {
  NOT_COMPLETE: 0,
  COMPLETED: 1
};

export const LESSION_ONLINE_STATUS = {
  // COMING: 2,
  LIVE: 1,
  FINISH: 0
};

export const QUESTION_NAV = {
  NEXT: 1,
  BACK: -1
};

export const SUBMISSION_RESULTS = {
  PASSED: "PASSED",
  FAILED: "FAILED",
  PENDING: "PENDING",
  NONE: "NONE"
};

export const SCALE_MARK = 10;

export const FINGERPRINT_PROPS = [
  "userAgent",
  "brandModel",
  "language",
  "platform",
  "deviceId",
  "deviceMemory",
  "hardwareConcurrency",
  "sessionStorage",
  "localStorage",
  "indexedDb",
  "openDatabase"
];
export const DEVICE_TYPE = {
  WEB: "WEB",
  MOBILE_APP: "MOBILE_APP",
  DESKTOP_APP: "DESKTOP_APP"
};
export const UPDATE_NOTI = {
  ALL: "All",
  ONLY_ONE: "ONLY_ONE"
};

export const USER_ROLES = {
  ROLE_USER: "ROLE_USER",
  ROLE_STUDENT: "ROLE_STUDENT",
  ROLE_TEACHER: "ROLE_TEACHER",
  ROLE_PARENT: "ROLE_PARENT",
  ROLE_SYSTEM_ADMIN: "ROLE_SYSTEM-ADMIN",
  ROLE_ORG_ADMIN: "ROLE_ORG-ADMIN"
};

export const ELEARNING_SIDE_MENU = {};

export const ACCOUNT_PROFILE_MENU = {
  ELEARNING: 1,
  STUDENT: 2,
  ACCOUNT_INFO: 3,
  REVENUE: 1,
  TRANSACTION: 4,
  NOTIFICATION: 5,
  SETTINGS: 6,
  SUPPORT: 7,
  SIGNOUT: 8
};

export const WITHDRAWAL_STATUSES = {
  SUCCESS: "SUCCESS",
  FAILED: "FAIL",
  PENDING: "PENDING"
};

export const TRANSACTION_STATUSES = {
  SUCCESS: "1",
  FAILED: "-1",
  PENDING: "0",
  CANCEL: "2",
  CANCEL_SUCCESS: "-2"
};

export const PAGE_SIZE = {
  DEFAULT: 10,
  SCHOOL_16: 16
};

export const SUBJECT_CODE = {
  MUSIC: "AM",
  TECHNOLOGY: "CN",
  MORAL: "DD",
  GEOGPRAPHY: "DL",
  CIVIC_EDUCATION: "GDCD",
  CHEMISTRY: "HH",
  SCIENCE: "KH",
  HISTORY: "LS",
  FINE_ART: "MT",
  FOREIGN_LANGUAGE: "NN",
  LITERATURE: "NV",
  BIOLOGY: "SH",
  PHYSICAL_EDUCATION: "TD",
  VIETNAMESES: "TV",
  INFORMATICS: "TH",
  MATHS: "Toan",
  NATURAL_SOCIAL: "TNXH",
  PHYSICS: "VL"
};

export const DAY_SECTION = {
  MORNING: 1,
  AFTERNOON: 2,
  EVENING: 3
};

export const LESSION_TYPE = {
  VIDEO: "VIDEO",
  DOC: "DOC",
  ARTICLE: "ARTICLE",
  PDF: "PDF",
  TXT: "TXT",
  IMAGE: "IMAGE"
};

export const SORT_ELEARNING = {
  RELATED: "RELATED",
  RATE: "RATE",
  COMMENT: "COMMENT",
  NEWEST: "NEWEST",
  PRICE_ASC: "PRICE_ASC",
  PRICE_DESC: "PRICE_DESC",
};
