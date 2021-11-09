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
var _a, _Db_db, _Db_connect, _Db_createModel;
const { DataTypes, Sequelize, Op } = require('sequelize');
const { ucfirst } = require('php-in-js/modules/string');
const fs = require('fs');
const path = require('path');
module.exports = (_a = class Db {
        static initialize($path) {
            const models = {};
            const connection = __classPrivateFieldGet(Db, _a, "m", _Db_connect).call(Db, $path);
            fs.readdirSync($path.MODEL_DIR).filter((file) => {
                return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js' && !file.startsWith('AppModel'));
            })
                .forEach((file) => {
                const model = __classPrivateFieldGet(this, _a, "m", _Db_createModel).call(this, $path, file);
                const name = model.getModelName();
                if (name) {
                    models[name] = model.make(connection);
                }
            });
            Object.keys(models).forEach(modelName => {
                if ('associate' in models[modelName]) {
                    models[modelName].associate(models);
                }
            });
            models.sequelize = connection;
            models.Sequelize = Sequelize;
            models.Op = Op;
            return models;
        }
        static getConfig($path) {
            return require(path.join($path.CONFIG_DIR, '/database'))[process.env.NODE_ENV || 'development'];
        }
    },
    _Db_connect = function _Db_connect($path) {
        if (__classPrivateFieldGet(this, _a, "f", _Db_db) !== null) {
            return __classPrivateFieldGet(this, _a, "f", _Db_db);
        }
        const env = process.env.NODE_ENV || 'development';
        const config = this.getConfig($path);
        __classPrivateFieldSet(this, _a, new Sequelize(config.database, config.username, config.password, {
            host: config.hostname,
            dialect: config.dialect,
            logging: config.logging === true ? console.log : false
        }), "f", _Db_db);
        return __classPrivateFieldGet(this, _a, "f", _Db_db);
    },
    _Db_createModel = function _Db_createModel($path, file) {
        const m = require(path.join($path.MODEL_DIR, file));
        const model = new m(DataTypes, Sequelize, Op);
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
    _a);
