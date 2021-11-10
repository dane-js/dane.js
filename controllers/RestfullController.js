"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController = require('./BaseController');
const Message = require('../http/Message');
module.exports = class RestfullController extends BaseController {
    constructor() {
        super(...arguments);
        this.response = null;
        this.request = null;
    }
    /**
     * Reponse de type bad request
     *
     * @param {string} message
     * @param {any} errors
     * @return {any}
     */
    respondBadRequest(message, errors) {
        return this.respondError(message, Message.HTTP_BAD_REQUEST, errors);
    }
    badRequest(message, errors) {
        return this.respondBadRequest(message, errors);
    }
    /**
     * Reponse de type conflict
     *
     * @param {string} message
     * @param {any} errors
     * @return {any}
     */
    respondConflict(message, errors) {
        return this.respondError(message, Message.HTTP_CONFLICT, errors);
    }
    conflict(message, errors) {
        return this.respondConflict(message, errors);
    }
    /**
     * Reponse de type created
     *
     * @param {string} message
     * @param {any} result
     * @return {any}
     */
    respondCreated(message, result) {
        return this.respondSuccess(message, result, Message.HTTP_CREATED);
    }
    created(message, result) {
        return this.respondCreated(message, result);
    }
    /**
     * Reponse de type forbidden
     *
     * @param {string} message
     * @param {any} errors
     * @return {any}
     */
    respondForbidden(message, errors) {
        return this.respondError(message, Message.HTTP_FORBIDDEN, errors);
    }
    forbidden(message, errors) {
        return this.respondForbidden(message, errors);
    }
    /**
     * Reponse de type internal error
     *
     * @param {string} message
     * @param {any} errors
     * @return {any}
     */
    respondInternalError(message, errors) {
        return this.respondError(message, Message.HTTP_INTERNAL_ERROR, errors);
    }
    internalError(message, errors) {
        return this.respondInternalError(message, errors);
    }
    /**
     * Reponse de type invalid token
     *
     * @param {string} message
     * @param {any} errors
     * @return {any}
     */
    respondInvalidToken(message, errors) {
        return this.respondError(message, Message.HTTP_INVALID_TOKEN, errors);
    }
    invalidToken(message, errors) {
        return this.respondInvalidToken(message, errors);
    }
    /**
     * Reponse de type method not allowed
     *
     * @param {string} message
     * @param {any} errors
     * @return {any}
     */
    respondMethodNotAllowed(message, errors) {
        return this.respondError(message, Message.HTTP_METHOD_NOT_ALLOWED, errors);
    }
    methodNotAllowed(message, errors) {
        return this.respondMethodNotAllowed(message, errors);
    }
    /**
     * Reponse de type no content
     *
     * @param {string} message
     * @param {any} result
     * @return {any}
     */
    respondNoContent(message, result) {
        return this.respondSuccess(message, result, Message.HTTP_NO_CONTENT);
    }
    noContent(message, result) {
        return this.respondNoContent(message, result);
    }
    /**
     * Reponse de type not acceptable
     *
     * @param {string} message
     * @param {any} errors
     * @return {any}
     */
    respondNotAcceptable(message, errors) {
        return this.respondError(message, Message.HTTP_NOT_ACCEPTABLE, errors);
    }
    notAcceptable(message, errors) {
        return this.respondNotAcceptable(message, errors);
    }
    /**
     * Reponse de type not found
     *
     * @param {string} message
     * @param {any} errors
     * @return {any}
     */
    respondNotFound(message, errors) {
        return this.respondError(message, Message.HTTP_NOT_FOUND, errors);
    }
    notFound(message, errors) {
        return this.respondNotFound(message, errors);
    }
    /**
     * Reponse de type not implemented
     *
     * @param {string} message
     * @param {any} errors
     * @return {any}
     */
    respondNotImplemented(message, errors) {
        return this.respondError(message, Message.HTTP_NOT_IMPLEMENTED, errors);
    }
    notImplemented(message, errors) {
        return this.respondNotImplemented(message, errors);
    }
    /**
     * Reponse de type ok
     *
     * @param {string} message
     * @param {any} result
     * @return {any}
     */
    respondOk(message, result) {
        return this.respondSuccess(message, result, Message.HTTP_OK);
    }
    ok(message, result) {
        return this.respondOk(message, result);
    }
    /**
     * Reponse de type unauthorized
     *
     * @param {string} message
     * @param {any} errors
     * @return {any}
     */
    respondUnauthorized(message, errors) {
        return this.respondError(message, Message.HTTP_UNAUTHORIZED, errors);
    }
    unauthorized(message, errors) {
        return this.respondUnauthorized(message, errors);
    }
    /**
     * Rend une reponse generique au client
     *
     * @param {any} data
     * @param {number} status
     * @returns
     */
    respond(data, status) {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.send(data, status || 200);
    }
    /**
     * Renvoi un message de succes au client
     *
     * @param {String} message
     * @param {any} result
     * @param {number} status
     */
    respondSuccess(message, result, status) {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.success(message, result, status || 200);
    }
    /**
     * Renvoi un message d'erreur au client
     *
     * @param {String} message
     * @param {number} status
     * @param {any} errors
     * @returns
     */
    respondError(message, status, errors) {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.fail(message, status || 500, errors || undefined);
    }
};
