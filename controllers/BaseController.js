"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BaseController_instances, _BaseController_initPlugins, _BaseController_initDb, _BaseController_initRepo, _BaseController_createRepository, _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require('../http/Request');
const Response = require('../http/Response');
const fs = require('fs');
const pij = require('php-in-js/cjs');
const _path = require('path');
module.exports = (_a = class BaseController {
        constructor(path) {
            _BaseController_instances.add(this);
            this.pij = pij;
            this.request = null;
            this.response = null;
            this.db = {};
            this.repo = {};
            this.path = path;
        }
        initialize(req, res, models) {
            this.request = new Request(req, res);
            this.response = new Response(req, res);
            __classPrivateFieldGet(this, _BaseController_instances, "m", _BaseController_initDb).call(this, models);
            __classPrivateFieldGet(this, _BaseController_instances, "m", _BaseController_initPlugins).call(this);
            __classPrivateFieldGet(this, _BaseController_instances, "m", _BaseController_initRepo).call(this);
        }
    },
    _BaseController_instances = new WeakSet(),
    _BaseController_initPlugins = function _BaseController_initPlugins() {
        const pluginsConfig = require(this.path.CONFIG_DIR + '/plugins');
        for (let k in pluginsConfig) {
            if (pluginsConfig[k] == true) {
                let pluginFile = `${this.path.PLUGIN_DIR}/${k}.js`;
                const pluginConfigFile = `${this.path.CONFIG_DIR}/plugin.${k}.js`;
                if (!fs.existsSync(pluginFile)) {
                    pluginFile = `${__dirname}/../plugins/${k}.js`;
                }
                if (fs.existsSync(pluginFile)) {
                    let pluginConfig = {};
                    if (fs.existsSync(pluginConfigFile)) {
                        pluginConfig = require(pluginConfigFile);
                    }
                    const plugin = require(pluginFile);
                    Object.defineProperties(this, {
                        ['$' + k]: { get: function () { return plugin(Object.assign(Object.assign({}, pluginConfig), { path: this.path })); } }
                    });
                }
            }
        }
    },
    _BaseController_initDb = function _BaseController_initDb(models) {
        this.db = models;
        for (let k in models) {
            if (!this.pij.in_array(k, ['sequelize', 'Sequelize', 'Op', 'DataTypes'])) {
                Object.defineProperties(this, {
                    [`${this.pij.ucfirst(k)}Model`]: { get: function () { return models[k]; } }
                });
            }
        }
    },
    _BaseController_initRepo = function _BaseController_initRepo() {
        let repositories = {};
        if (fs.existsSync(this.path.REPOSITORY_DIR)) {
            fs.readdirSync(this.path.REPOSITORY_DIR).filter((file) => {
                return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js' && !file.startsWith('AppRepository'));
            })
                .forEach((file) => {
                const repo = __classPrivateFieldGet(this, _BaseController_instances, "m", _BaseController_createRepository).call(this, file);
                const name = repo.getRepoName();
                if (name) {
                    repositories[name] = repo;
                }
            });
        }
        this.repo = repositories;
        for (let k in repositories) {
            Object.defineProperties(this, {
                [`${this.pij.ucfirst(k)}Repo`]: { get: function () { return repositories[k]; } }
            });
        }
    },
    _BaseController_createRepository = function _BaseController_createRepository(file) {
        const r = require(_path.join(this.path.REPOSITORY_DIR, file));
        const repo = new r(this.db);
        file = file.replace('.js', '').replace(/Repository$/i, '');
        if (null == repo.getRepoName()) {
            repo.setRepoName(this.pij.ucfirst(file));
        }
        return repo.initializeModel();
    },
    _a);
