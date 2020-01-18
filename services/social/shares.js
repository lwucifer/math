import * as APIs from "../../utils/endpoints";
import BaseService from "../BaseService";

export default class Shares extends BaseService {
    constructor($axios) {
        super($axios, APIs.SHARES);
    }
}