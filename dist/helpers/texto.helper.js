"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTexto = getTexto;
exports.generarUuid = generarUuid;
exports.getID = getID;
const uuid_1 = require("uuid");
function getTexto(elementos, idioma) {
    try {
        return elementos?.filter((n) => {
            return n.idioma == idioma;
        })[0]?.texto || 'sin salida falta traducir';
    }
    catch (error) {
        console.error('getTraduccion ERROR', elementos, error);
        return 'sin salida falta traducir';
    }
}
function generarUuid() {
    return (0, uuid_1.v4)();
}
function getID() {
    return crypto.randomUUID();
}
