"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController = require('./BaseController');
module.exports = class RestfullController extends BaseController {
    constructor() {
        super(...arguments);
        this.response = null;
    }
    respondOk(message, result) {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.success(message, result, 200);
    }
    respondCreated(message, result) {
        var _a;
        return (_a = this.response) === null || _a === void 0 ? void 0 : _a.success(message, result, 201);
    }
};
