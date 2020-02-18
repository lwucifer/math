import * as APIs from "../../utils/endpoints";
import BaseService from "../BaseService";

export default class Lesson extends BaseService {
    constructor($axios) {
        super($axios, APIs.ELEARNING_CREATING_LESSONS);
    }
}