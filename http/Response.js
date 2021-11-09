"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { is_int } = require('php-in-js/modules/types');
module.exports = class Response {
    constructor(res) {
        this._res = res;
    }
    /**
     *
     * @param {String} message
     * @param {number} status
     * @param {any} errors
     * @returns
     */
    fail(message, status, errors) {
        status = (status && is_int(status)) ? status : 500;
        return this.send({
            success: false,
            status,
            message,
            errors
        }, status);
    }
    /**
     *
     * @param {String} message
     * @param {any} result
     * @param {number} status
     * @returns
     */
    success(message, result, status) {
        status = (status && is_int(status)) ? status : 200;
        return this.send({
            success: true,
            message,
            result,
            status
        }, status);
    }
    /**
     *
     * @param {object} data
     * @param {number} status
     * @returns
     */
    send(data, status) {
        return this._res.status(status || 200).send(data);
    }
};
