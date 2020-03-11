import { GROUP_MEMBER } from "./endpoints";

export const BASE = {
    LIST: "list",
    ADD: "add",
    EDIT: "edit",
    DELETE: "delete",
    DETAIL: "detail",
    EDIT_PAYLOAD: "editPayload"
};

export const AUTH = {
    LOGIN: "login",
    REGISTER: "register",
    LOGOUT: "logout",
    SENDOTP: "sendotp",
    STATUS: "status",
    FORGOT_PASSWORD: "forgotPassword",
    CHANGE_PASSWORD: "changePassword",
    VERIFY_OTP: "verifiOtp",
    RESET_PASSWORD_REQUEST: "resetPasswordRequest",
    VERIFY_EMAIL: "verifyEmail",
    REFRESH_TOKEN: "refreshToken"
};

export const SOCIAL_POST = {
    LIST: "socialPostsList",
    ADD: "socialPostsAdd",
    EDIT: "socialPostsEdit",
    DELETE: "socialPostsDelete"
};

export const SOCIAL_LIKES = {
    LIST: "socialLikesList",
    ADD: "socialLikesAdd",
    DELETE: "socialLikesDelete",
    LIKE_POST: "socialLikesLikePost"
};

export const SOCIAL_SHARES = {
    LIST: "socialSharesList"
};

export const SOCIAL_COMMENTS = {
    LIST: "socialCommentsList",
    LIST_CHILDREN: "socialCommentListChildren"
};

export const SOCIAL_MEDIAS = {
    LIST: "socialMediasList"
};

export const SOCIAL_NOTIFICATIONS = {
    LIST: "socialNotifications"
};

export const SOCIAL_CONFIG = {
    LIST: "socialConfigList"
};

export const SOCIAL_FEEDS = {
    LIST: "socialFeedsList"
};

export const SOCIAL_LABEL = {
    LIST: "socialLabelList"
};

export const ACCOUNT_PERSONAL = {
    LIST: "accountPersonalList",
    EDIT: "accountPersonalEdit",
    EDIT_AVATAR: "accountPersonalEditAvatar",
    EDIT_COVER: "accountPersonalEditCover",
    EDIT_PHONE: "accountPersonalEditPhone",
    EDIT_EMAIL: "accountPersonalEditEmail",
    VERIFY_OTP_EMAIL: "verifyOtpEmail",
    UPDATE_PHONE: "accountPersonalUpdatePhone"
};

export const ACCOUNT_LINK = {
    LIST: "accountLinkList",
    ADD: "accountLinkAdd"
};

export const ACCOUNT_TRANSACTIONS = {
    LIST: "accountTransactionList"
};

export const ACCOUNT_REVENUE = {
    LIST: "accountRevenueList"
};

export const ACCOUNT_EARNING = {
    LIST: "accountEarningList"
};

export const ELEARNING_PUBLIC_SUMMARY = {
    LIST: "elearningPublicSummaryList"
};

export const ELEARNING_PUBLIC_CATEGORY = {
    LIST: "elearningPublicCategoryList"
};

export const ELEARNING_PUBLIC_ELEARNING_TEACHER = {
    LIST: "elearningPublicElearningTeacherList"
};

export const ELEARNING_PUBLIC_INFO = {
    LIST: "elearningPublicInfoList"
};

export const ELEARNING_PUBLIC_VOTE = {
    LIST: "elearningPublicVoteList"
};

export const ELEARNING_PUBLIC_PLACE = {
    PROVINCE: "elearningPublicPlaceProvince",
    DISTRICT: "elearningPublicPlaceDistrict",
    WARD: "elearningPublicPlaceWard"
};

export const ELEARNING_PUBLIC_PROGRAM = {
    LIST: "elearningPublicProgramList"
};

export const ELEARNING_PUBLIC_RELATED = {
    LIST: "elearningPublicRelatedList"
};

export const ELEARNING = {
    INFO: "elearningInfo",
    PROGRAM: "elearningProgram",
    RELATED: "elearningPublicRelated",
    SUBJECT: "elearningPublicSubject",
    LEVEL: "elearningPublicLevel"
};

export const CREATING_ANSWER = {
    LIST: "creatingAnswerList",
    ADD: "creatingAnswerAdd",
    EDIT: "creatingAnswerEdit",
    DELETE: "creatingAnswerDelete"
};

export const CREATING_CHAPTER = {
    LIST: "creatingChapterList",
    ADD: "creatingChapterAdd",
    EDIT: "creatingChapterEdit",
    DELETE: "creatingChapterDelete"
};
export const ELEARNING_CREATING_ANSWER = {
    LIST: "elearningCreatingAnswerList",
    ADD: "elearningCreatingAnswerAdd",
    EDIT: "elearningCreatingAnswerEdit",
    DELETE: "elearningCreatingAnswerDelete"
};

export const ELEARNING_CREATING_CHAPTER = {
    LIST: "elearningCreatingChapterList",
    ADD: "elearningCreatingChapterAdd",
    EDIT: "elearningCreatingChapterEdit",
    DELETE: "elearningCreatingChapterDelete"
};

export const ELEARNING_CREATING_DOC = {
    LIST: "elearningCreatingDocList",
    ADD: "elearningCreatingDocAdd",
    EDIT: "elearningCreatingDocEdit",
    DELETE: "elearningCreatingDocDelete"
};

export const ELEARNING_CREATING_EXERCISES = {
    LIST: "elearningCreatingExercisesList",
    ADD: "elearningCreatingExercisesAdd",
    EDIT: "elearningCreatingExercisesEdit",
    DELETE: "elearningCreatingExercisesDelete"
};

export const ELEARNING_CREATING_GENERAL = {
    LIST: "elearningCreatingGeneralList",
    ADD: "elearningCreatingGeneralAdd",
    EDIT: "elearningCreatingGeneralEdit",
    DELETE: "elearningCreatingGeneralDelete"
};

export const ELEARNING_CREATING_LESSONS = {
    LIST: "elearningCreatingLessonsList",
    ADD: "elearningCreatingLessonsAdd",
    EDIT: "elearningCreatingLessonsEdit",
    DELETE: "elearningCreatingLessonsDelete"
};

export const ELEARNING_CREATING_QUESTIONS = {
    LIST: "elearningCreatingQuestionsList",
    ADD: "elearningCreatingQuestionsAdd",
    EDIT: "elearningCreatingQuestionsEdit",
    DELETE: "elearningCreatingQuestionsDelete"
};

export const STUDY = {
    ELEARNING: "studyElearningList"
};

export const SCHOOL_CLASSES = {
    LIST: "schoolClassesList",
    ADD: "schoolClassesAdd",
    EDIT: "schoolClassesEdit",
    DELETE: "schoolClassesDelete"
};

export const SCHOOL_INFO = {
    INFO: "schoolInfo"
};

export const SCHOOL_ELEARNING = {
    LIST: "schoolElearning"
};

export const SCHOOL_PROFESSIONAL = {
    LIST: "schoolProfessionalList",
    ADD: "schoolProfessionalAdd",
    EDIT: "schoolProfessionalEdit",
    DELETE: "schoolProfessionalDelete"
};

export const SCHOOL_STUDENTS = {
    LIST: "schoolStudentsList",
    ADD: "schoolStudentsAdd",
    EDIT: "schoolStudentsEdit",
    DELETE: "schoolStudentsDelete"
};

export const SCHOOL_TEACHERS = {
    LIST: "schoolTeachersList",
    ADD: "schoolTeachersAdd",
    EDIT: "schoolTeachersEdit",
    DELETE: "schoolTeachersDelete"
};

export const ELEARNING_STURY = {
    LIST: "elearningStudyList"
};

export const ELEARNING_STURY_FAVOURITE = {
    LIST: "elearningStudyFavouriteList",
    ADD: "elearningStudyFavouriteAdd",
    DELETE: "elearningStudyFavouriteDelete"
};

export const ELEARNING_STURY_VOTE = {
    LIST: "elearningStudyVoteList",
    ADD: "elearningStudyVoteAdd"
};

export const ELEARNING_SCHOOL_SUMMARY = {
    LIST: "elearningSchoolSummaryList"
};

export const ELEARNING_SCHOOL_SEARCH = {
    LIST: "elearningSchoolSearchList"
};

export const MESSAGE_GROUP = {
    ADD_MEMBER: "addMember",
    EDIT_AVATAR: "editAvatar",
    EDIT_NAME: "editName",
    CREATE_GROUP: "createGroup",
    MEMBER_LIST: "memberList",
    GROUP_LIST: "groupList",
    GROUP_LEAVE: "groupLeave",
    GROUP_REMOVE_MEMBER: "groupRemoveMember",
    GROUP_NOTIFICATION: "groupNotification"
};