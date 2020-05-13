import Vue from "vue";
import { DATETIME_FULL_TEXT, DATETIME_HH_MM_DD_MM_YY, DATETIME_RECEIVE, DATE_BIRTHDAY, DATE_FORMAT, DATE_YYYY_MM_DD } from "../utils/config";
const moment = require("moment");

export const getDateBirthDay = _utcDate => {
    if (!_utcDate) return;
    const ts = moment.utc(_utcDate);
    return ts.format(DATE_BIRTHDAY);
};

export const getDateUpdateProfile = _utcDate => {
    if (!_utcDate) return;
    const ts = moment.utc(_utcDate);
    return ts.format(DATE_YYYY_MM_DD);
};

export const getDateFormat = _utcDate => {
    if (!_utcDate) return;
    const ts = moment.utc(_utcDate);
    return ts.format(DATE_FORMAT);
};

export const fullDateTimeSlash = _utcDate => {
    if (!_utcDate) return;
    const ts = moment.utc(_utcDate);
    return ts.format(DATETIME_RECEIVE);
}

export const getDateTimeFullText = _utcDate => {
    if (!_utcDate) return;
    const ts = moment.utc(_utcDate);
    return ts.format(DATETIME_FULL_TEXT);
}

export const getDateTimeHH_MM_D_M_Y = _utcDate => {
    if (!_utcDate) return;
    const ts = moment.utc(_utcDate);
    return ts.format(DATETIME_HH_MM_DD_MM_YY);
}

Vue.filter("getDateBirthDay", function(_utcDate) {
    return getDateBirthDay(_utcDate);
});

Vue.filter("getDateTimeHH_MM_D_M_Y", function(_utcDate) {
    return getDateTimeHH_MM_D_M_Y(_utcDate);
});