"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var _Kernel_instances, _Kernel_PATH, _Kernel_initializeApp, _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const fs_1 = __importDefault(require("fs"));
const Dispatcher = require('./router/Dispatcher');
const Router = require('./router/Router');
const Route = require('./router/Route');
const Db = require('./db/Db');
module.exports = (_a = class Kernel {
        constructor(path) {
            _Kernel_instances.add(this);
            _Kernel_PATH.set(this, {
                STATIC_DIR: '',
                CONFIG_DIR: '',
                CONTROLLER_DIR: '',
                MIDDLEWARE_DIR: '',
                MODEL_DIR: '',
                PLUGIN_DIR: '',
                REPOSITORY_DIR: '',
                VIEW_DIR: '',
            });
            __classPrivateFieldSet(this, _Kernel_PATH, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _Kernel_PATH, "f")), path), "f");
        }
        init() {
            const app = (0, express_1.default)();
            const server = http.Server(app);
            const models = Db.initialize(__classPrivateFieldGet(this, _Kernel_PATH, "f"));
            const corsOptions = require(`${__classPrivateFieldGet(this, _Kernel_PATH, "f").CONFIG_DIR}/cors`);
            app.use(cors(corsOptions));
            app.use(cookieParser());
            app.use('/static', express_1.default.static(__classPrivateFieldGet(this, _Kernel_PATH, "f").STATIC_DIR));
            app.use(express_1.default.urlencoded({ extended: true }));
            app.use(express_1.default.json({ limit: '250mb' }));
            const socketFile = `${__classPrivateFieldGet(this, _Kernel_PATH, "f").CONFIG_DIR}/socket.js`;
            let io = null;
            if (fs_1.default.existsSync(socketFile)) {
                const socket = require(socketFile);
                io = require('socket.io')(server, socket.options || {});
                io = socket.handler(io, models);
            }
            __classPrivateFieldGet(this, _Kernel_instances, "m", _Kernel_initializeApp).call(this, app, models, io);
            const { port, host } = require(`${__classPrivateFieldGet(this, _Kernel_PATH, "f").CONFIG_DIR}/env`);
            server.listen(port, host, () => __awaiter(this, void 0, void 0, function* () {
                yield this.sync(models);
                console.log(`Le serveur a demarré sur l\'hôte http://${host}:${port}`);
            }));
        }
        sync(models) {
            return __awaiter(this, void 0, void 0, function* () {
                const config = Db.getConfig(__classPrivateFieldGet(this, _Kernel_PATH, "f"));
                if (config.sync) {
                    if ('sequelize' in models) {
                        yield models.sequelize.sync({ alter: true });
                    }
                }
            });
        }
    },
    _Kernel_PATH = new WeakMap(),
    _Kernel_instances = new WeakSet(),
    _Kernel_initializeApp = function _Kernel_initializeApp(app, models, io) {
        const app_middlewares = require(`${__classPrivateFieldGet(this, _Kernel_PATH, "f").CONFIG_DIR}/middlewares.js`)([]);
        const middlewares = Route.makeMiddlewares(__classPrivateFieldGet(this, _Kernel_PATH, "f"), app_middlewares);
        if (middlewares.length) {
            app.use(...middlewares);
        }
        const router = require(`${__classPrivateFieldGet(this, _Kernel_PATH, "f").CONFIG_DIR}/routes.js`)(new Router(__classPrivateFieldGet(this, _Kernel_PATH, "f")));
        const routes = router.getAllRoutes();
        for (let key in routes) {
            routes[key].forEach(route => {
                const middlewares = route.getMiddlewares();
                const runner = function (req, res, next) {
                    return route.getRunner(models, io, req, res, next);
                };
                if (key == 'delete') {
                    app.delete(`/${route.getPath()}`, ...middlewares, runner);
                }
                if (key == 'get') {
                    app.get(`/${route.getPath()}`, ...middlewares, runner);
                }
                if (key == 'head') {
                    app.head(`/${route.getPath()}`, ...middlewares, runner);
                }
                if (key == 'post') {
                    app.post(`/${route.getPath()}`, ...middlewares, runner);
                }
                if (key == 'put') {
                    app.put(`/${route.getPath()}`, ...middlewares, runner);
                }
            });
        }
        const dispatcher = new Dispatcher(__classPrivateFieldGet(this, _Kernel_PATH, "f"), models);
        app.use(function (req, res, next) {
            return dispatcher.dispatch(io, req, res, next);
        });
    },
    _a);
