import * as APIs from "../../../utils/endpoints";
import BaseService from "../../BaseService";

export default class OnlineClass extends BaseService {
    constructor($axios) {
        super($axios, APIs.TEACHING_ONLINE_CLASS);
    }
}