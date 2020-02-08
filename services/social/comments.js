import * as APIs from "../../utils/endpoints";
import BaseService from "../BaseService";

export default class Comments extends BaseService {
    constructor($axios) {
        super($axios, APIs.COMMENTS);
    }
}