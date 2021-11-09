"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Route_matches, _Route_params, _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('./Router');
const fs_1 = __importDefault(require("fs"));
const { trim } = require('php-in-js/modules/string');
const { call_user_func_array } = require('php-in-js/modules/functions');
module.exports = (_a = class Route {
        constructor(path, callable) {
            /**
             * @var {Array}
             */
            _Route_matches.set(this, []);
            /**
             * @var {Object}
             */
            _Route_params.set(this, {});
            this.path = trim(path, '/');
            this.callable = callable;
        }
        /**
         *
         * @param {String} param
         * @param {String} regex
         * @returns {Route}
         */
        with(param, regex) {
            __classPrivateFieldSet(this, _Route_params, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _Route_params, "f")), { [param]: regex.replace('(', '(?:') }), "f");
            return this;
        }
        /**
         * Verifie si une route matche une URL
         *
         * @param {String} url
         * @returns {Boolean}
         */
        match(url) {
            url = trim(url, '/');
            //let path = this.path.replace(, '([^/]+)');
            let path = this.path.replace(/:([\w]+)/, (match) => {
                if (match[1] in __classPrivateFieldGet(this, _Route_params, "f")) {
                    return '(' + __classPrivateFieldGet(this, _Route_params, "f")[match[1]] + ')';
                }
                return '([^/]+)';
            });
            const regex = new RegExp(`^${path}$`, 'i');
            const matches = url.match(regex);
            if (matches == null) {
                return false;
            }
            matches.shift();
            __classPrivateFieldSet(this, _Route_matches, matches, "f");
            return true;
        }
        /**
         * Execute le callback au cas où la route matche l'URL
         *
         * @param {Router} router
         * @param {Object} path
         * @param {*} req
         * @param {*} res
         * @returns
         */
        call(router, path, req, res) {
            let params = __classPrivateFieldGet(this, _Route_matches, "f");
            params.push(...[req, res]);
            if (this.callable instanceof Function) {
                return call_user_func_array(this.callable, params);
            }
            const parts = this.callable.split('@');
            let controller = parts.shift();
            if (!(controller === null || controller === void 0 ? void 0 : controller.endsWith('Controller'))) {
                controller += 'Controller';
            }
            let method = parts.shift();
            if (method == undefined || typeof method == 'undefined' || method == null) {
                method = router.getDefaultMethod();
            }
            if (!fs_1.default.existsSync(`${path.CONTROLLER_DIR}/${controller}.js`)) {
                throw Error('Controller file "' + controller + '.js" do not exist');
            }
            const classe = require(`${path.CONTROLLER_DIR}/${controller}`);
            const obj = new classe(path);
            if (!(method in obj)) {
                throw Error(`Methode "${method}" non definie dans le controleur ${controller}`);
            }
            return call_user_func_array([obj, method], params);
        }
        /**
         * Genere l'url d'une route avec les parametres
         *
         * @param {Object} params
         * @returns {String}
         */
        getUrl(params) {
            let path = this.path;
            for (let k in params) {
                path = path.replace(':' + k, params[k]);
            }
            return path;
        }
    },
    _Route_matches = new WeakMap(),
    _Route_params = new WeakMap(),
    _a);
