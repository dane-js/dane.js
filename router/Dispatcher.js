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
const { trim } = require('php-in-js/modules/string');
const Router = require('./Router');
const launcher = require('./launcher');
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
            const URL = req.path;
            if (false === __classPrivateFieldGet(this, _Dispatcher_router, "f").getAutoRoute()) {
                throw Error('Not routes found for this URL');
            }
            else {
                return launcher(trim(URL, '/').split('/'), req, res, __classPrivateFieldGet(this, _Dispatcher_path, "f"), __classPrivateFieldGet(this, _Dispatcher_models, "f"), __classPrivateFieldGet(this, _Dispatcher_router, "f"));
            }
        }
    },
    _Dispatcher_router = new WeakMap(),
    _Dispatcher_path = new WeakMap(),
    _Dispatcher_models = new WeakMap(),
    _a);
