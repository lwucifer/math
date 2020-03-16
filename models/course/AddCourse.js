import numeral from "numeral";
import { toNumber } from "lodash";

class AddCourse {
  constructor(payload) {
    this.avatar = payload.avatar;
    this.benefit = payload.benefit;
    this.description = payload.description;
    this.discount = payload.discount ? numeral(payload.discount).value() : "";
    this.fee = payload.fee ? numeral(payload.fee).value() : "";
    this.level = payload.level ? toNumber(payload.level) : "";
    this.name = payload.name;
    this.subject = payload.subject;
    this.type = payload.type;
    if (payload.elearning_id) {
      this.elearning_id = payload.elearning_id;
    }
  }
}

export function createPayloadAddCourse(payload) {
  return Object.freeze(new AddCourse(payload));
}

class AddContentCourse {
  constructor(payload) {
    this.elearning_id = payload.elearning_id;
    this.index = payload.index;
    if (payload.lesson) {
      this.lesson = payload.lesson;
    }
    if (payload.url) {
      this.url = payload.url;
    }
    if (payload.article_content) {
      this.article_content = payload.article_content;
    }
    this.name = payload.name;
    this.type = payload.type;
  }
}

export function createPayloadAddContentCourse(payload) {
  return Object.freeze(new AddContentCourse(payload));
}
