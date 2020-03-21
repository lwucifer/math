import * as APIs from "../../../utils/endpoints";
import BaseService from "../../BaseService";

export default class ElearningCoursesList extends BaseService {
    constructor($axios) {
        super($axios, APIs.ELEARNING_COURSES_LIST);
    }
}