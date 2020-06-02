import * as APIs from "~/utils/endpoints";
import BaseService from "../../BaseService";

export default class InteractiveAnnouncement extends BaseService {
    constructor($axios) {
        super($axios, APIs.TEACHING_INTERACTIVE_ANNOUNCEMENT);
    }
}