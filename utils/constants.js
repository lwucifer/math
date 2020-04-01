
export const POST_TYPES = {
    STATUS: 1,
    PHOTO: 2,
    SHARE: 3,
    LINK: 4,
    VIDEO: 5
}

export const LIKE_SOURCE_TYPES = {
    POST: 1,
    COMMENT: 2
}

export const LIKE_TYPES = {
    LIKE: 1,
    HAPPY: 2,
    ANGRY: 3
}

export const APP_INPUT_VALIDATE_STATUS = {
    DEFAULT: 0,
    SUCCESS: 1,
    ERROR: 2
}

export const SOCIAL_LINK_SCHEMA = {
    type : '',
    url : '',
    image : '',
    title : '',
    description : '',
    updatedTime : '',
    imageWidth : '',
    imageHeight : '',
    videoUrl : '',
    videoSecureUrl : '',
    videoType : '',
    videoWidth : '',
    videoHeight : '',
    videoTag : '',
    siteName : '',
}

export const ELEARNING_TYPES = {
    COURSE: "COURSE",
    LECTURE: "LECTURE"
}

export const CHAT = {
    JOIN_ROOM: 'join_room',
    MESSAGE: 'message',
    LEAVE_ROOM: 'leave_room',
    STATUS_HANDLE: 'status_handle',
    USER_TYPING: 'user_typing',
    READ_MESSAGE: 'read_message',
}

export const SHARE_OPTS = {
    TIMELINE: 0,
    FRIEND: 1,
    MESSAGE: 2
}

export const EXERCISE_TYPES = {
    CHOICE: "CHOICE",
    ESSAY: "ESSAY"
}

export const SUBMISSION_RESULTS = {
  PASS: 1,
  FAIL: -1,
  NO_SCORE: 0
}

export const SCALE_MARK = 10