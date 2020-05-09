import Vue from "vue";
import { DATETIME_RECEIVE, DATE_BIRTHDAY, DATE_FORMAT, DATE_YYYY_MM_DD, DATETIME_FULL_TEXT } from "../utils/config";
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

Vue.filter("getDateBirthDay", function(_utcDate) {
    return getDateBirthDay(_utcDate);
});