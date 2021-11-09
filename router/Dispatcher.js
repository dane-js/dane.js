"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Dispatcher_router, _Dispatcher_path, _Dispatcher_models, _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const { call_user_func_array } = require('php-in-js/modules/functions');
const { trim, ucfirst } = require('php-in-js/modules/string');
const Router = require('./Router');
module.exports = (_a = class Dispatcher {
        constructor(path, models) {
            /**
             * @var {Router}
             */
            _Dispatcher_router.set(this, void 0);
            /**
             * @var {object}
             */
            _Dispatcher_path.set(this, void 0);
            _Dispatcher_models.set(this, void 0);
            __classPrivateFieldSet(this, _Dispatcher_router, require(`${path.CONFIG_DIR}/routes`)(new Router), "f");
            __classPrivateFieldSet(this, _Dispatcher_path, path, "f");
            __classPrivateFieldSet(this, _Dispatcher_models, models, "f");
        }
        dispatch(req, res, next) {
            const routes = __classPrivateFieldGet(this, _Dispatcher_router, "f").getRoutes(req.method);
            if (!routes) {
                throw Error('REQUEST_METHOD does not exist');
            }
            let routeMached = false;
            for (let i = 0; i < routes.length; i++) {
                const route = routes[i];
                if (route.match(req.url)) {
                    routeMached = true;
                    return route.call(__classPrivateFieldGet(this, _Dispatcher_router, "f"), __classPrivateFieldGet(this, _Dispatcher_path, "f"), req, res);
                }
            }
            if (!routeMached) {
                if (false === __classPrivateFieldGet(this, _Dispatcher_router, "f").getAutoRoute()) {
                    throw Error('Not routes found for this URL');
                }
                else {
                    let parts = trim(req.url, '/').split('/');
                    let controller = parts.shift();
                    if (controller.toLowerCase() !== 'favicon.ico') {
                        if (!controller.endsWith('Controller')) {
                            controller += 'Controller';
                        }
                        controller = ucfirst(controller);
                        let method = parts.shift();
                        if (!method || typeof method == 'undefined' || method == null) {
                            method = __classPrivateFieldGet(this, _Dispatcher_router, "f").getDefaultMethod();
                        }
                        if (!fs.existsSync(`${__classPrivateFieldGet(this, _Dispatcher_path, "f").CONTROLLER_DIR}/${controller}.js`)) {
                            throw Error(`Controller file "${__classPrivateFieldGet(this, _Dispatcher_path, "f").CONTROLLER_DIR}/${controller}.js" do not exist`);
                        }
                        const params = [...parts, req, res];
                        const classe = require(`${__classPrivateFieldGet(this, _Dispatcher_path, "f").CONTROLLER_DIR}/${controller}`);
                        const obj = new classe(__classPrivateFieldGet(this, _Dispatcher_path, "f"));
                        obj.initialize(req, res, __classPrivateFieldGet(this, _Dispatcher_models, "f"));
                        if (!(method in obj)) {
                            throw Error(`Methode "${method}" non definie dans le controleur ${controller}`);
                        }
                        return call_user_func_array([obj, method], params);
                    }
                }
            }
        }
    },
    _Dispatcher_router = new WeakMap(),
    _Dispatcher_path = new WeakMap(),
    _Dispatcher_models = new WeakMap(),
    _a);
