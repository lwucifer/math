

export const TYPE_CHECK = {
    SERVER: 'server',
    CLIENT: 'client',
}


export const METHODS_CHECK = {
    SESELT_SIGN: 'self-sign',
    PUBLIC: 'public',
}

export const VALUE_AUTH = {
    USERPASS: 'userpass',
    CERT: 'cert',
    USERPASS_CERT: 'userpass_cert',
    OTP: 'otp'
}
export const VALUE_BACKEND_AUTH = {
    REMOTE: 'remote',
    LOCAL: 'local',
}

export const CHECK_SHOW_FORM_USER = {
    USERPASS_LOCAL: 'userpassLocal',
    USERPASS_REMOTE: 'userpassRemote',
    CERTIFICATE: 'certificate',
    CERTIFICATE_LOCAL: 'certificateLocal',
    CERTIFICATE_REMOTE: 'certificateRemote',
}

export const ROOT_EVENTS = {
    CHANGE_SYSTEM_TIME: 'changeSystemTime'
}

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