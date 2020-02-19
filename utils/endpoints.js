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
export const RESET_PASSWORD_REQUEST = `/user/public/resetpwd/request`;
export const CHANGE_PASSWORD = `/user/account/changepwd`;
export const ACCOUNT_PERSONAL = `/social/api/user/profile`;
export const ACCOUNT_LINK = `/account/link`;
export const ACCOUNT_PHONE = `/account/phone`;
export const ACCOUNT_TRANSACTIONS = `/account/transactions`;
export const ACCOUNT_REVENUE = `/account/revenue`;
export const ACCOUNT_EARNING = `/account/earning`;
export const VERIFY_EMAIL = `user/public/verify`;
export const REFRESH_TOKEN = `user/public/renew`;

/**
 * SOCIALS
 */
export const FEED = `/social/api/feed`;
export const POSTS = `/social/api/post`;
export const LIKES = `/social/api/like`;
export const SHARES = `/social/shares`;
export const COMMENTS = `/social/comments`;
export const MEDIAS = `/social/medias`;
export const NOTIFICATIONS = `/social/notifications`;
export const SOCIAL_CONFIG = `/social/api/config`;

/**
 * ELEARNING
 */
export const ELEARNING_PUBLIC_SUMMARY = `/elearning/public/summary`;
export const ELEARNING_INFO = `/elearning/info`;
export const ELEARNING_PROGRAM = `/elearning/program`;
export const ELEARNING_CREATING_ANSWERS = "/elearning/creating/answers";
export const ELEARNING_CREATING_CHAPTERS = "/elearning/creating/chapters";
export const ELEARNING_CREATING_DOCS = "/elearning/creating/docs";
export const ELEARNING_CREATING_EXERCISES = "/elearning/creating/exercises";
export const ELEARNING_CREATING_GENERAL = "/elearning/creating/general";
export const ELEARNING_CREATING_LESSONS = "/elearning/creating/lessons";
export const ELEARNING_CREATING_QUESTIONS = "/elearning/creating/questions";
export const ELEARNING_PUBLIC_RELATED = "/elearning/public/related";
export const ELEARNING_PUBLIC_SUBJECT = "/elearning/public/subject";

/**
 * STUDY
 */
export const STUDY_ELEARNING = `/study/elearning`;

/**
 * SCHOOL
 */
export const SCHOOL_CLASSES = `/school/classes`;
export const SCHOOL_PROFESSIONAL = `/school/professional`;
export const SCHOOL_STUDENT = `/school/students`;
export const SCHOOL_TEACHER = `/school/teachers`;