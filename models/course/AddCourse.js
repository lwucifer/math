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
  }
}

export function createPayloadAddCourse(payload) {
  return Object.freeze(new AddCourse(payload));
}
