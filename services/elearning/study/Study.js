import * as APIs from "../../../utils/endpoints";
import BaseService from "../../BaseService";

export default class Study extends BaseService {
  constructor($axios) {
    super($axios, APIs.STUDY_MY_ELEARNING);
  }
}