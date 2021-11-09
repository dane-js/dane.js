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
var _Router_defaultController, _Router_defaultMethod, _Router_autoRoute, _a;
const Route = require('./Route');
module.exports = (_a = class Router {
        constructor() {
            this.routes = {
                get: [],
                post: [],
                put: [],
                patch: [],
                delete: []
            };
            this.namedRoutes = {};
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
        }
        /**
         * Ajoute une route get
         *
         * @param {String} path
         * @param {String|Function} action
         * @param {String} name
         * @returns {Route}
         */
        get(path, action, name) {
            return this.add('get', path, action, name);
        }
        /**
         * Ajoute une route post
         *
         * @param {String} path
         * @param {String|Function} action
         * @param {String} name
         * @returns {Route}
         */
        post(path, action, name) {
            return this.add('post', path, action, name);
        }
        /**
         * Ajoute une route put
         *
         * @param {String} path
         * @param {String|Function} action
         * @param {String} name
         * @returns {Route}
         */
        put(path, action, name) {
            return this.add('put', path, action, name);
        }
        /**
         * Ajoute une route
         *
         * @param {String} verb
         * @param {String} path
         * @param {String|Function} action
         * @param {String} name
         * @returns {Route}
         */
        add(verb, path, action, name) {
            const route = new Route(path, action);
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
         */
        setAutoRoute(value) {
            __classPrivateFieldSet(this, _Router_autoRoute, value === true, "f");
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
         * Renvoi la liste des routes d'une methode HTTP donnée
         *
         * @param {String} verb
         * @returns {Route[]|null}
         */
        getRoutes(verb) {
            return this.routes[verb.toLowerCase()] || null;
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
    _Router_defaultController = new WeakMap(),
    _Router_defaultMethod = new WeakMap(),
    _Router_autoRoute = new WeakMap(),
    _a);
