import { DATE_BIRTHDAY } from "../utils/config";
import Vue from "vue";
const moment = require("moment");

export const getSysdateSimpleFormat = () => {
    return moment().format(DATE_BIRTHDAY);
};

Vue.filter("getSysdateSimpleFormat", function(_utcDate) {
    return getSysdateSimpleFormat(_utcDate);
});