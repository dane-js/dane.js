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
var _Kernel_path, _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = require('http');
const Dispatcher = require('./router/Dispatcher');
const Db = require('./db/Db');
module.exports = (_a = class Kernel {
        constructor(path) {
            _Kernel_path.set(this, {
                STATIC_DIR: '',
                CONFIG_DIR: ''
            });
            __classPrivateFieldSet(this, _Kernel_path, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _Kernel_path, "f")), path), "f");
        }
        init() {
            const app = (0, express_1.default)();
            const server = http.Server(app);
            const models = Db.initialize(__classPrivateFieldGet(this, _Kernel_path, "f"));
            const dispatcher = new Dispatcher(__classPrivateFieldGet(this, _Kernel_path, "f"), models);
            app.use('/static', express_1.default.static(__classPrivateFieldGet(this, _Kernel_path, "f").STATIC_DIR));
            app.use(express_1.default.urlencoded({ extended: true }));
            app.use(express_1.default.json({ limit: '250mb' }));
            app.use('/', function (req, res, next) {
                return dispatcher.dispatch(req, res, next);
            });
            const { port, host } = require(`${__classPrivateFieldGet(this, _Kernel_path, "f").CONFIG_DIR}/env`);
            server.listen(port, host, () => __awaiter(this, void 0, void 0, function* () {
                yield this.sync(models);
                console.log(`Le serveur a demarré sur l\'hôte http://${host}:${port}`);
            }));
        }
        sync(models) {
            return __awaiter(this, void 0, void 0, function* () {
                const config = Db.getConfig(__classPrivateFieldGet(this, _Kernel_path, "f"));
                if (config.sync) {
                    if ('sequelize' in models) {
                        yield models.sequelize.sync({ alter: true });
                    }
                }
            });
        }
    },
    _Kernel_path = new WeakMap(),
    _a);
