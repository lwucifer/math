/********************************
 * AUTH APIs
 *********************************/
// export const SCHOOLLY_ALIAS = `/schoolly-api`
export const SCHOOLLY_ALIAS = ``;
export const LOGIN = `/user/public/login`;
export const REGISTER = `/user/public/register`;
export const REGISTER_VALIDATE = `/user/public/validate`;
export const LOGOUT = `/user/account/logout`;
export const AUTH_INFO = `/auth/info`;
export const SEND_OTP = `/auth/otp`;
export const CHECK_PHONE = `/user/public/validate`;
export const FORGOT_PASSWORD = `/user/public/resetpwd`;
export const RESET_PASSWORD_REQUEST = `/user/public/resetpwd/request`;
export const CHANGE_PASSWORD = `/user/account/changepwd`;
export const ACCOUNT_PERSONAL = `/social/api/user/profile`;
export const ACCOUNT_PROFILE = `/user/account/profile`;
export const ACCOUNT_LINK = `/user/account/link`;
export const ACCOUNT_PHONE = `/account/phone`;
export const ACCOUNT_TRANSACTIONS = `/user/account/transactions`;
export const ACCOUNT_REVENUE = `/user/account/revenue`;
export const ACCOUNT_EARNING = `/user/account/earning`;
export const ACCOUNT_HISTORY_WITHDRAWALS = `/user/account/withdrawals`;
export const VERIFY_EMAIL = `user/public/verify`;
export const REFRESH_TOKEN = `user/public/renew`;
export const UPDATE_AVATAR = `/social/api/user/updateAvatar`;
export const UPDATE_COVER = `/social/api/user/updateCover`;
export const CHECK_EMAIL = `/social/api/user/checkEmail`;
export const VERIFY_OTP_EMAIL = `/social/api/user/verifyOtp`;
export const UPDATE_PHONE = `/social/api/user/updatePhone`;

/**
 * SOCIALS
 */
export const FEED = `/social/api/feed`;
export const POSTS = `/social/api/post`;
export const LIKES = `/social/api/like`;
export const SHARES = `/social/api/share`;
export const COMMENTS = `/social/api/comment`;
export const MEDIAS = `/social/medias`;
export const NOTIFICATIONS = `/social/api/notification`;
export const SOCIAL_CONFIG = `/social/api/config`;
export const SOCIAL_LABEL = `/social/api/label`;
export const SOCIAL_FRIEND = `/social/api/friend`;
export const SOCIAL_FRIEND_INVITE = `/social/api/friend/invite`;
export const SOCIAL_POST_PHOTO = `/social/api/post/photo`;
export const SOCIAL_POST_TAG_PHOTO = `/social/aip/post/tagPhoto`;
export const SOCIAL_FOLLOW = `/social/api/follow`;
export const SOCIAL_SCRAPER = `/social/api/openGraphScraper`;
export const REGISTER_DEVICE = `/social/api/device`;
export const NOTIFICATION_UNREAD = `/social/api/notification/unRead`;

/**
 * ELEARNING
 */
export const ELEARNING_PUBLIC_SUMMARY = `/elearning/public/summary`;
export const ELEARNING_PUBLIC_TEACHER_ELS = `/elearning/public/teacher_els`;
export const ELEARNING_PUBLIC_ELEARNING_TEACHER = `/elearning/public/elearning/teacher`;
export const ELEARNING_PUBLIC_CATEGORY = `/elearning/public/school/categories`;
export const ELEARNING_PUBLIC_INFO = `/elearning/public/info`;
export const ELEARNING_PUBLIC_VOTE = `/elearning/public/votes`;
export const ELEARNING_PUBLIC_PLACE_DISTRICTS = `/elearning/public/place/districts`;
export const ELEARNING_PUBLIC_PLACE_PROVINCES = `/elearning/public/place/provinces`;
export const ELEARNING_PUBLIC_PLACE_WARDS = `/elearning/public/place/wards`;
export const ELEARNING_PUBLIC_PROGRAM = `/elearning/public/program`;
export const ELEARNING_VOTED_ELEARNING = `/elearning/public/voted_elearnings`;
export const ELEARNING_CREATING_ANSWERS = `/elearning/creating/answers`;
export const ELEARNING_CREATING_CHAPTERS = `/elearning/creating/chapters`;
export const ELEARNING_CREATING_DOCS = `/elearning/creating/docs`;
export const ELEARNING_CREATING_EXERCISES = `/elearning/creating/exercises`;
export const ELEARNING_CREATING_GENERAL = `/elearning/creating/general`;
export const ELEARNING_CREATING_LESSONS = `/elearning/creating/lessons`;
export const ELEARNING_CREATING_QUESTIONS = `/elearning/creating/questions`;
export const ELEARNING_PUBLIC_RELATED = `/elearning/public/related`;
export const ELEARNING_PUBLIC_SUBJECT = `/elearning/public/subjects`;
export const ELEARNING_PUBLIC_LEVEL = `/elearning/public/levels`;
export const ELEARNING_PUBLIC_SCHOOL_YEAR = `/elearning/public/school-year`;
export const ELEARNING_TEACHING_REPOSITORY_FILE = `/elearning/teaching/repository/files`;
export const ELEARNING_TEACHING_REPOSITORY = `/elearning/teaching/repository`;
export const ELEARNING_TEACHING_EXERCISE = `/elearning/teaching/elearning/exercises`;
export const ELEARNING_TEACHING_TEST = `/elearning/teaching/elearning/exercises`;
export const ELEARNING_TEACHING_VOTE = `/elearning/teaching/votes`;
export const ELEARNING_TEACHING_EXERCISE_ELEARNING = `/elearning/teaching/exercise_elearnings`;
export const ELEARNING_TEACHING_EXERCISE_PARTICIPANT = `/elearning/teaching/exercise/participants`;
export const ELEARNING_TEACHING_RESULT = `/elearning/teaching/exercise/result`;
export const ELEARNING_TEACHING_EVALUATION = `/elearning/teaching/result/evaluate`;
export const ELEARNING_TEACHING_CLASS = `/elearning/teaching/classes`;
export const ELEARNING_CREATING_SETTING = `/elearning/creating/setting`;
export const ELEARNING_CREATING_PROGRESS = `/elearning/creating/progress`;
export const ELEARNING_PUBLIC_SEARCH = `/elearning/public/search`;
export const ELEARNING_CREATING_PUBLISH = `/elearning/creating/publish`;
export const ELEARNING_JOIN = `/elearning/join`;

/**
 * ONLINE CLASS
 */
export const TEACHING_OLCLASSES = `/elearning/teaching/olclasses`;
export const TEACHING_OLCLASS = `/elearning/teaching/olclass`;
export const TEACHING_OLCLASS_LESSON_SESSIONS = `/elearning/teaching/olclasses/lesson/sessions`;
export const TEACHING_OLCLASS_INVITES = `/elearning/teaching/olclass/invites`;
export const TEACHING_OLCLASS_BLOCK = `/elearning/teaching/olclass/banned`;
export const TEACHING_OLCLASS_LESSONS = `/elearning/teaching/olclass/lessons`;
export const TEACHING_OLCLASS_LESSON = `/elearning/teaching/olclass/lesson`;
export const TEACHING_OLCLASS_LESSON_ATTENDANCES = `/elearning/teaching/olclass/lesson/attendances`;

/**
 * STUDY
 */
export const STUDY_ELEARNING = `/study/elearning`;
export const STUDY_MY_ELEARNING = `/study`;
export const STUDY_FAVOURITE = `/elearning/study/favourite`;
export const STUDY_VOTE = `/elearning/study/votes`;
export const STUDY_ARCHIVE = `/elearning/study/archive`;
export const STUDY_INFO = `/elearning/study/elearning/info`;
export const STUDY_INTERACTIVE_QUESTION = `/elearning/study/interactive/questions`;
export const STUDY_INTERACTIVE_QUESTION_ADD = `/elearning/study/interactive/question`;
export const STUDY_ELEARNING_PROGRESS = `/elearning/study/elearning/progress`;
export const STUDY_QUESTION_LIKE = `/elearning/study/interactive/question/like`;
export const STUDY_QUESTION_ADD_ANSWER = `/elearning/study/interactive/answer`;
export const STUDY_QUESTION_LIKE_ANSWER = `/elearning/study/interactive/answer/like`;

export const STUDY_EXERCISE_QUESTIONS = `/elearning/study/exercise/questions`;
export const STUDY_EXERCISE_RESULT = `/elearning/study/exercise/result`;
export const STUDY_EXERCISE_SUBMISSION = `/elearning/study/exercise/submission`;

/**
 * SCHOOL
 */
export const SCHOOL_CLASSES = `/elearning/school/admin/classes`;
export const SCHOOL_SUMMARY = `/elearning/school/summary`;
export const SCHOOL_SEARCH = `/elearning/school/search`;
export const SCHOOL_INFO = `/elearning/school/info`;
export const SCHOOL_ELEARNING = `/elearning/school/elearnings`;
export const SCHOOL_PROFESSIONAL = `/elearning/school/admin/professional`;
export const SCHOOL_STUDENT = `/elearning/school/admin/students`;
export const SCHOOL_TEACHER = `/elearning/school/admin/teachers`;

/**
 * MESSAGE
 */
export const GROUP_ADD_MEMBER = `/social/api/room/addMember`;
export const GROUP_AVATAR = `/social/api/room/avatar`;
export const GROUP_NAME = `/social/api/room/name`;
export const GROUP = `/social/api/room`;
export const GROUP_MEMBER = `/social/api/room/getMember`;
export const GROUP_LEAVE = `/social/api/room/leaveGroup`;
export const GROUP_REMOVE_MEMBER = `/social/api/room/removeMember`;
export const GROUP_NOTIFICATION = `/social/api/room/settingNotification`;
export const MESSAGE = `/social/api/message`;
export const GROUP_DETAIL = `/social/api/room/getDetail`;
export const MESSAGE_SEND_IMG = `/social/api/message/uploadImg`;
export const LIMIT_MESSAGES = `/social/api/message/getLimit`;
export const MESSAGE_TYPE = `/social/api/message/getViaRoomType`;
export const MESSAGE_SEND_FILE = `/social/api/message/uploadFile`;

/**
 * TEACHING
 */
export const TEACHING_SUMMARY = `/elearning/teaching/summary`;
export const TEACHING_ELEARNINGS = `/elearning/teaching/elearnings`;
export const TEACHING_ELEARNING_HIDES = `/elearning/teaching/elearnings/hides`;
export const TEACHING_EXCERCISE = `/elearning/teaching/excercises`;
export const TEACHING_REPOSITORY = `/elearning/teaching/repository`;
export const TEACHING_ONLINE_CLASS = `/elearning/teaching/olclass`;
export const TEACHING_INTERACTIVE = `/elearning/teaching/interactive/questions`;
export const TEACHING_STUDENTS = `/elearning/teaching/students`;
export const TEACHING_INVITE = `/elearning/teaching/invites`;
export const TEACHING_VOTES = `/elearning/teaching/votes`;

/**
 * PAYMENT
 */
export const PAYMENT_CREATE_ORDER = `/elearning/order`;
export const PAYMENT_HASHKEY = `/elearning/payment/transaction/hashkey/generate`;
export const PAYMENT_VALIDATE_TRANSACTION = `/elearning/payment/transaction/validate`;

/**
 * CART
 */
export const CART_LIST = `/elearning/cart`;

export const TEACHING_STATISTIC_REVENUE = `/elearning/teaching/statistic/revenue`;
/**
 * BANK
 */
export const PUBLIC_BANK = `/user/public/banks`;
export const ACCOUNT_BANK = `/user/account/banks`;
export const ACCOUNT_BANK_VALIDATE = `/user/account/banks/validate`;