"use strict";
const nodemailer = require('nodemailer');
/**
 * Service d'envoie de mail
 *
 * @param {object} config
 * @use nodemailer
 * @returns
 */
module.exports = function (config) {
    return {
        data: {
            from: config.from,
            to: null,
            replyTo: null,
            subject: null,
            body: null,
            isHtml: true
        },
        /**
         * Defini l'emeteur de l'email
         *
         * @param {Address} address
         * @param {String} name
         *
         * @returns {self}
         */
        from(address, name) {
            if (name && typeof address == 'string') {
                address = { address, name };
            }
            this.data.from = address;
            return this;
        },
        /**
         * Defini le(s) recepteur(s) de l'email
         *
         * @param {String|Address|Array<Address>} address
         * @param {String} name
         *
         * @returns {this}
         */
        to(address, name) {
            if (name && typeof address == 'string') {
                address = { address, name };
            }
            this.data.to = address;
            return this;
        },
        /**
         * Defini le(s) personnes a qui on doit repondre
         *
         * @param {String|Address|Array<Address>} address
         * @param {String} name
         *
         * @returns {this}
         */
        replyTo(address, name) {
            if (name && typeof address == 'string') {
                address = { address, name };
            }
            this.data.replyTo = address;
            return this;
        },
        /**
         * Defini le sujet du message
         *
         * @param {String} subject
         *
         * @returns {Self}
         */
        subject(subject) {
            this.data.subject = subject;
            return this;
        },
        /**
         * Defini le corps du message
         *
         * @param {String} body
         * @param {Boolean} isHtml
         *
         * @returns {Self}
         */
        body(body, isHtml) {
            this.data.body = body;
            this.data.isHtml = !(isHtml === false);
            return this;
        },
        /**
         * Envoi du message
         *
         * @param {String | null} filename
         * @param {object} params
         */
        send(filename, params) {
            let transporter = nodemailer.createTransport({
                host: config.host,
                port: config.port,
                secure: config.port == 465,
                auth: {
                    user: config.username,
                    pass: config.password,
                },
            });
            let message = {
                from: this.data.from,
                to: this.data.to,
                replyTo: this.data.replyTo,
                subject: this.data.subject,
                html: null,
                text: null
            };
            if (!filename) {
                if (this.data.isHtml) {
                    message.html = this.data.body;
                }
                else {
                    message.text = this.data.body;
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
        }
    };
};
