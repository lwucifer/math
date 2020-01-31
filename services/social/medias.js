import * as APIs from "../../utils/endpoints";
import BaseService from "../BaseService";

export default class Medias extends BaseService {
    constructor($axios) {
        super($axios, APIs.MEDIAS);
    }
}