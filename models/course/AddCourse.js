import numeral from "numeral";
import { toNumber } from "lodash";

class AddCourse {
  constructor(payload) {
    if (payload.avatar) {
      this.avatar = payload.avatar;
    }

    if (payload.benefit) {
      this.benefit = payload.benefit;
    }

    if (payload.description) {
      this.description = payload.description;
    }

    if (payload.level) {
      this.level = payload.level ? toNumber(payload.level) : "";
    }

    if (payload.name) {
      this.name = payload.name;
    }

    if (payload.subject) {
      this.subject = payload.subject;
    }

    if (payload.type) {
      this.type = payload.type;
    }

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
    if (payload.elearning_id) {
      this.elearning_id = payload.elearning_id;
    }
    if (payload.chapter_id) {
      this.chapter_id = payload.chapter_id;
    }
    if (payload.lesson) {
      this.lesson = payload.lesson;
    }
    if (payload.index !== "" && !payload.id) {
      this.index = payload.index;
    }
    if (payload.repository_file_id) {
      this.repository_file_id = payload.repository_file_id;
    }
    if (payload.article_content) {
      this.article_content = payload.article_content;
    }
    if (payload.id) {
      this.id = payload.id;
    }
    this.name = payload.name;
    this.type = payload.type;
  }
}

export function createPayloadAddContentCourse(payload) {
  return Object.freeze(new AddContentCourse(payload));
}

class AddDocument {
  constructor(payload) {
    this.lesson_id = payload.lesson_id;
    if (payload.doc) {
      this.doc = payload.doc;
    }
    if (payload.url) {
      this.url = payload.url;
    }
    if (payload.format) {
      this.format = payload.format;
    }
    this.name = payload.name;
  }
}

export function createPayloadAddDocument(payload) {
  return Object.freeze(new AddDocument(payload));
}

class CourseSetting {
  constructor(payload) {
    this.comment_allow = payload.comment_allow == 1 ? true : false;
    this.free = payload.free == 1 ? true : false;
    if (payload.free == 0) {
      this.discount = numeral(payload.discount).value();
      this.fee = numeral(payload.fee).value();
    }
    this.elearning_id = payload.elearning_id;
    this.privacy = payload.privacy;
    if (payload.privacy === "PRIVATE") {
      this.passcode = payload.passcode;
    }
  }
}

export function createPayloadCourseSetting(payload) {
  return Object.freeze(new CourseSetting(payload));
}
