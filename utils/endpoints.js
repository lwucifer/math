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
export const ACCOUNT_PROFILE = `${SCHOOLLY_ALIAS}/user/account/profile`;
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
export const SHARES = `${SCHOOLLY_ALIAS}/social/api/share`;
export const COMMENTS = `${SCHOOLLY_ALIAS}/social/api/comment`;
export const MEDIAS = `${SCHOOLLY_ALIAS}/social/medias`;
export const NOTIFICATIONS = `${SCHOOLLY_ALIAS}/social/api/notification`;
export const SOCIAL_CONFIG = `${SCHOOLLY_ALIAS}/social/api/config`;
export const SOCIAL_LABEL = `${SCHOOLLY_ALIAS}/social/api/label`;
export const SOCIAL_FRIEND = `${SCHOOLLY_ALIAS}/social/api/friend`;
export const SOCIAL_FRIEND_INVITE = `${SCHOOLLY_ALIAS}/social/api/friend/invite`;
export const SOCIAL_POST_PHOTO = `${SCHOOLLY_ALIAS}/social/api/post/photo`;
export const SOCIAL_POST_TAG_PHOTO = `${SCHOOLLY_ALIAS}/social/aip/post/tagPhoto`;
export const SOCIAL_FOLLOW = `${SCHOOLLY_ALIAS}/social/api/follow`;
export const SOCIAL_SCRAPER = `${SCHOOLLY_ALIAS}/social/api/openGraphScraper`;
export const REGISTER_DEVICE = `${SCHOOLLY_ALIAS}/social/api/device`;

/**
 * ELEARNING
 */
export const ELEARNING_PUBLIC_SUMMARY = `${SCHOOLLY_ALIAS}/elearning/public/summary`;
export const ELEARNING_PUBLIC_TEACHER_ELS = `${SCHOOLLY_ALIAS}/elearning/public/teacher_els`;
export const ELEARNING_PUBLIC_ELEARNING_TEACHER = `${SCHOOLLY_ALIAS}/elearning/public/elearning/teacher`;
export const ELEARNING_PUBLIC_CATEGORY = `${SCHOOLLY_ALIAS}/elearning/public/school/categories`;
export const ELEARNING_PUBLIC_INFO = `${SCHOOLLY_ALIAS}/elearning/public/info`;
export const ELEARNING_PUBLIC_VOTE = `${SCHOOLLY_ALIAS}/elearning/public/votes`;
export const ELEARNING_PUBLIC_PLACE_DISTRICTS = `${SCHOOLLY_ALIAS}/elearning/public/place/districts`;
export const ELEARNING_PUBLIC_PLACE_PROVINCES = `${SCHOOLLY_ALIAS}/elearning/public/place/provinces`;
export const ELEARNING_PUBLIC_PLACE_WARDS = `${SCHOOLLY_ALIAS}/elearning/public/place/wards`;
export const ELEARNING_PUBLIC_PROGRAM = `${SCHOOLLY_ALIAS}/elearning/public/program`;
export const ELEARNING_VOTED_ELEARNING = `${SCHOOLLY_ALIAS}/elearning/public/voted_elearnings`;
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
export const ELEARNING_TEACHING_REPOSITORY = `${SCHOOLLY_ALIAS}/elearning/teaching/repository`;
export const ELEARNING_TEACHING_EXERCISE = `${SCHOOLLY_ALIAS}/elearning/teaching/elearning/exercises`;
export const ELEARNING_TEACHING_TEST = `${SCHOOLLY_ALIAS}/elearning/teaching/elearning/exercises`;
export const ELEARNING_TEACHING_VOTE = `${SCHOOLLY_ALIAS}/elearning/teaching/votes`;
export const ELEARNING_TEACHING_EXERCISE_ELEARNING = `${SCHOOLLY_ALIAS}/elearning/teaching/exercise_elearnings`;
export const ELEARNING_TEACHING_EXERCISE_PARTICIPANT = `${SCHOOLLY_ALIAS}/elearning/teaching/exercise/participants`;
export const ELEARNING_TEACHING_RESULT = `${SCHOOLLY_ALIAS}/elearning/teaching/exercise/result`;
export const ELEARNING_TEACHING_EVALUATION = `${SCHOOLLY_ALIAS}/elearning/teaching/result/evaluate`;
export const ELEARNING_CREATING_SETTING = `${SCHOOLLY_ALIAS}/elearning/creating/setting`;
export const ELEARNING_CREATING_PROGRESS = `${SCHOOLLY_ALIAS}/elearning/creating/progress`;
export const ELEARNING_PUBLIC_SEARCH = `${SCHOOLLY_ALIAS}/elearning/public/search`;
export const ELEARNING_CREATING_PUBLISH = `${SCHOOLLY_ALIAS}/elearning/creating/publish`;

/**
 * ONLINE CLASS
 */
export const TEACHING_OLCLASSES = `${SCHOOLLY_ALIAS}/elearning/teaching/olclasses`;
export const TEACHING_OLCLASS = `${SCHOOLLY_ALIAS}/elearning/teaching/olclass`;
export const TEACHING_OLCLASS_INVITES = `${SCHOOLLY_ALIAS}/elearning/teaching/olclass/invites`;
export const TEACHING_OLCLASS_BLOCK = `${SCHOOLLY_ALIAS}/elearning/teaching/olclass/banned`;
export const TEACHING_OLCLASS_LESSONS = `${SCHOOLLY_ALIAS}/elearning/teaching/olclass/lessons`;
export const TEACHING_OLCLASS_LESSON = `${SCHOOLLY_ALIAS}/elearning/teaching/olclass/lesson`;
export const TEACHING_OLCLASS_LESSON_ATTENDANCES = `${SCHOOLLY_ALIAS}/elearning/teaching/olclass/lesson/attendances`;

/**
 * STUDY
 */
export const STUDY_ELEARNING = `${SCHOOLLY_ALIAS}/study/elearning`;
export const STUDY_MY_ELEARNING = `${SCHOOLLY_ALIAS}/study`;
export const STUDY_FAVOURITE = `${SCHOOLLY_ALIAS}/elearning/study/favourite`;
export const STUDY_VOTE = `${SCHOOLLY_ALIAS}/elearning/study/votes`;
export const STUDY_ARCHIVE = `${SCHOOLLY_ALIAS}/elearning/study/archive`;

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
export const GROUP_DETAIL = `${SCHOOLLY_ALIAS}/social/api/room/getDetail`;
export const MESSAGE_SEND_IMG = `${SCHOOLLY_ALIAS}/social/api/message/uploadImg`;
export const LIMIT_MESSAGES = `${SCHOOLLY_ALIAS}/social/api/message/getLimit`;
export const MESSAGE_TYPE = `${SCHOOLLY_ALIAS}/social/api/message/getViaRoomType`;
export const MESSAGE_SEND_FILE = `${SCHOOLLY_ALIAS}/social/api/message/uploadFile`;

/**
 * TEACHING
 */
export const TEACHING_SUMMARY = `${SCHOOLLY_ALIAS}/elearning/teaching/summary`;
export const TEACHING_ELEARNINGS = `${SCHOOLLY_ALIAS}/elearning/teaching/elearnings`;
export const TEACHING_ELEARNING_HIDES = `${SCHOOLLY_ALIAS}/elearning/teaching/elearnings/hides`;
export const TEACHING_EXCERCISE = `${SCHOOLLY_ALIAS}/elearning/teaching/excercises`;
export const TEACHING_REPOSITORY = `${SCHOOLLY_ALIAS}/elearning/teaching/repository`;
export const TEACHING_ONLINE_CLASS = `${SCHOOLLY_ALIAS}/elearning/teaching/olclass`;
export const TEACHING_INTERACTIVE = `${SCHOOLLY_ALIAS}/elearning/teaching/interactive/questions`;
export const TEACHING_STUDENTS = `${SCHOOLLY_ALIAS}/elearning/teaching/students`;
export const TEACHING_INVITE = `${SCHOOLLY_ALIAS}/elearning/teaching/invites`;
export const TEACHING_VOTES = `${SCHOOLLY_ALIAS}/elearning/teaching/votes`;

/**
 * PAYMENT
 */
export const PAYMENT_CREATE_ORDER = `${SCHOOLLY_ALIAS}/elearning/order`;
export const PAYMENT_HASHKEY = `${SCHOOLLY_ALIAS}/payment/transaction/hashkey/generate`;
export const PAYMENT_VALIDATE_TRANSACTION = `${SCHOOLLY_ALIAS}/payment/transaction/validate`;


/**
 * CART
 */
export const CART_LIST = `${SCHOOLLY_ALIAS}/elearning/cart`;



export const TEACHING_STATISTIC_REVENUE = `${SCHOOLLY_ALIAS}/elearning/teaching/statistic/revenue`;
