import * as APIs from "../../utils/endpoints";
import BaseService from "../BaseService";

export default class Answer extends BaseService {
    constructor($axios) {
        super($axios, APIs.CREATING_ANSWERS);
    }
}