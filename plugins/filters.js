import Vue from "vue"
import numeral from "numeral"
import {
  EXERCISE_CATEGORIES,
  EXERCISE_TYPES,
  SUBMISSION_RESULTS,
} from "~/utils/constants"

/**
 * 10000 => "10.000"
 * @param {number} num
 * @param {string} separator
 */
export function toThousandFilter(num, separator = '.') {
    // console.log("[toThousandFilter]", num)
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, separator))
}

/**
 * 10000 => "10.000" by numeral
 * @param {Number} num
 * @param {String} format
 */
export function numeralFormat(num, format = '0,0') {
    return numeral(num).format(format);
}

/**
 * Filesize Filter
 * @Param {number} size
 * @return string
 */
export function fileSizeFilter(size) {
    if (isNaN(size))
        size = 0;

    if (size < 1024)
        return size + ' Bytes';

    size /= 1024;

    if (size < 1024)
        return size.toFixed(2) + ' KB';

    size /= 1024;

    if (size < 1024)
        return size.toFixed(2) + ' MB';

    size /= 1024;

    if (size < 1024)
        return size.toFixed(2) + ' GB';

    size /= 1024;

    return size.toFixed(2) + ' TB';
}

/**
 * Truncate a string Filter
 * @Param {string} str
 * @Param {integer} charCounter
 * @Param {boolean} useWordBoundary
 * @return string
 */
export function truncStrFilter(str = '', charCounter = 0, useWordBoundary = false) {
    if (str.length <= charCounter) { return str; }
    var subString = str.substr(0, charCounter - 1);
    return (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(' '))
      : subString) + " ...";
}

/**
 * Translate exercise category => label
 * @Param {string} str
 */
export function exCate2Txt(str = '') {
    const MATCHED_DATA = {
        [EXERCISE_CATEGORIES.EXERCISE]: 'Bài tập',
        [EXERCISE_CATEGORIES.TEST]: 'Bài kiểm tra'
    };
    if (MATCHED_DATA.hasOwnProperty(str))
        return MATCHED_DATA[str];
    return 'Loại khác'
}

/**
 * Translate exercise type => label
 * @Param {string} str
 */
export function exType2Txt(str = '') {
  const MATCHED_DATA = {
    [EXERCISE_TYPES.CHOICE]: 'Trắc nghiệm',
    [EXERCISE_TYPES.ESSAY]: 'Tự luận'
  }
  if (MATCHED_DATA.hasOwnProperty(str))
    return MATCHED_DATA[str]
  return '-'
}

/**
 * Translate submission results => status
 * @Param {string} str
 */
export function subResult2Txt(str = '') {
  const MATCHED_DATA = {
    [SUBMISSION_RESULTS.PASSED]: 'Đạt',
    [SUBMISSION_RESULTS.FAILED]: 'Không đạt',
    [SUBMISSION_RESULTS.PENDING]: 'Chưa chấm điểm'
  }
  if (MATCHED_DATA.hasOwnProperty(str))
    return MATCHED_DATA[str]
  return '-'
}

const filters = {
    toThousandFilter,
    numeralFormat,
    fileSizeFilter,
    truncStrFilter,
    exCate2Txt,
    exType2Txt,
    subResult2Txt
}

// register global utility filters
export default Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
