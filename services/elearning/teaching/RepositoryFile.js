import * as APIs from "~/utils/endpoints";
import BaseService from "~/services/BaseService";

export default class RepositoryFile extends BaseService {
  constructor($axios) {
    super($axios, APIs.ELEARNING_TEACHING_REPOSITORY_FILE);
  }
}
