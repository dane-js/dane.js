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
module.exports = class BaseRepository {
    constructor(db) {
        this.db = {};
        this.model = {};
        this.repoName = null;
        this.db = db;
    }
    setRepoName(repoName) {
        this.repoName = repoName;
        return this;
    }
    getRepoName() {
        return this.repoName;
    }
    initializeModel() {
        const name = this.getRepoName();
        if (name != null && this.db[name]) {
            this.model = this.db[name];
        }
        return this;
    }
    /**
     * Verifie si un element existe deja en base de données
     *
     * @param {object} where
     * @return {boolean}
     */
    exist(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.model.count({ where })) > 0;
        });
    }
};
