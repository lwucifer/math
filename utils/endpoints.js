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
export const CHECK_EMAIL = `${SCHOOLLY_ALIAS}/social/api/user/checkEmail`;
export const VERIFY_OTP_EMAIL = `${SCHOOLLY_ALIAS}/social/api/user/verifyOtp`;
export const UPDATE_PHONE = `${SCHOOLLY_ALIAS}/social/api/user/updatePhone`;

/**
 * SOCIALS
 */
export const FEED = `${SCHOOLLY_ALIAS}/social/api/feed`;
export const POSTS = `${SCHOOLLY_ALIAS}/social/api/post`;
export const LIKES = `${SCHOOLLY_ALIAS}/social/api/like`;
export const SHARES = `${SCHOOLLY_ALIAS}/social/shares`;
export const COMMENTS = `${SCHOOLLY_ALIAS}/social/api/comment`;
export const MEDIAS = `${SCHOOLLY_ALIAS}/social/medias`;
export const NOTIFICATIONS = `${SCHOOLLY_ALIAS}/social/notifications`;
export const SOCIAL_CONFIG = `${SCHOOLLY_ALIAS}/social/api/config`;
export const SOCIAL_LABEL = `${SCHOOLLY_ALIAS}/social/api/label`;
export const SOCIAL_FRIEND = `${SCHOOLLY_ALIAS}/social/api/friend`;
export const SOCIAL_FRIEND_INVITE = `${SCHOOLLY_ALIAS}/social/api/friend/invite`;

/**
 * ELEARNING
 */
export const ELEARNING_PUBLIC_SUMMARY = `${SCHOOLLY_ALIAS}/elearning/public/summary`;
export const ELEARNING_PUBLIC_ELEARNING_TEACHER = `${SCHOOLLY_ALIAS}/elearning/public/elearning/teacher`;
export const ELEARNING_PUBLIC_CATEGORY = `${SCHOOLLY_ALIAS}/elearning/public/school/categories`;
export const ELEARNING_PUBLIC_INFO = `${SCHOOLLY_ALIAS}/elearning/public/info`;
export const ELEARNING_PUBLIC_VOTE = `${SCHOOLLY_ALIAS}/elearning/public/votes`;
export const ELEARNING_PUBLIC_PLACE_DISTRICTS = `${SCHOOLLY_ALIAS}/elearning/public/place/districts`;
export const ELEARNING_PUBLIC_PLACE_PROVINCES = `${SCHOOLLY_ALIAS}/elearning/public/place/provinces`;
export const ELEARNING_PUBLIC_PLACE_WARDS = `${SCHOOLLY_ALIAS}/elearning/public/place/wards`;
export const ELEARNING_PUBLIC_PROGRAM = `${SCHOOLLY_ALIAS}/elearning/public/program`;
export const ELEARNING_CREATING_ANSWERS = `${SCHOOLLY_ALIAS}/elearning/creating/answers`;
export const ELEARNING_CREATING_CHAPTERS = `${SCHOOLLY_ALIAS}/elearning/creating/chapters`;
export const ELEARNING_CREATING_DOCS = `${SCHOOLLY_ALIAS}/elearning/creating/docs`;
export const ELEARNING_CREATING_EXERCISES = `${SCHOOLLY_ALIAS}/elearning/creating/exercises`;
export const ELEARNING_CREATING_GENERAL = `${SCHOOLLY_ALIAS}/elearning/creating/general`;
export const ELEARNING_CREATING_LESSONS = `${SCHOOLLY_ALIAS}/elearning/creating/lessons`;
export const ELEARNING_CREATING_QUESTIONS = `${SCHOOLLY_ALIAS}/elearning/creating/questions`;
export const ELEARNING_PUBLIC_RELATED = `${SCHOOLLY_ALIAS}/elearning/public/related`;
export const ELEARNING_PUBLIC_SUBJECT = `${SCHOOLLY_ALIAS}/elearning/public/subjects`;
export const ELEARNING_PUBLIC_LEVEL = `${SCHOOLLY_ALIAS}/elearning/public/levels`;
export const ELEARNING_TEACHING_REPOSITORY_FILE = `${SCHOOLLY_ALIAS}/elearning/teaching/repository/files`;
export const ELEARNING_CREATING_SETTING = `${SCHOOLLY_ALIAS}/elearning/creating/setting`;

/**
 * STUDY
 */
export const STUDY_ELEARNING = `${SCHOOLLY_ALIAS}/study/elearning`;
export const STUDY_MY_ELEARNING = `${SCHOOLLY_ALIAS}/study`;
export const STUDY_FAVOURITE = `${SCHOOLLY_ALIAS}/elearning/study/favourite`;
export const STUDY_VOTE = `${SCHOOLLY_ALIAS}/study/votes`;

/**
 * SCHOOL
 */
export const SCHOOL_CLASSES = `${SCHOOLLY_ALIAS}/elearning/school/admin/classes`;
export const SCHOOL_SUMMARY = `${SCHOOLLY_ALIAS}/elearning/school/summary`;
export const SCHOOL_SEARCH = `${SCHOOLLY_ALIAS}/elearning/school/search`;
export const SCHOOL_INFO = `${SCHOOLLY_ALIAS}/elearning/school/info`;
export const SCHOOL_ELEARNING = `${SCHOOLLY_ALIAS}/elearning/school/elearnings`;
export const SCHOOL_PROFESSIONAL = `${SCHOOLLY_ALIAS}/elearning/school/admin/professional`;
export const SCHOOL_STUDENT = `${SCHOOLLY_ALIAS}/elearning/school/admin/students`;
export const SCHOOL_TEACHER = `${SCHOOLLY_ALIAS}/elearning/school/admin/teachers`;

/**
 * MESSAGE
 */
export const GROUP_ADD_MEMBER = `${SCHOOLLY_ALIAS}/social/api/room/addMember`;
export const GROUP_AVATAR = `${SCHOOLLY_ALIAS}/social/api/room/avatar`;
export const GROUP_NAME = `${SCHOOLLY_ALIAS}/social/api/room/name`;
export const GROUP = `${SCHOOLLY_ALIAS}/social/api/room`;
export const GROUP_MEMBER = `${SCHOOLLY_ALIAS}/social/api/room/getMember`;
export const GROUP_LEAVE = `${SCHOOLLY_ALIAS}/social/api/room/leaveGroup`;
export const GROUP_REMOVE_MEMBER = `${SCHOOLLY_ALIAS}/social/api/room/removeMember`;
export const GROUP_NOTIFICATION = `${SCHOOLLY_ALIAS}/social/api/room/settingNotification`;
export const MESSAGE = `${SCHOOLLY_ALIAS}/social/api/message`;