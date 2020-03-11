import { forEach, get } from "lodash";

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

export function useEffect(that, watcher, props) {
  watcher();
  const iterator = function(prop) {
    that.$watch(prop, watcher);
  };
  props.forEach(iterator, that);
}

export function redirectWithParams(params = {}) {
  let currentUrlParams = new URLSearchParams(window.location.search);

  forEach(params, function(value, key) {
    currentUrlParams.set(key, value);
  });

  window.history.pushState(
    {},
    "",
    window.location.pathname + "?" + currentUrlParams.toString()
  );
}

export function getParamQuery(name) {
  if (process.client) {
    let currentUrlParams = new URLSearchParams(window.location.search);
    return currentUrlParams.get(name);
  }
  return get(this, `$route.query.${name}`, "");
}
