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
var _a, _Db_db, _Db_sequelizeOptions, _Db_connect, _Db_createModel;
const { ucfirst } = require('php-in-js/modules/string');
const fs = require('fs');
const path = require('path');
module.exports = (_a = class Db {
        static initialize($path) {
            let models = {};
            const trueModels = {};
            const connection = __classPrivateFieldGet(this, _a, "m", _Db_connect).call(this, $path);
            if (connection === false) {
                return models;
            }
            fs.readdirSync($path.MODEL_DIR).filter((file) => {
                return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js' && !file.startsWith('AppModel'));
            })
                .forEach((file) => {
                const model = __classPrivateFieldGet(this, _a, "m", _Db_createModel).call(this, $path, file);
                const name = model.getModelName();
                if (name) {
                    models[name] = model.make(connection);
                    trueModels[name] = model;
                }
            });
            Object.keys(models).forEach(name => {
                models = Object.assign(Object.assign({}, models), trueModels[name].associate(models));
            });
            models.sequelize = connection;
            models.Sequelize = __classPrivateFieldGet(this, _a, "f", _Db_sequelizeOptions).Sequelize;
            models.Op = __classPrivateFieldGet(this, _a, "f", _Db_sequelizeOptions).Op;
            return models;
        }
        static getConfig($path) {
            const config = require(path.join($path.CONFIG_DIR, '/database'));
            return Object.assign({ enabled: config.enable || false }, config[process.env.NODE_ENV || 'development']);
        }
    },
    _Db_connect = function _Db_connect($path) {
        if (__classPrivateFieldGet(this, _a, "f", _Db_db) !== null) {
            return __classPrivateFieldGet(this, _a, "f", _Db_db);
        }
        const config = this.getConfig($path);
        if (config.enabled === false) {
            return false;
        }
        const { DataTypes, Sequelize, Op } = require('sequelize');
        __classPrivateFieldSet(this, _a, new Sequelize(config.database, config.username, config.password, {
            host: config.hostname,
            dialect: config.dialect,
            logging: config.logging === true ? console.log : false
        }), "f", _Db_db);
        __classPrivateFieldSet(this, _a, { DataTypes, Sequelize, Op }, "f", _Db_sequelizeOptions);
        return __classPrivateFieldGet(this, _a, "f", _Db_db);
    },
    _Db_createModel = function _Db_createModel($path, file) {
        const m = require(path.join($path.MODEL_DIR, file));
        const model = new m(__classPrivateFieldGet(this, _a, "f", _Db_sequelizeOptions).DataTypes, __classPrivateFieldGet(this, _a, "f", _Db_sequelizeOptions).Sequelize, __classPrivateFieldGet(this, _a, "f", _Db_sequelizeOptions).Op);
        file = file.replace('.js', '').replace(/Model$/i, '');
        if (null == model.getModelName()) {
            model.setModelName(ucfirst(file));
        }
        if (null == model.getTableName()) {
            model.setTableName(file.toLowerCase());
        }
        return model;
    },
    _Db_db = { value: null },
    _Db_sequelizeOptions = { value: null },
    _a);
