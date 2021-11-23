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
var _Router_PATH, _Router_defaultController, _Router_defaultMethod, _Router_autoRoute, _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Route = require('./Route');
module.exports = (_a = class Router {
        constructor(path) {
            this.routes = {
                get: [],
                post: [],
                put: [],
                patch: [],
                delete: []
            };
            this.namedRoutes = {};
            _Router_PATH.set(this, {}
            /**
             * @var {String}
             */
            );
            /**
             * @var {String}
             */
            _Router_defaultController.set(this, 'Home');
            /**
             * @var {String}
             */
            _Router_defaultMethod.set(this, 'index');
            /**
             * @var {Boolean}
             */
            _Router_autoRoute.set(this, true);
            __classPrivateFieldSet(this, _Router_PATH, path, "f");
        }
        /**
         * Ajoute une route get
         *
         * @param {String} path
         * @param {String|Function} action
         * @param {String} name
         * @param {string|string[]|Function|Function[]} middlewares
         * @returns {Route}
         */
        get(path, action, name, middlewares) {
            return this.add('get', path, action, name, middlewares);
        }
        /**
         * Ajoute une route post
         *
         * @param {String} path
         * @param {String|Function} action
         * @param {String} name
         * @param {string|string[]|Function|Function[]} middlewares
         * @returns {Route}
         */
        post(path, action, name, middlewares) {
            return this.add('post', path, action, name, middlewares);
        }
        /**
         * Ajoute une route put
         *
         * @param {String} path
         * @param {String|Function} action
         * @param {String} name
         * @param {string|string[]|Function|Function[]} middlewares
         * @returns {Route}
         */
        put(path, action, name, middlewares) {
            return this.add('put', path, action, name, middlewares);
        }
        /**
         * Ajoute une route patch
         *
         * @param {String} path
         * @param {String|Function} action
         * @param {String} name
         * @param {string|string[]|Function|Function[]} middlewares
         * @returns {Route}
         */
        patch(path, action, name, middlewares) {
            return this.add('patch', path, action, name, middlewares);
        }
        /**
         * Ajoute une route put
         *
         * @param {String} path
         * @param {String|Function} action
         * @param {String} name
         * @param {string|string[]|Function|Function[]} middlewares
         * @returns {Route}
         */
        delete(path, action, name, middlewares) {
            return this.add('delete', path, action, name, middlewares);
        }
        /**
         * Ajoute une route options
         *
         * @param {String} path
         * @param {String|Function} action
         * @param {String} name
         * @param {string|string[]|Function|Function[]} middlewares
         * @returns {Route}
         */
        options(path, action, name, middlewares) {
            return this.add('options', path, action, name, middlewares);
        }
        /**
         * Ajoute une route
         *
         * @param {String} verb
         * @param {String} path
         * @param {String|Function} action
         * @param {String} name
         * @param {string|string[]|Function|Function[]} middlewares
         * @returns {Route}
         */
        add(verb, path, action, name, middlewares) {
            const route = new Route(path, action, middlewares);
            route.setPATH(__classPrivateFieldGet(this, _Router_PATH, "f"));
            this.routes[verb.toLowerCase()].push(route);
            if (name && typeof name != undefined) {
                this.namedRoutes = Object.assign({}, this.namedRoutes, { [name]: route });
            }
            return route;
        }
        /**
         * Recupere la valeur de l'autoroute
         *
         * @returns {Boolean}
         */
        getAutoRoute() {
            return __classPrivateFieldGet(this, _Router_autoRoute, "f");
        }
        /**
         * Modifie la valeur de l'autoroute
         *
         * @param {Boolean} value
         * @return static
         */
        setAutoRoute(value) {
            __classPrivateFieldSet(this, _Router_autoRoute, value === true, "f");
            return this;
        }
        /**
         * Recupere le controleur par defaut a utiliser
         *
         * @returns {String}
         */
        getDefaultController() {
            return __classPrivateFieldGet(this, _Router_defaultController, "f");
        }
        /**
         * Modifie la valeur du controleur par defaut a utiliser
         *
         * @param {String} value
         * @return static
         */
        setDefaultController(value) {
            __classPrivateFieldSet(this, _Router_defaultController, value, "f");
            return this;
        }
        /**
         * Recupere la methode par defaut a utiliser
         *
         * @returns {String}
         */
        getDefaultMethod() {
            return __classPrivateFieldGet(this, _Router_defaultMethod, "f");
        }
        /**
         * Modifie la valeur de la methode par defaut a utiliser
         *
         * @param {String} value
         * @return static
         */
        setDefaultMethod(value) {
            __classPrivateFieldSet(this, _Router_defaultMethod, value, "f");
            return this;
        }
        /**
         * Renvoi la liste des routes d'une methode HTTP donnée
         *
         * @param {String} verb
         * @returns {Route[]|null}
         */
        getRoutes(verb) {
            return this.routes[verb.toLowerCase()] || null;
        }
        getAllRoutes() {
            return this.routes;
        }
        /**
         * Genere l'url d'une route nommée
         *
         * @param {String} name
         * @param {object} params
         * @returns {String}
         */
        url(name, params) {
            if (typeof params == 'undefined') {
                params = [];
            }
            if (name in this.namedRoutes) {
                return this.namedRoutes[name].getUrl(params);
            }
            throw Error('No route matche this name');
        }
    },
    _Router_PATH = new WeakMap(),
    _Router_defaultController = new WeakMap(),
    _Router_defaultMethod = new WeakMap(),
    _Router_autoRoute = new WeakMap(),
    _a);
