"use strict";
exports.completeAssign = (target, ...sources) => {
    sources.forEach(source => {
        let descriptors = Object.keys(source).reduce((descriptors, key) => {
            descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
            return descriptors;
        }, {});
        // Par défaut, Object.assign copie également
        // les symboles énumérables
        Object.getOwnPropertySymbols(source).forEach((sym) => {
            let descriptor = Object.getOwnPropertyDescriptor(source, sym);
            if (descriptor === null || descriptor === void 0 ? void 0 : descriptor.enumerable) {
                descriptors[sym] = descriptor;
            }
        });
        Object.defineProperties(target, descriptors);
    });
    return target;
};
