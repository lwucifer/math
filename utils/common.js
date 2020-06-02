import { forEach, get } from "lodash";
import Fingerprint2 from "fingerprintjs2";
import * as constants from "~/utils/constants";
import { setDeviceId, setDeviceOs } from "./auth";

export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export function remove_unicode(str) {
  if (!tr) return "";

  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
    "-"
  );

  str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
  str = str.replace(/^\-+|\-+$/g, "");

  return str;
}

export function useEffect(that, watcher, props, init = true) {
  if (init) watcher();
  const iterator = function(prop) {
    that.$watch(prop, {
      handler: watcher,
      deep: true,
    });
  };
  props.forEach(iterator, that);
}

export function redirectWithParams(params = {}) {
  let currentUrlParams = new URLSearchParams(window.location.search);

  forEach(params, function(value, key) {
    currentUrlParams.set(key, value);
  });

  window.history.replaceState(
    {},
    "",
    window.location.pathname + "?" + currentUrlParams.toString()
  );
}

export function getParamQuery(name) {
  let value = "";
  try {
    let currentUrlParams = new URLSearchParams(window.location.search);
    value = currentUrlParams.get(name);
  } catch (erorr) {
    value = "";
  }
  if (!value) {
    value = get(this, `$route.query.${name}`, "");
  }
  return value;
}

export function isValidUrl(str) {
  const pattern = new RegExp(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
    "gm"
  );
  return !!pattern.test(str);
}

export function testJSON(text) {
  if (typeof text !== "string") {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
}

export function getDeviceID() {
  let deviceID = "";
  let deviceOs = "";

  Fingerprint2.get((components) => {
    deviceID = Fingerprint2.x64hash128(
      components
        .map((pair) => {
          // console.log("[pair]", pair);
          // get device name by userAgent
          if (pair.key == "userAgent") {
            deviceOs = pair.value;
          }
          if (constants.FINGERPRINT_PROPS.includes(pair.key)) {
            return pair.value;
          }
        })
        .join(),
      31
    );
    console.log("[setDeviceId]", deviceID);
    setDeviceId(deviceID);
    setDeviceOs(deviceOs);
  });

  // set to cookies

  return deviceID;
}

export function stripHtml(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export const detectBrowser = () => {
  let browserName = "";
  let isOpera =
    (!!window.opr && !!opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(" OPR/") >= 0;

  // Firefox 1.0+
  let isFirefox = typeof InstallTrigger !== "undefined";

  // Safari 3.0+ "[object HTMLElementConstructor]"
  let isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function(p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(
      !window["safari"] ||
        (typeof safari !== "undefined" && safari.pushNotification)
    );

  // Internet Explorer 6-11
  let isIE = /*@cc_on!@*/ false || !!document.documentMode;

  // Edge 20+
  let isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1 - 79
  let isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  // Edge (based on chromium) detection
  // let isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;

  // Blink engine detection
  // let isBlink = (isChrome || isOpera) && !!window.CSS;
  if (isOpera) {
    return (browserName = "Opera");
  } else if (isFirefox) {
    return (browserName = "Firefox");
  } else if (isSafari) {
    return (browserName = "Safari");
  } else if (isIE) {
    return (browserName = "IE");
  } else if (isEdge) {
    return (browserName = "Edge");
  } else if (isChrome) {
    return (browserName = "Chrome");
  }
  console.log("browserName", browserName);
  return browserName;
};

export const isCommonElementIn2Array = (arr1, arr2) => {
  if (!arr1 || !arr2) return false;
  return !!arr2.filter((e) => arr1.indexOf(e) > -1).length;
};

/**
 *
 * @param {*} val : number (s)
 * return 00:09:03 (hh:mm:ss)
 */
export function getCountdown_HH_MM_SS(val) {
  const h = Math.floor(val / 60 / 60);
  const m = Math.floor((val - 60 * 60 * h) / 60);
  const s = val - 60 * 60 * h - 60 * m;
  let str = "";
  str += h >= 10 ? `${h}:` : `0${h}:`;
  str += m >= 10 ? `${m}:` : `0${m}:`;
  str += s >= 10 ? `${s}` : `0${s}`;
  // console.log("[getCountdown_HH_MM_SS]", str, h, m, s);
  return str;
}

/**
 *
 * @param {*} val : number (s)
 * return 00:09:03 (hh:mm:ss)
 */
export function getCountdown_MM_SS(val) {
  const m = Math.floor(val / 60);
  const s = val - 60 * m;
  let str = "";
  str += m >= 10 ? `${m}:` : `0${m}:`;
  str += s >= 10 ? `${s}` : `0${s}`;
  console.log("[getCountdown_MM_SS]", str, m, s);
  return str;
}

export const addAllOptionSelect = (arr) => {
  const allOpt = {
    id: -1,
    name: "Tất cả",
    type: "",
  };
  return [allOpt, ...arr];
};

export const optionSelectSubject = (arr) => {
  const allOpt = {
    id: null,
    name: "Tất cả",
    type: "",
  };
  return [allOpt, ...arr];
};

export const limitCharacter = (_val, _limit, _numberSlice) => {
  const newString = _val.split(" ");

  if (newString.length > _limit) {
    return newString.slice(0, _numberSlice).join(" ") + "...";
  }
  return _val;
};

export const removeTagHtml = (_text) => {
  const content = _text.replace(/(<([^>]+)>)/gi, "");
  return content;
};
