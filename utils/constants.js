export const POST_TYPES = {
    STATUS: 1,
    PHOTO: 2,
    SHARE: 3,
    LINK: 4,
    VIDEO: 5,
};

export const LIKE_SOURCE_TYPES = {
    POST: 1,
    COMMENT: 2,
};

export const LIKE_TYPES = {
    LIKE: 1,
    HAPPY: 2,
    ANGRY: 3,
};

export const APP_INPUT_VALIDATE_STATUS = {
    DEFAULT: 0,
    SUCCESS: 1,
    ERROR: 2,
};

export const SOCIAL_LINK_SCHEMA = {
    type: "",
    url: "",
    image: "",
    title: "",
    description: "",
    updatedTime: "",
    imageWidth: "",
    imageHeight: "",
    videoUrl: "",
    videoSecureUrl: "",
    videoType: "",
    videoWidth: "",
    videoHeight: "",
    videoTag: "",
    siteName: "",
};

export const ELEARNING_TYPES = {
    COURSE: "COURSE",
    LECTURE: "LECTURE",
};

export const CHAT = {
    JOIN_ROOM: "join_room",
    MESSAGE: "message",
    LEAVE_ROOM: "leave_room",
    STATUS_HANDLE: "status_handle",
    USER_TYPING: "user_typing",
    READ_MESSAGE: "read_message",
};

export const SHARE_OPTS = {
    TIMELINE: 0,
    FRIEND: 1,
    MESSAGE: 2,
};

export const EXERCISE_TYPES = {
    CHOICE: "CHOICE",
    ESSAY: "ESSAY",
};

export const EXERCISE_CATEGORIES = {
    EXERCISE: "EXERCISE",
    TEST: "TEST",
};

export const SUBMISSION_RESULTS = {
    PASSED: "PASSED",
    FAILED: "FAILED",
    PENDING: "PENDING",
};

export const SCALE_MARK = 10;

export const FINGERPRINT_PROPS = [
    "userAgent",
    "brandModel",
    "language",
    "platform",
    "deviceId",
    "deviceMemory",
    "hardwareConcurrency",
    "sessionStorage",
    "localStorage",
    "indexedDb",
    "openDatabase",
];
export const DEVICE_TYPE = {
    WEB: "WEB",
    MOBILE_APP: "MOBILE_APP",
    DESKTOP_APP: "DESKTOP_APP",
};
export const UPDATE_NOTI = {
    ALL: "All",
    ONLY_ONE: "ONLY_ONE",
};

export const USER_ROLES = {
    ROLE_USER: 'ROLE_USER',
    ROLE_STUDENT: 'ROLE_STUDENT',
    ROLE_TEACHER: 'ROLE_TEACHER',
    ROLE_PARENT: 'ROLE_PARENT',
    ROLE_SYSTEM_ADMIN: 'ROLE_SYSTEM-ADMIN',
    ROLE_ORG_ADMIN: 'ROLE_ORG-ADMIN',
}

export const ELEARNING_SIDE_MENU = {
    
}

export const ACCOUNT_PROFILE_MENU = {
    ELEARNING: 1,
    STUDENT: 2,
    ACCOUNT_INFO: 3,
    REVENUE: 1,
    TRANSACTION: 4,
    NOTIFICATION: 5,
    SETTINGS: 6,
    SUPPORT: 7,
    SIGNOUT: 8,
}