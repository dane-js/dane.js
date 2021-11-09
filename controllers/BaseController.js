"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require('../http/Request');
const Response = require('../http/Response');
module.exports = class BaseController {
    constructor(path) {
        this.resquest = null;
        this.response = null;
        this.models = {};
        this.path = path;
    }
    initialize(req, res, models) {
        this.resquest = new Request(req);
        this.response = new Response(res);
        this.models = models;
    }
    loadModel(modelName) {
    }
};
