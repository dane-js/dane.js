"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require('../http/Request');
const Response = require('../http/Response');
const fs = require('fs');
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
        this.initPlugins();
    }
    initPlugins() {
        const pluginsConfig = require(this.path.CONFIG_DIR + '/plugins');
        for (let k in pluginsConfig) {
            if (pluginsConfig[k] === true && fs.existsSync(this.path.PLUGIN_DIR + '/' + k)) {
                const plugin = require(this.path.PLUGIN_DIR + '/' + k);
                Object.defineProperties(this, {
                    ['$' + k]: { get: function () { return plugin; } }
                });
            }
        }
    }
};
