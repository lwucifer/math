import * as APIs from "~/utils/endpoints";
import BaseService from "~/services//BaseService";

export default class Notifications extends BaseService {
  constructor($axios) {
    super($axios, APIs.STUDY_ELEARNING_NOTIFICATIONS);
  }
}