"use strict";
const axios = require('axios');
/**
 * Service de requetage HTTP
 *
 * @param {object} config
 * @use nodemailer
 * @returns
 */
module.exports = function (config) {
    const _axios = axios.create({
        baseURL: config.baseURL,
        timeout: config.timeout,
        withCredentials: config.withCredentials,
    });
    /**
     * Intercepteur de la requete
     */
    _axios.interceptors.request.use(function (_config) {
        // Faite quelques chose ici avant que la requete ne soit envoyée
        return config.onRequest(_config);
    }, function (error) {
        // Faite quelques chose en cas d'erreur lors de la requete
        return config.onRequestError(error);
    });
    /**
     * Intercepteur de la reponse
     */
    _axios.interceptors.response.use(function (response) {
        // Faites quelques chose avec les données de la reponse
        return config.onResponse(response);
    }, function (error) {
        // Gerer les erreurs de la reponse ici
        return config.onResponseError(error);
    });
    return _axios;
};
