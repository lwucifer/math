import * as APIs from "~/utils/endpoints";
import BaseService from "~/services/BaseService";

export default class Block extends BaseService {
  constructor($axios) {
    super($axios, APIs.ELEARNING_CREATING_OLCLASSES_BLOCK);
  }
}
