import { DATE_BIRTHDAY, DATE_YYYY_MM_DD } from "../utils/config";
import Vue from "vue";
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

Vue.filter("getDateBirthDay", function(_utcDate) {
    return getDateBirthDay(_utcDate);
});