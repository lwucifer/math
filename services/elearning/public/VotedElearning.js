import * as APIs from "../../../utils/endpoints";
import BaseService from "../../BaseService";

export default class VotedElearning extends BaseService {
    constructor($axios) {
        super($axios, APIs.ELEARNING_VOTED_ELEARNING);
    }
}