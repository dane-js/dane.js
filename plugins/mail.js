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
const nodemailer = require('nodemailer');
/**
 * Service d'envoie de mail
 *
 * @param {object} config
 * @use nodemailer
 * @returns
 */
module.exports = function (config) {
    const data = {
        from: config.from,
        to: null,
        replyTo: null,
        subject: null,
        body: null,
        isHtml: true
    };
    /**
     * Defini l'emeteur de l'email
     *
     * @param {Address} address
     * @param {String} name
     *
     * @returns {self}
     */
    exports.from = (address, name) => {
        if (name && typeof address == 'string') {
            address = { address, name };
        }
        data.from = address;
        return this;
    };
    /**
     * Defini le(s) recepteur(s) de l'email
     *
     * @param {String|Address|Array<Address>} address
     * @param {String} name
     *
     * @returns {this}
     */
    exports.to = (address, name) => {
        if (name && typeof address == 'string') {
            address = { address, name };
        }
        data.to = address;
        return this;
    };
    /**
     * Defini le(s) personnes a qui on doit repondre
     *
     * @param {String|Address|Array<Address>} address
     * @param {String} name
     *
     * @returns {this}
     */
    exports.replyTo = (address, name) => {
        if (name && typeof address == 'string') {
            address = { address, name };
        }
        data.replyTo = address;
        return this;
    };
    /**
     * Defini le sujet du message
     *
     * @param {String} subject
     *
     * @returns {Self}
     */
    exports.subject = (subject) => {
        data.subject = subject;
        return this;
    };
    /**
     * Defini le corps du message
     *
     * @param {String} body
     * @param {Boolean} isHtml
     *
     * @returns {Self}
     */
    exports.body = (body, isHtml) => {
        data.body = body;
        data.isHtml = !(isHtml === false);
        return this;
    };
    /**
     * Envoi du message
     *
     * @param {String | null} filename
     * @param {object} params
     */
    exports.send = (filename, params) => __awaiter(this, void 0, void 0, function* () {
        let transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: false,
            auth: {
                user: config.username,
                pass: config.password, // generated ethereal password
            },
        });
        let message = {
            from: data.from,
            to: data.to,
            replyTo: data.replyTo,
            subject: data.subject,
            html: null,
            text: null
        };
        if (!filename) {
            if (data.isHtml) {
                message.html = data.body;
            }
            else {
                message.text = data.body;
            }
            transporter.sendMail(message);
        }
        else {
            const ejs = require('ejs');
            ejs.renderFile(config.path.VIEW_DIR + '/sendmail/' + filename + '.ejs', params, {}, (err, html) => {
                message.html = html;
                transporter.sendMail(message);
            });
        }
    });
    return this;
};
