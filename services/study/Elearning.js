import * as APIs from "../../utils/endpoints";
import BaseService from "../BaseService";

export default class Elearning extends BaseService {
    constructor($axios) {
        super($axios, APIs.STUDY_ELEARNING);
    }
}