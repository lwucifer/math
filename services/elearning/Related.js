import * as APIs from "../../utils/endpoints";
import BaseService from "../BaseService";

export default class Related extends BaseService {
    constructor($axios) {
        super($axios, APIs.ELEARNING_PUBLIC_RELATED);
    }
}