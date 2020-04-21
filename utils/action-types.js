import { GROUP_MEMBER } from "./endpoints";

export const BASE = {
    LIST: "list",
    ADD: "add",
    EDIT: "edit",
    DELETE: "delete",
    DETAIL: "detail",
    EDIT_PAYLOAD: "editPayload",
    DELETE_PAYLOAD: "deletePayload"
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
    DELETE: "socialLikesDelete"
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

export const ACCOUNT_PROFILE = {
    LIST: "accountProfileList"
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

export const ELEARNING_PUBLIC_SEARCH = {
    DETAIL: "elearningPublicElearningDetail",
};

export const ELEARNING_PUBLIC_VOTED_ELEARNING = {
    LIST: "elearningPublicVotedElearning"
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

export const TEACHING_OLCLASSES = {
    LIST: "teachingOlclassesList",
    ADD: "teachingOlclassesAdd",
    EDIT: "teachingOlclassesEdit",
    DELETE: "teachingOlclassesDelete",
    BLOCK: "teachingOlclassesBlock",
    UNBLOCK: "teachingOlclassesUnBlock"
};

export const TEACHING_OLCLASS_INVITES = {
    LIST: "teachingOlclassInvitesList",
    ADD: "teachingOlclassInvitesAdd",
    EDIT: "teachingOlclassInvitesEdit",
}

export const TEACHING_OLCLASS_LESSONS = {
    LIST: "teachingOlclassLessonsList"
}
export const TEACHING_OLCLASS_LESSON_ATTENDANCES = {
    LIST: "teachingOlclassLessonAttendancesList",
    EDIT: "teachingOlclassLessonAttendancesEdit"
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

export const ELEARNING_CREATING_PROGRESS = "ELEARNING_CREATING_PROGRESS";

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

export const ELEARNING_TEACHING_REPOSITORY_FILE = {
    LIST: "elearningTeachingRepositoryFileList",
    ADD: "elearningTeachingRepositoryFileAdd",
    DELETE: "elearningTeachingRepositoryFileDelete"
};

export const ELEARNING_TEACHING_REPOSITORY = {
    INFO: "elearningTeachingRepositoryFileInfo"
};

export const REPOSITORY = {
    INFO: "info"
};

export const ELEARNING_TEACHING_EXERCISE_ELEARNING = {
    LIST: "elearningTeachingExerciseElearningList",
};

export const ELEARNING_TEACHING_EXERCISE = {
    LIST: "elearningTeachingExerciseList",
    DETAIL: "elearningTeachingExerciseDetail",
};

export const ELEARNING_TEACHING_EXERCISE_PARTICIPANT = {
    LIST: "elearningTeachingExerciseParticipantList",
};

export const ELEARNING_TEACHING_TEST = {
    LIST: "elearningTeachingTestList"
};

export const ELEARNING_TEACHING_SUBMISSION = {
    LIST: "elearningTeachingSubmissionList",
    DETAIL: "elearningTeachingSubmissionDetail",
    MARK: "elearningTeachingSubmissionMark"
};

export const ELEARNING_TEACHING_VOTE = {
    LIST: "elearningTeachingVoteList"
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

export const ELEARNING_CREATING_SETTING = {
    LIST: "elearningCreatingSettingList",
    ADD: "elearningCreatingSettingAdd"
};

export const ELEARNING_CREATING_LESSONS = {
    LIST: "elearningCreatingLessonsList",
    ADD: "elearningCreatingLessonsAdd",
    EDIT: "elearningCreatingLessonsEdit",
    DELETE: "elearningCreatingLessonsDelete",
    DETAIL: "elearningCreatingLessonsDetail"
};

export const ELEARNING_CREATING_PUBLISH = {
    POST: "elearningCreatingPublishPost"
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

export const ELEARNING_STURY_ARCHIVE = {
    LIST: "elearningStudyArchiveList",
    ADD: "elearningStudyArchiveAdd",
    DELETE: "elearningStudyArchiveDelete"
};

export const ELEARNING_SCHOOL_SUMMARY = {
    LIST: "elearningSchoolSummaryList"
};

export const ELEARNING_SCHOOL_SEARCH = {
    LIST: "elearningSchoolSearchList"
};

export const MESSAGE_GROUP = {
    ADD_MEMBER: "addMember",
    EDIT_AVATAR_GROUP: "editAvatarGroup",
    EDIT_NAME: "editName",
    CREATE_GROUP: "createGroup",
    MEMBER_LIST: "getMemberList",
    GROUP_LIST: "getGroupList",
    GROUP_LEAVE: "groupLeave",
    GROUP_REMOVE_MEMBER: "groupRemoveMember",
    GROUP_NOTIFICATION: "groupNotification",
    MESSAGE_LIST: "getMessageList",
    GROUP_LIST_DETAIL: "getGroupListDetail",
    MESSAGE_SEND_IMG: "messageSendImg",
    LIST_MESSAGE_TYPE: "getListMessageType",
    MESSAGE_SEND_FILE: "messageSendFile"
};

export const SOCIAL_FRIEND = {
    LIST: "socialFriendList",
    // LIST: "socialFriendListInvite",
    INVITE_FRIEND: "inviteFriend",
    LIST_INVITE: "getListInvite",
    DELETE_FRIEND: "deleteFriend"
};

export const SOCIAL_PHOTO = {
    POST_PHOTO_LIST: "postPhotoList",
    POST_TAG_PHOTO_LIST: "postTagPhotoList"
};

export const SOCIAL_FOLLOW = {
    CREATE_FOLLOW: "createFollow",
    DELETE_FOLLOW: "deleteFollow"
};

export const TEACHING_SUMMARY = {
    INFO: "teachingSummary"
};
export const TEACHING_ELEARNING = {
    LIST: "teachingElearningList",
    DELETE: "teachingElearningDelete"
};
export const TEACHING_ONLINE_CLASS = {
    LIST: "teachingOnlineCLassList",
    DELETE: "teachingOnlineCLassDelete"
};
export const TEACHING_INTERACTIVE = {
    LIST: "teachingInteractiveList",
    DELETE: "teachingInteractiveDelete"
};
export const TEACHING_STUDENTS = {
    LIST: "teachingStudentsList",
    DELETE: "teachingStudentsDelete"
};