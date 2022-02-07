"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message = require('./Message');
const { completeAssign } = require('../utils/objects');
module.exports = class Request extends Message {
    /**
     * Retrieve server parameters.
     *
     * @return {object}
     */
    getServerParams() {
        return {};
    }
    /**
     * Retrieve cookies.
     *
     * @return {object}
     */
    getCookieParams() {
        return this._req.cookies || {};
    }
    /**
     *
     * @param name
     * @returns
     */
    getCookies(name) {
        const cookies = this.getCookieParams();
        if (typeof name === 'string') {
            return cookies[name] || null;
        }
        const result = {};
        name.forEach(key => {
            if (cookies[key]) {
                result[key] = cookies[key];
            }
        });
        return result;
    }
    /**
     * Return an instance with the specified cookies.
     *
     * @param {object} cookies Array of key/value pairs representing cookies.
     * @return static
     */
    withCookieParams(cookies) {
        const clone = completeAssign({}, this);
        cookies.forEach(cookie => {
            clone._res.cookie(cookie.name, cookie.value, cookie.options);
        });
        return clone;
    }
    /**
     * Retrieve query string arguments.
     *
     * @return {object}
     */
    getQueryParams() {
        return this._req.query;
    }
    /**
     * Return an instance with the specified query string arguments.
     *
     * @param {object} query Array of query string arguments, typically from $_GET.
     * @return static
     */
    withQueryParams(query) {
        this._req.query = Object.assign(Object.assign({}, this._req.query), query);
        return this;
    }
    /**
     * Retrieve query string argument.
     *
     * @param {string} name Case-insensitive query string name
     * @return {string | boolean | number}
     */
    getQueryParam(name) {
        return this._req.query[name] || null;
    }
    /**
     * Retrieve request parameters
     *
     * @return {object}
     */
    getParams() {
        return this._req.params;
    }
    /**
     * Retrieve a single request parameter
     *
     * @param {string} name Case-insensitive parameter name
     * @return {any}
     */
    getParam(name) {
        return this._req.params[name] || null;
    }
    /**
     * Retrieve normalized file upload data.
     *
     * @return array An array tree of UploadedFileInterface instances; an empty
     *     array MUST be returned if no data is present.
     */
    getUploadedFiles() {
        return [];
    }
    ;
    /**
     * Create a new instance with the specified uploaded files.
     *
     * @param {Array<any>} uploadedFiles An array tree of UploadedFileInterface instances.
     * @return static
     * @throws \InvalidArgumentException if an invalid structure is provided.
     */
    withUploadedFiles(uploadedFiles) {
        return this;
    }
    /**
     * Retrieve any parameters provided in the request body.
     *
     * @return null|array|object The deserialized body parameters, if any.
     *     These will typically be an array or object.
     */
    getParsedBody() {
        return this._req.body;
    }
    /**
     * Return an instance with the specified body parameters.
     *
     * @param {object} data The deserialized body data. This will
     *     typically be in an array or object.
     * @return {this}
     * @throws \InvalidArgumentException if an unsupported argument type is
     *     provided.
     */
    withParsedBody(data) {
        this._req.body = Object.assign(Object.assign({}, this._req.body), data);
        return this;
    }
    /**
     * Retrieve attributes derived from the request.
     *
     * @return array Attributes derived from the request.
     */
    getAttributes() {
        return JSON.parse(JSON.stringify(this._req));
    }
    /**
     * Retrieve a single derived request attribute.
     *
     * @see getAttributes()
     * @param {string} $name The attribute name.
     * @param {any} $default Default value to return if the attribute does not exist.
     * @return {any}
     */
    getAttribute(name, defaut = null) {
        return this._req[name] || defaut;
    }
    /**
     * Return an instance with the specified derived request attribute.
     *
     * This method allows setting a single derived request attribute as
     * described in getAttributes().
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that has the
     * updated attribute.
     *
     * @see getAttributes()
     * @param string $name The attribute name.
     * @param mixed $value The value of the attribute.
     * @return static
     */
    withAttribute(name, value) {
        this._req[name] = value;
        return this;
    }
    /**
     * Return an instance that removes the specified derived request attribute.
     *
     * This method allows removing a single derived request attribute as
     * described in getAttributes().
     *
     * This method MUST be implemented in such a way as to retain the
     * immutability of the message, and MUST return an instance that removes
     * the attribute.
     *
     * @see getAttributes()
     * @param string $name The attribute name.
     * @return static
     */
    withoutAttribute(name) {
        this._req[name] = null;
        delete this._req[name];
        return this;
    }
    /**
     * Retrieves the message's request target.
     *
     * @return {string}
     */
    getRequestTarget() {
        return '';
    }
    /**
     * Return an instance with the specific request-target.
     *
     * @link http://tools.ietf.org/html/rfc7230#section-5.3 (for the various
     *     request-target forms allowed in request messages)
     * @param {any} requestTarget
     * @return static
     */
    withRequestTarget(requestTarget) {
        return this;
    }
    /**
     * Retrieves the HTTP method of the request.
     *
     * @return string Returns the request method.
     */
    getMethod() {
        return this._req.method;
    }
    /**
     * Return an instance with the provided HTTP method.
     *
     * @param {string } method Case-sensitive method.
     * @return static
     * @throws \InvalidArgumentException for invalid HTTP methods.
     */
    withMethod(method) {
        this._req.method = method;
        return this;
    }
    /**
     * Retrieves the URI instance.
     *
     * @link http://tools.ietf.org/html/rfc3986#section-4.3
     * @return {Uri} Returns a UriInterface instance
     *     representing the URI of the request.
     */
    getUri() {
        return null;
    }
    /**
     * Returns an instance with the provided URI.
     *
     * @link http://tools.ietf.org/html/rfc3986#section-4.3
     * @param {Uri} uri New request URI to use.
     * @param {boolean} preserveHost Preserve the original state of the Host header.
     * @return static
     */
    withUri(uri, preserveHost) {
        preserveHost = preserveHost || false;
        return this;
    }
};
