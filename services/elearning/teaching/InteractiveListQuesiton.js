import * as APIs from "~/utils/endpoints";
import BaseService from "../../BaseService";

export default class InteractiveListQuesiton extends BaseService {
    constructor($axios) {
        super($axios, APIs.TEACHING_INTERACTIVE_LISTQUESTION);
    }
}