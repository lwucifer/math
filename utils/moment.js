import Vue from "vue";
import { DATETIME_FULL_TEXT, DATETIME_HH_MM_DD_MM_YY, DATETIME_RECEIVE, DATE_BIRTHDAY, DATE_FORMAT, DATE_YYYY_MM_DD, DATETIME_HH_MM, DATETIME_HH_MM_A } from "../utils/config";
const moment = require("moment");
const momenttimezone = require('moment-timezone');


export const getDateBirthDay = _utcDate => {
    if (!_utcDate) return;
    // const ts = moment.utc(_utcDate);
    const ts = getLocalDateTime(_utcDate);
    return ts.format(DATE_BIRTHDAY);
};

export const getDateUpdateProfile = _utcDate => {
    if (!_utcDate) return;
    // const ts = moment.utc(_utcDate);
    const ts = getLocalDateTime(_utcDate);
    return ts.format(DATE_YYYY_MM_DD);
};

export const getDateFormat = _utcDate => {
    if (!_utcDate) return;
    // const ts = moment.utc(_utcDate);
    const ts = getLocalDateTime(_utcDate);
    return ts.format(DATE_FORMAT);
};

export const fullDateTimeSlash = _utcDate => {
    if (!_utcDate) return;
    // const ts = moment.utc(_utcDate);
    const ts = getLocalDateTime(_utcDate);
    return ts.format(DATETIME_RECEIVE);
}

export const getDateTimeFullText = _utcDate => {
    if (!_utcDate) return;
    // const ts = moment.utc(_utcDate);
    const ts = getLocalDateTime(_utcDate);
    return ts.format(DATETIME_FULL_TEXT);
}

export const getDateTimeHH_MM_D_M_Y = _utcDate => {
    if (!_utcDate) return;
    // const ts = moment.utc(_utcDate);
    const ts = getLocalDateTime(_utcDate);
    return ts.format(DATETIME_HH_MM_DD_MM_YY);
}

export const getLocalDateTime = (_utcDate) => {
    if(!_utcDate) return new momenttimezone(_utcDate);
    const tz = momenttimezone.tz.guess(); 
    return momenttimezone.utc(_utcDate).tz(tz);
}

export const getUTCDateTime = (_localDate) => {
    if(!_localDate) return new momenttimezone(_localDate);
    const tz = momenttimezone.tz.guess();
    return momenttimezone.tz(_localDate, DATETIME_RECEIVE, tz).utc();
}

export const getUTCDateTimeReceive = (_localDate) => {
    if (!_localDate) return;
    // const ts = moment.utc(_utcDate);
    const ts = getUTCDateTime(_localDate);
    return ts.format(DATETIME_RECEIVE);
}

export const getUTCDateTimeHH_MM_A = (_localDate) => {
    if (!_localDate) return;
    // const ts = moment.utc(_utcDate);
    const ts = getUTCDateTime(_localDate);
    return ts.lang("en").format(DATETIME_HH_MM_A);
}

export const getDateHH_MM_A = (_date) => {
    if (!_date) return;
    return _date.lang("en").format(DATETIME_HH_MM_A);
};

export const getTimeHH_MM_A = (_time) => {
    if (!_time) return;
    let date = new momenttimezone(new Date('2000-01-01 ' + _time));
    return date.lang("en").format(DATETIME_HH_MM_A);
};

export const getEndTime = (_start, _duration) => {
    if (!_start) return;
    let date = getLocalDateTime(new Date('2000-01-01 ' + _start));
    if (_duration) {
        date = date.add(momenttimezone.duration(_duration).asMinutes(), 'minutes');
    }
    return date.lang("en").format(DATETIME_HH_MM_A);
};

export const hoursToMinutes = (_time) => {
    if (!_time) return;
    return momenttimezone.duration(_time).asMinutes();
};



Vue.filter("getDateBirthDay", function(_utcDate) {
    return getDateBirthDay(_utcDate);
});

Vue.filter("getDateTimeHH_MM_D_M_Y", function(_utcDate) {
    return getDateTimeHH_MM_D_M_Y(_utcDate);
});