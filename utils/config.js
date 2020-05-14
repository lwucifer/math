import { CART_LIST, PAYMENT_HASHKEY } from "./endpoints";

export const DEFAULT_HEADER_SEARCH_SELECT = "product";
export const TOKEN_KEY = "token_key";
export const TOKEN_USER_SCHOOLLY = "token_user_schoolly";
export const SCHOOLLY_ACCESS_TOKEN = "schoolly_access_token";
export const DEVICE_ID = "Device-Id";
export const DEVICE_OS = "Device-Os";
export const CLIENT_INFO = "client-info";
export const FIREBASE_TOKEN = "firebase_token";

export const RESPONSE_SUCCESS = true;

export const DATE_BIRTHDAY = "DD/MM/YYYY";
export const DATE_YYYY_MM_DD = "YYYY/MM/DD";
export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_DISPLAY = "HH:mm DD/MM/YYYY";
export const DATETIME_HH_MM = "HH:mm";
export const DATETIME_RECEIVE = "YYYY-MM-DD HH:mm:ss";
export const DATETIME_FULL_TEXT = "LLLL";
export const DATETIME_FULL_WEEK_DAY = "dddd, DD/MM/YYYY, h:mm A";
export const DATETIME_HH_MM_DD_MM_YY = "HH:mm, DD/MM/YYYY";
export const DATE_SHORTCUT = [
  {
    text: 'Hôm nay',
    onClick() {
      const date = new Date();
      return date;
    },
  },
  {
    text: 'Hôm qua',
    onClick() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24);
      return [start, end]
    },
  },
  {
    text: 'Tuần này',
    onClick() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: 'Tháng này',
    onClick() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: 'Tháng trước',
    onClick() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: 'Tùy chọn',
    onClick() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  }
];

export const UNAUTHORIZE_API = ["user/public/renew", "user/public/login"];
export const CLIENT_INFO_API = [CART_LIST, PAYMENT_HASHKEY];

export const MAX_UPLOADED_REPOSITORY_FILE_SIZE = 4096; // MB
export const CURRENCY = 'đ';

export const TIMEOUT = {
  NOTIFY: 5000,
}

