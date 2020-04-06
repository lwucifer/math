import * as APIs from "../../utils/endpoints";
import BaseService from "../BaseService";

export default class TagPhotos extends BaseService {
    constructor($axios) {
        super($axios, APIs.SOCIAL_POST_TAG_PHOTO);
    }
}