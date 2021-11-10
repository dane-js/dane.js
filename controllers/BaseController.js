"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BaseController_instances, _BaseController_initPlugins, _BaseController_initDb, _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require('../http/Request');
const Response = require('../http/Response');
const fs = require('fs');
const { in_array } = require('php-in-js/modules/array');
const { ucfirst } = require('php-in-js/modules/string');
module.exports = (_a = class BaseController {
        constructor(path) {
            _BaseController_instances.add(this);
            this.request = null;
            this.response = null;
            this.db = {};
            this.path = path;
        }
        initialize(req, res, models) {
            this.request = new Request(req, res);
            this.response = new Response(req, res);
            __classPrivateFieldGet(this, _BaseController_instances, "m", _BaseController_initDb).call(this, models);
            __classPrivateFieldGet(this, _BaseController_instances, "m", _BaseController_initPlugins).call(this);
        }
    },
    _BaseController_instances = new WeakSet(),
    _BaseController_initPlugins = function _BaseController_initPlugins() {
        const pluginsConfig = require(this.path.CONFIG_DIR + '/plugins');
        for (let k in pluginsConfig) {
            if (pluginsConfig[k] === true && fs.existsSync(`${this.path.PLUGIN_DIR}/${k}.js`)) {
                const plugin = require(`${this.path.PLUGIN_DIR}/${k}.js`);
                Object.defineProperties(this, {
                    ['$' + k]: { get: function () { return plugin; } }
                });
            }
        }
    },
    _BaseController_initDb = function _BaseController_initDb(models) {
        this.db = models;
        for (let k in models) {
            if (!in_array(k, ['sequelize', 'Sequelize', 'Op', 'DataTypes'])) {
                Object.defineProperties(this, {
                    [`${ucfirst(k)}Model`]: { get: function () { return models[k]; } }
                });
            }
        }
    },
    _a);
