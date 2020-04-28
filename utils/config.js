import { CART_LIST, PAYMENT_HASHKEY } from "./endpoints";

export const DEFAULT_HEADER_SEARCH_SELECT = "product";
export const TOKEN_KEY = "token_key";
export const TOKEN_USER_SCHOOLLY = "token_user_schoolly";
export const SCHOOLLY_ACCESS_TOKEN = "schoolly_access_token";
export const DEVICE_ID = "Device-Id";
export const CLIENT_INFO = "client-info";

export const RESPONSE_SUCCESS = true;

export const DATE_BIRTHDAY = "DD/MM/YYYY";
export const DATE_YYYY_MM_DD = "YYYY/MM/DD";
export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_DISPLAY = "HH:mm DD/MM/YYYY";
export const DATETIME_RECEIVE = "YYYY-MM-DD HH:mm:ss";

export const UNAUTHORIZE_API = ["user/public/renew", "user/public/login"];
export const CLIENT_INFO_API = [CART_LIST, PAYMENT_HASHKEY];

export const MAX_UPLOADED_REPOSITORY_FILE_SIZE = 4096; // MB