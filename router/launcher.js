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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const { call_user_func_array } = require('php-in-js/modules/functions');
const { ucfirst } = require('php-in-js/modules/string');
const { empty } = require('php-in-js/modules/types');
module.exports = (parts, req, res, path, models, io, router) => __awaiter(void 0, void 0, void 0, function* () {
    let controller = parts.shift();
    if ((controller === null || controller === void 0 ? void 0 : controller.toLowerCase()) !== 'favicon.ico') {
        if (empty(controller)) {
            controller = router === null || router === void 0 ? void 0 : router.getDefaultController();
        }
        if (empty(controller)) {
            controller = 'Home';
        }
        if (!(controller === null || controller === void 0 ? void 0 : controller.endsWith('Controller'))) {
            controller += 'Controller';
        }
        controller = ucfirst(controller);
        let method = parts.shift();
        if (empty(method)) {
            method = router === null || router === void 0 ? void 0 : router.getDefaultMethod();
        }
        if (empty(method)) {
            method = 'index';
        }
        method = method.replace(/-/g, '_');
        if (!fs.existsSync(`${path.CONTROLLER_DIR}/${controller}.js`)) {
            throw Error(`Controller file "${path.CONTROLLER_DIR}/${controller}.js" do not exist`);
        }
        const params = [...parts, req, res];
        const classe = require(`${path.CONTROLLER_DIR}/${controller}`);
        const obj = new classe(path);
        yield obj.initialize(req, res, models, io);
        if (!method || !(method in obj)) {
            throw Error(`Methode "${method}" non definie dans le controleur ${controller}`);
        }
        return call_user_func_array([obj, method], params);
    }
});
