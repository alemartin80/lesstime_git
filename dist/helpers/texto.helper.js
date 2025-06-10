"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTexto = getTexto;
function getTexto(elementos, idioma) {
    console.log('getTexto', elementos, idioma);
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
