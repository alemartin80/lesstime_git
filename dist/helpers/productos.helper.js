"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularPrecioConIVA = calcularPrecioConIVA;
exports.validarProducto = validarProducto;
exports.getTexto = getTexto;
function calcularPrecioConIVA(base, iva) {
    return +(base + (base * iva / 100)).toFixed(2);
}
function validarProducto(producto) {
    if (!producto.nombre || typeof producto.iva !== 'number')
        return false;
    const tieneTamaños = Array.isArray(producto.tamaños) && producto.tamaños.length > 0;
    const tienePrecioBase = typeof producto.precio === 'number';
    return tieneTamaños || tienePrecioBase;
}
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
