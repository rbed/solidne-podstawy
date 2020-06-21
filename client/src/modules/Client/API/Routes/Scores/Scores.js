/**
 * @description Returns {String} of HTTP path requests
 */
const MAIN_PATH = '/api/scores';

export default class Scores {
    static GET_SCORES = MAIN_PATH + '/';
    static SCORES_BY_ID = MAIN_PATH + '/id/';
    static CREATE_SCORES = MAIN_PATH + '/';
    static UPDATE_SCORES = MAIN_PATH + '/id';
    static DELETE_SCORES_BY_ID = MAIN_PATH + '/id';
 }