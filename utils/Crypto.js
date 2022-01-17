"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = exports.CRYPTO_ENCODER = exports.CRYPTO_ALGO = void 0;
const CryptoJS = require('crypto-js');
var CRYPTO_ALGO;
(function (CRYPTO_ALGO) {
    CRYPTO_ALGO["MD5"] = "md5";
    CRYPTO_ALGO["SHA1"] = "sha1";
    CRYPTO_ALGO["SHA3"] = "sha3";
    CRYPTO_ALGO["SHA256"] = "sha256";
    CRYPTO_ALGO["SHA512"] = "sha512";
    CRYPTO_ALGO["BCRYPT"] = "bcrypt";
})(CRYPTO_ALGO = exports.CRYPTO_ALGO || (exports.CRYPTO_ALGO = {}));
;
var CRYPTO_ENCODER;
(function (CRYPTO_ENCODER) {
    CRYPTO_ENCODER["Hex"] = "hex";
    CRYPTO_ENCODER["Base64"] = "base64";
    CRYPTO_ENCODER["Utf8"] = "utf8";
})(CRYPTO_ENCODER = exports.CRYPTO_ENCODER || (exports.CRYPTO_ENCODER = {}));
;
class Crypto {
    static hash(str, salt = '', options = { algo: CRYPTO_ALGO.SHA512, encoder: CRYPTO_ENCODER.Hex }) {
        let output = '';
        if (options.algo == CRYPTO_ALGO.MD5) {
            output = CryptoJS.MD5(_salt(str, salt));
        }
        else if (options.algo == CRYPTO_ALGO.SHA1) {
            output = CryptoJS.SHA1(_salt(str, salt));
        }
        else if (options.algo == CRYPTO_ALGO.SHA3) {
            let length = 512;
            if ([224, 256, 384, 512].includes(options.length)) {
                length = options.length;
            }
            output = CryptoJS.SHA3(_salt(str, salt), { outputLength: length });
        }
        else if (options.algo == CRYPTO_ALGO.SHA256) {
            output = CryptoJS.SHA256(_salt(str, salt));
        }
        else {
            output = CryptoJS.SHA512(_salt(str, salt));
        }
        let encoder;
        if (options.encoder == undefined) {
            encoder = CryptoJS.enc.Hex;
        }
        else {
            encoder = CryptoJS.enc[options.encoder];
        }
        return output.toString(encoder);
    }
    static verify(str, crypted, salt = '', options = { algo: CRYPTO_ALGO.SHA512, encoder: CRYPTO_ENCODER.Hex }) {
        return Crypto.hash(str, salt, options) == crypted;
    }
}
exports.Crypto = Crypto;
const _salt = (str, salt) => {
    return `danejs${salt}${str}danejs${salt}`;
};
