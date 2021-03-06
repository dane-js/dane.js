"use strict";
module.exports = class Str {
    /**
     *
     * @param {string} str
     * @returns {string}
     */
    static slugify(str) {
        str = str.toLowerCase().replace(/^\s+|\s+$/g, ''); // trim
        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to = "aaaaeeeeiiiioooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        return str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
    }
    static characters(type) {
        let chars = [];
        if (type == 'numeric') {
            chars = ('0123456789').split('');
        }
        else if (type == 'lower-alphabetic') {
            chars = ('abcdefghijklmnopqrstuvwxyz').split('');
        }
        else if (type == 'upper-alphabetic') {
            chars = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');
        }
        else if (type == 'alphabetic') {
            chars = ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');
        }
        else {
            chars = ('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');
        }
        return chars;
    }
    /**
     * Genere une cle aleatoire
     *
     * @param {number} size
     * @param {string|undefined} type
     * @return {string}
     */
    static generateKey(size, type) {
        size = parseInt(`${size || 6}`);
        let code = '', char = Str.characters(type), taille = char.length;
        for (let i = 0; i < size; i++) {
            code += char[Math.floor(Math.random() * taille)];
        }
        return code;
    }
};
