"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const { call_user_func_array } = require('php-in-js/modules/functions');
const { ucfirst } = require('php-in-js/modules/string');
const { empty } = require('php-in-js/modules/types');
module.exports = (parts, req, res, path, models, router) => {
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
        if (!fs.existsSync(`${path.CONTROLLER_DIR}/${controller}.js`)) {
            throw Error(`Controller file "${path.CONTROLLER_DIR}/${controller}.js" do not exist`);
        }
        const params = [...parts, req, res];
        const classe = require(`${path.CONTROLLER_DIR}/${controller}`);
        const obj = new classe(path);
        obj.initialize(req, res, models);
        if (!method || !(method in obj)) {
            throw Error(`Methode "${method}" non definie dans le controleur ${controller}`);
        }
        return call_user_func_array([obj, method], params);
    }
};
