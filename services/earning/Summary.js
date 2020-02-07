import * as APIs from "../../utils/endpoints";
import BaseService from "../BaseService";

export default class Summary extends BaseService {
    constructor($axios) {
        super($axios, APIs.EARNING_SUMMARY);
    }
}