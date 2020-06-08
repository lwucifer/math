import Vue from "vue";
import { DATETIME_FULL_TEXT, DATETIME_HH_MM_DD_MM_YY, DATETIME_RECEIVE, DATE_BIRTHDAY, DATE_FORMAT, DATE_YYYY_MM_DD, DATETIME_HH_MM, DATETIME_HH_MM_A, DATETIME_HH_MM_A_DD_MM_YY, DATETIME_HH_MM_DD_MM_YY_DASH } from "../utils/config";
const moment = require("moment");
const momenttimezone = require('moment-timezone');

export const fullUTCDateTimeSlash = _utcDate => {
    if (!_utcDate) return;
    const ts = moment.utc(_utcDate);
    return ts.format(DATETIME_RECEIVE);
}

export const getLocalOffsetHours = () => {
    const offsetMinutes = moment().utcOffset(); // (-240, -120, -60, 0, 60, 120, 240, etc.)
    return parseInt(Math.floor(offsetMinutes/60)) || 7;
}

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

export const isBeforeNow = _utcDate => {
    console.log("[isBeforeNow]", _utcDate);
    if (!_utcDate) return false;
    const ts = getLocalDateTime(_utcDate);
    return ts.isBefore(new Date());
};


export const fullDateTimeSlash = _utcDate => {
    if (!_utcDate) return "--:--";
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

export const getDateTimeHH_MM_D_M_Y_DASH = _utcDate => {
    if (!_utcDate) return;
    // const ts = moment.utc(_utcDate);
    const ts = getLocalDateTime(_utcDate);
    return ts.format(DATETIME_HH_MM_DD_MM_YY_DASH);
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
    const splits = _time.split(" ");
    const hour = splits[0].split(':')[0];
    const minute = splits[0].split(':')[1];
    const hh24 = splits[1] == 'pm' ? (parseInt(hour) + 12) : hour;
    // let ts = new momenttimezone(new Date('2000-01-01 ' + _time));
    let ts = new momenttimezone(`2000-01-01 ${hh24}:${minute}`, `YYYY-MM-DD hh:mm A`);
    return ts.lang("en").format(DATETIME_HH_MM_A);
};

export const getLocalTimeHH_MM_A = (_utcDate) => {
    if (!_utcDate) return;
    let ts = getLocalDateTime(_utcDate);
    return ts.lang("en").format(DATETIME_HH_MM_A);
};

export const getLocalEndTime = (_startDate, _duration, type) => {
    if (!_startDate) return;
    let date = getLocalDateTime(_startDate);
    if (_duration) {
        date = date.add(_duration, type);
    }
    return date.lang("en").format(DATETIME_HH_MM_A);
};

export const getEndTime = (_startTime, _duration) => {
    if (!_startTime) return;
    // let date = getLocalDateTime(new Date('2000-01-01 ' + _startTime));
    const splits = _startTime.split(" ");
    const hour = splits[0].split(':')[0];
    const minute = splits[0].split(':')[1];
    const hh24 = splits[1] == 'pm' ? (parseInt(hour) + 12) : hour;
    let date = new momenttimezone(`2000-01-01 ${hh24}:${minute}`, `YYYY-MM-DD hh:mm A`);
    if (_duration) {
        date = date.add(momenttimezone.duration(_duration).asMinutes(), 'minutes');
    }
    return date.lang("en").format(DATETIME_HH_MM_A);
};

export const hoursToMinutes = (_time) => {
    if (!_time) return;
    return momenttimezone.duration(_time).asMinutes();
};


/**
 * 
 * @param {hh:mm} _time 
 * return hh + GMT
 */
export const convertLocalTimeForTimetable = (_time) => {
    
    if(!_time) return "";
    const splits = _time.split(":");
    const hh = parseInt(splits[0]);
    const mm = splits[1];
    const gmt = getLocalOffsetHours();
    // const localhh = (hh + gmt) >= 24 ? 0 : (hh + gmt);
    // console.log("[convertLocalTimeForTimetable] _time", hh, gmt, mm, _time);
    return `${hh + gmt}:${mm}`;
}

export const addDurationToUTCDate = (_utcDate, _duration, _type) => {
    const ts = moment.utc(_utcDate);
    return ts.add(_duration, _type).format(DATETIME_RECEIVE);
}

export const getDateTimeHH_MM_A_DD_MM_YY = _utcDate => {
    if (!_utcDate) return;
    // const ts = moment.utc(_utcDate);
    const ts = getLocalDateTime(_utcDate);
    return ts.format(DATETIME_HH_MM_A_DD_MM_YY);
}

// return current day in week: sun mon ... fri sat
export const getTodayDDD = () => {
    return moment().locale('en').format("ddd").toLowerCase();
}

export const isTodayInRangeDate = (_fromDate, _toDate) => {
    // console.log("[isTodayInRangeDate]", _fromDate, _toDate)
    if(!_fromDate || !_toDate) return false;
    const fDate = moment(_fromDate).format(DATE_YYYY_MM_DD);
    const tDate = moment(_toDate).format(DATE_YYYY_MM_DD);
    return moment().isBetween(fDate, tDate);
}

Vue.filter("getDateBirthDay", function(_utcDate) {
    return getDateBirthDay(_utcDate);
});

Vue.filter("getDateTimeHH_MM_D_M_Y", function(_utcDate) {
    return getDateTimeHH_MM_D_M_Y(_utcDate);
});

Vue.filter("getDateTimeHH_MM_D_M_Y_DASH", function(_utcDate) {
    return getDateTimeHH_MM_D_M_Y_DASH(_utcDate);
});

Vue.filter("fullDateTimeSlash", function(_utcDate) {
    return fullDateTimeSlash(_utcDate);
});

Vue.filter("getDateTimeHH_MM_A_DD_MM_YY", function(_utcDate) {
    return getDateTimeHH_MM_A_DD_MM_YY(_utcDate);
});