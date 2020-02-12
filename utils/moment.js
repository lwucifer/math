import { DATE_BIRTHDAY } from "../utils/config";
import Vue from "vue";
const moment = require("moment");

export const getDateBirthDay = _utcDate => {
    const ts = moment.utc(_utcDate);
    return ts.format(DATE_BIRTHDAY);
};

Vue.filter("getDateBirthDay", function(_utcDate) {
    return getDateBirthDay(_utcDate);
});