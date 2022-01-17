"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (_a = class Message {
        constructor(req, res) {
            this._req = req;
            this._res = res;
        }
        /**
         * Retrieves the HTTP protocol version as a string.
         *
         * The string MUST contain only the HTTP version number (e.g., "1.1", "1.0").
         *
         * @return string HTTP protocol version.
         */
        getProtocolVersion() {
            return 'HTTP/1.1';
        }
        /**
         * Return an instance with the specified HTTP protocol version.
         *
         * @param string $version HTTP protocol version
         * @return static
         */
        withProtocolVersion(version) {
            return this;
        }
        /**
         * Retrieves all message header values.
         *
         * @return {string[][]} Returns an associative array of the message's headers. Each
         *     key MUST be a header name, and each value MUST be an array of strings
         *     for that header.
         */
        getHeaders() {
            return this._req.headers;
        }
        /**
         * Checks if a header exists by the given case-insensitive name.
         *
         * @param {string} name Case-insensitive header field name.
         * @return {boolean} Returns true if any header names match the given header
         *     name using a case-insensitive string comparison. Returns false if
         *     no matching header name is found in the message.
         */
        hasHeader(name) {
            return false;
        }
        /**
         * Retrieves a message header value by the given case-insensitive name.
         *
         * @param {string} name Case-insensitive header field name.
         * @return {string[]} An array of string values as provided for the given
         *    header. If the header does not appear in the message, this method MUST
         *    return an empty array.
         */
        getHeader(name) {
            const headers = this.getHeaders();
            name = name.toLowerCase();
            const header = headers[name];
            if (!header) {
                return [];
            }
            if (typeof header === 'string') {
                return [header];
            }
            return header;
        }
        /**
         * Retrieves a comma-separated string of the values for a single header.
         *
         * @param {string} name Case-insensitive header field name.
         * @return {string} A string of values as provided for the given header
         *    concatenated together using a comma. If the header does not appear in
         *    the message, this method MUST return an empty string.
         */
        getHeaderLine(name) {
            return this.getHeader(name).join(', ');
        }
        /**
         * Return an instance with the provided value replacing the specified header.
         *
         * @param {string} name Case-insensitive header field name.
         * @param {string|string[]} value Header value(s).
         * @return static
         * @throws \InvalidArgumentException for invalid header names or values.
         */
        withHeader(name, value) {
            return this;
        }
        /**
         * Return an instance with the specified header appended with the given value.
         *
         * @param {string} name Case-insensitive header field name to add.
         * @param {string|string[]} value Header value(s).
         * @return static
         * @throws \InvalidArgumentException for invalid header names or values.
         */
        withAddedHeader(name, value) {
            return this;
        }
        /**
         * Return an instance without the specified header.
         *
         * @param {string} name Case-insensitive header field name to remove.
         * @return static
         */
        withoutHeader(name) {
            return this;
        }
        /**
         * Gets the body of the message.
         *
         * @return {any} Returns the body as a stream.
         */
        getBody() {
            return null;
        }
        /**
         * Return an instance with the specified message body.
         *
         * @param {any} $body Body.
         * @return static
         * @throws \InvalidArgumentException When the body is not valid.
         */
        withBody(body) {
            return this;
        }
    },
    /**
     * Common HTTP status codes and their respective description.
     *
     * @link http://www.restapitutorial.com/httpstatuscodes.html
     */
    _a.HTTP_OK = 200,
    _a.HTTP_CREATED = 201,
    _a.HTTP_NO_CONTENT = 204,
    _a.HTTP_NOT_MODIFIED = 304,
    _a.HTTP_BAD_REQUEST = 400,
    _a.HTTP_UNAUTHORIZED = 401,
    _a.HTTP_FORBIDDEN = 403,
    _a.HTTP_NOT_FOUND = 404,
    _a.HTTP_METHOD_NOT_ALLOWED = 405,
    _a.HTTP_NOT_ACCEPTABLE = 406,
    _a.HTTP_CONFLICT = 409,
    _a.HTTP_INVALID_TOKEN = 498,
    _a.HTTP_INTERNAL_ERROR = 500,
    _a.HTTP_NOT_IMPLEMENTED = 501,
    _a);
