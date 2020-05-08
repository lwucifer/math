import Vue from "vue";
import numeral from "numeral";
import {
  EXERCISE_CATEGORIES,
  EXERCISE_TYPES,
  SUBMISSION_RESULTS,
  WITHDRAWAL_STATUSES,
  TRANSACTION_STATUSES
} from "~/utils/constants";

/**
 * 10000 => "10.000"
 * @param {number} num
 * @param {string} separator
 */
export function toThousandFilter(num, separator = ".") {
  // console.log("[toThousandFilter]", num)
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, separator));
}

/**
 * 10000 => "10.000" by numeral
 * @param {Number} num
 * @param {String} format
 */
export function numeralFormat(num, format = "0,0") {
  return numeral(num).format(format);
}

/**
 * Filesize Filter
 * @Param {number} size
 * @return string
 */
export function fileSizeFilter(size) {
  if (isNaN(size)) size = 0;

  if (size < 1024) return size + " Bytes";

  size /= 1024;

  if (size < 1024) return size.toFixed(2) + " KB";

  size /= 1024;

  if (size < 1024) return size.toFixed(2) + " MB";

  size /= 1024;

  if (size < 1024) return size.toFixed(2) + " GB";

  size /= 1024;

  return size.toFixed(2) + " TB";
}

/**
 * Truncate a string Filter
 * @Param {string} str
 * @Param {integer} charCounter
 * @Param {boolean} useWordBoundary
 * @return string
 */
export function truncStrFilter(
  str = "",
  charCounter = 0,
  useWordBoundary = false
) {
  if (str.length <= charCounter) {
    return str;
  }
  var subString = str.substr(0, charCounter - 1);
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + " ..."
  );
}

/**
 * Translate exercise category => label
 * @Param {string} str
 */
export function exCate2Txt(str = "") {
  const MATCHED_DATA = {
    [EXERCISE_CATEGORIES.EXERCISE]: "Bài tập",
    [EXERCISE_CATEGORIES.TEST]: "Bài kiểm tra"
  };
  if (MATCHED_DATA.hasOwnProperty(str)) return MATCHED_DATA[str];
  return "Loại khác";
}

/**
 * Translate exercise type => label
 * @Param {string} str
 */
export function exType2Txt(str = "") {
  const MATCHED_DATA = {
    [EXERCISE_TYPES.CHOICE]: "Trắc nghiệm",
    [EXERCISE_TYPES.ESSAY]: "Tự luận"
  };
  if (MATCHED_DATA.hasOwnProperty(str)) return MATCHED_DATA[str];
  return "-";
}

/**
 * Translate submission results => status
 * @Param {string} str
 */
export function subResult2Txt(str = "") {
  const MATCHED_DATA = {
    [SUBMISSION_RESULTS.PASSED]: "Đạt",
    [SUBMISSION_RESULTS.FAILED]: "Không đạt",
    [SUBMISSION_RESULTS.PENDING]: "Chưa chấm điểm",
    [SUBMISSION_RESULTS.NONE]: "Chưa làm bài"
  };
  if (MATCHED_DATA.hasOwnProperty(str)) return MATCHED_DATA[str];
  return "-";
}

/**
 * Translate withdrawal status => text
 * @Param {string} str
 */
export function withdrawalStatus2Txt(str = "") {
  const MATCHED_DATA = {
    [WITHDRAWAL_STATUSES.SUCCESS]: "Thành công",
    [WITHDRAWAL_STATUSES.FAILED]: "Thất bại",
    [WITHDRAWAL_STATUSES.PENDING]: "Chờ duyệt"
  };
  if (MATCHED_DATA.hasOwnProperty(str)) return MATCHED_DATA[str];
  return "-";
}

/**
 * Translate transaction status => text
 * @Param {string} str
 */
export function transactionStatus2Txt(str = "") {
  const MATCHED_DATA = {
    [TRANSACTION_STATUSES.SUCCESS]: "Thành công",
    [TRANSACTION_STATUSES.FAILED]: "Thất bại",
    [TRANSACTION_STATUSES.PENDING]: "TTLại", // can repay if status == pending
    [TRANSACTION_STATUSES.CANCEL]: "Huỷ", // can repay if status == pending
    [TRANSACTION_STATUSES.CANCEL_SUCCESS]: "Đã Huỷ" // can repay if status == pending
  };
  if (MATCHED_DATA.hasOwnProperty(str)) return MATCHED_DATA[str];
  return "-";
}

export function convertBreadcrumText(str = "", elearningInfo) {
  let breadcrumTxt = str;
  switch (str) {
    case "Elearning":
      breadcrumTxt = "Elearning";
      break;
    case "manager":
      breadcrumTxt = "Quản lý Elearning";
      break;
    case "":
      breadcrumTxt = "Tổng Quan";
      break;
    case "courses":
      breadcrumTxt = "Bài giảng và khoá học";
      break;
    case "exams":
      breadcrumTxt = "Bài tập và bài kiểm tra";
      break;
    case "warehouses":
      breadcrumTxt = "Kho học liệu";
      break;
    case "online-class":
      breadcrumTxt = "Phòng học online";
      break;
    case "interacts":
      breadcrumTxt = "Tương tác với học sinh";
      break;
    case "rates":
      breadcrumTxt = "Đánh giá và bình luận";
      break;
    case "list":
      breadcrumTxt = "Danh sách";
      break;
    case "participants":
      breadcrumTxt = "Học sinh tham gia";
      break;

    default:
      breadcrumTxt = elearningInfo.subject.name;
      break;
  }
  console.log("convertBreadcrumText", str, breadcrumTxt);
  return breadcrumTxt;
}


export function getExerciseTypeText(type="") {
  if (type === EXERCISE_TYPES.CHOICE) {
    return "Bài tập trắc nghiệm";
  } else if (type === EXERCISE_TYPES.ESSAY) {
    return "Bài tập tự luận";
  }
}

const filters = {
  toThousandFilter,
  numeralFormat,
  fileSizeFilter,
  truncStrFilter,
  exCate2Txt,
  exType2Txt,
  subResult2Txt,
  withdrawalStatus2Txt,
  transactionStatus2Txt,
  convertBreadcrumText,
  getExerciseTypeText,
};

// register global utility filters
export default Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
