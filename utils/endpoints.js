/********************************
 * AUTH APIs
 *********************************/
// export const SCHOOLLY_ALIAS = `/schoolly-api`
export const SCHOOLLY_ALIAS = ``;
export const LOGIN = `${SCHOOLLY_ALIAS}/user/public/login`;
export const REGISTER = `${SCHOOLLY_ALIAS}/user/public/register`;
export const REGISTER_VALIDATE = `${SCHOOLLY_ALIAS}/user/public/validate`;
export const LOGOUT = `${SCHOOLLY_ALIAS}/auth/logout`;
export const AUTH_INFO = `${SCHOOLLY_ALIAS}/auth/info`;
export const SEND_OTP = `${SCHOOLLY_ALIAS}/auth/otp`;
export const CHECK_PHONE = `${SCHOOLLY_ALIAS}/user/public/validate`;
export const FORGOT_PASSWORD = `${SCHOOLLY_ALIAS}/user/public/resetpwd`;
export const RESET_PASSWORD_REQUEST = `${SCHOOLLY_ALIAS}/user/public/resetpwd/request`;
export const CHANGE_PASSWORD = `${SCHOOLLY_ALIAS}/user/account/changepwd`;
export const ACCOUNT_PERSONAL = `${SCHOOLLY_ALIAS}/social/api/user/profile`;
export const ACCOUNT_LINK = `${SCHOOLLY_ALIAS}/user/account/link`;
export const ACCOUNT_PHONE = `${SCHOOLLY_ALIAS}/account/phone`;
export const ACCOUNT_TRANSACTIONS = `${SCHOOLLY_ALIAS}/account/transactions`;
export const ACCOUNT_REVENUE = `${SCHOOLLY_ALIAS}/account/revenue`;
export const ACCOUNT_EARNING = `${SCHOOLLY_ALIAS}/account/earning`;
export const VERIFY_EMAIL = `${SCHOOLLY_ALIAS}user/public/verify`;
export const REFRESH_TOKEN = `${SCHOOLLY_ALIAS}user/public/renew`;
export const UPDATE_AVATAR = `${SCHOOLLY_ALIAS}/social/api/user/updateAvatar`;
export const UPDATE_COVER = `${SCHOOLLY_ALIAS}/social/api/user/updateCover`;

/**
 * SOCIALS
 */
export const FEED = `${SCHOOLLY_ALIAS}/social/api/feed`;
export const POSTS = `${SCHOOLLY_ALIAS}/social/api/post`;
export const LIKES = `${SCHOOLLY_ALIAS}/social/api/like`;
export const SHARES = `${SCHOOLLY_ALIAS}/social/shares`;
export const COMMENTS = `${SCHOOLLY_ALIAS}/social/comments`;
export const MEDIAS = `${SCHOOLLY_ALIAS}/social/medias`;
export const NOTIFICATIONS = `${SCHOOLLY_ALIAS}/social/notifications`;
export const SOCIAL_CONFIG = `${SCHOOLLY_ALIAS}/social/api/config`;

/**
 * ELEARNING
 */
export const ELEARNING_PUBLIC_SUMMARY = `${SCHOOLLY_ALIAS}/elearning/public/summary`;
export const ELEARNING_PUBLIC_INFO = `${SCHOOLLY_ALIAS}/elearning/public/info`;
export const ELEARNING_PUBLIC_PROGRAM = `${SCHOOLLY_ALIAS}/elearning/public/program`;
export const ELEARNING_CREATING_ANSWERS = `${SCHOOLLY_ALIAS}/elearning/creating/answers`;
export const ELEARNING_CREATING_CHAPTERS = `${SCHOOLLY_ALIAS}/elearning/creating/chapters`;
export const ELEARNING_CREATING_DOCS = `${SCHOOLLY_ALIAS}/elearning/creating/docs`;
export const ELEARNING_CREATING_EXERCISES = `${SCHOOLLY_ALIAS}/elearning/creating/exercises`;
export const ELEARNING_CREATING_GENERAL = `${SCHOOLLY_ALIAS}/elearning/creating/general`;
export const ELEARNING_CREATING_LESSONS = `${SCHOOLLY_ALIAS}/elearning/creating/lessons`;
export const ELEARNING_CREATING_QUESTIONS = `${SCHOOLLY_ALIAS}/elearning/creating/questions`;
export const ELEARNING_PUBLIC_RELATED = `${SCHOOLLY_ALIAS}/elearning/public/related`;
export const ELEARNING_PUBLIC_SUBJECT = `${SCHOOLLY_ALIAS}/elearning/public/subject`;

/**
 * STUDY
 */
export const STUDY_ELEARNING = `${SCHOOLLY_ALIAS}/study/elearning`;
export const STUDY_MY_ELEARNING = `${SCHOOLLY_ALIAS}/study`;
export const STUDY_FAVOURITE = `${SCHOOLLY_ALIAS}/study/favourite`;
export const STUDY_VOTE = `${SCHOOLLY_ALIAS}/study/votes`;

/**
 * SCHOOL
 */
export const SCHOOL_CLASSES = `${SCHOOLLY_ALIAS}/elearning/school/classes`;
export const SCHOOL_SUMMARY = `${SCHOOLLY_ALIAS}/elearning/school/summary`;
export const SCHOOL_SEARCH = `${SCHOOLLY_ALIAS}/elearning/school/search`;
export const SCHOOL_INFO = `${SCHOOLLY_ALIAS}/elearning/school/info`;
export const SCHOOL_PROFESSIONAL = `${SCHOOLLY_ALIAS}/elearning/school/professional`;
export const SCHOOL_STUDENT = `${SCHOOLLY_ALIAS}/elearning/school/students`;
export const SCHOOL_TEACHER = `${SCHOOLLY_ALIAS}/elearning/school/teachers`;