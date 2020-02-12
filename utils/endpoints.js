/********************************
 * AUTH APIs
 *********************************/
export const LOGIN = `/user/public/login`;
export const REGISTER = `/user/public/register`;
export const REGISTER_VALIDATE = `/user/public/validate`;
export const LOGOUT = `/auth/logout`;
export const AUTH_INFO = `/auth/info`;
export const SEND_OTP = `/auth/otp`;
export const CHECK_PHONE = `/user/public/validate`;
export const FORGOT_PASSWORD = `/user/public/resetpwd`;
export const CHANGE_PASSWORD = `/user/account/changepwd`;
export const ACCOUNT_PERSONAL = `/social/api/user/profile`;
export const ACCOUNT_LINK = `/account/link`;
export const ACCOUNT_PHONE = `/account/phone`;
export const ACCOUNT_TRANSACTIONS = `/account/transactions`;
export const ACCOUNT_REVENUE = `/account/revenue`;
export const ACCOUNT_EARNING = `/account/earning`;

/**
 * SOCIALS
 */
export const FEED = `/social/api/feed`;
export const POSTS = `/social/api/post`;
export const LIKES = `/social/likes`;
export const SHARES = `/social/shares`;
export const COMMENTS = `/social/comments`;
export const MEDIAS = `/social/medias`;
export const NOTIFICATIONS = `/social/notifications`;
export const SOCIAL_CONFIG = `/social/api/config`;

/**
 * ELEARNING
 */
export const ELEARNING_SUMMARY = `/elearning/public/summary`;
export const ELEARNING_INFO = `/elearning/info`;
export const ELEARNING_PROGRAM = `/elearning/program`;
export const ELEARNING_CREATING_ANSWERS = "/elearning/creating/answers";
export const ELEARNING_CREATING_CHAPTERS = "/elearning/creating/chapters";
export const ELEARNING_PUBLIC_RELATED = "/elearning/public/related";
