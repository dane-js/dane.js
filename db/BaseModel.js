"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BaseModel_instances, _BaseModel_formatOptions, _a;
module.exports = (_a = class BaseModel {
        constructor(types, sequelize, op) {
            _BaseModel_instances.add(this);
            this.types = {};
            this.sequelize = {};
            this.op = {};
            this.schema = {};
            this.options = {};
            this.modelName = null;
            this.tableName = null;
            this.types = types;
            this.sequelize = sequelize;
            this.op = op;
            return this;
        }
        setModelName(modelName) {
            this.modelName = modelName;
            return this;
        }
        getModelName() {
            return this.modelName;
        }
        setTableName(tableName) {
            this.tableName = tableName;
            return this;
        }
        getTableName() {
            return this.tableName;
        }
        associate(models) {
            return models;
        }
        make(connection) {
            return connection.define(this.modelName, this.schema, __classPrivateFieldGet(this, _BaseModel_instances, "m", _BaseModel_formatOptions).call(this));
        }
    },
    _BaseModel_instances = new WeakSet(),
    _BaseModel_formatOptions = function _BaseModel_formatOptions() {
        return Object.assign({}, {
            tableName: this.getTableName()
        }, this.options);
    },
    _a);
