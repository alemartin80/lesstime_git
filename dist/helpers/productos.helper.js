"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agruparImpuestos = agruparImpuestos;
exports.convertirProductosMonei = convertirProductosMonei;
function agruparImpuestos(productos) {
    let bases = [];
    let porcentajes = Array.from(new Set(productos.map(dato => { return dato.porcentajeiva; })).values()).sort();
    let resumenImpuestos = {};
    for (let i in productos) {
        let p = productos[i];
        let porcentajeIva = p.porcentajeiva || 0;
        if (!resumenImpuestos[porcentajeIva]) {
            resumenImpuestos[porcentajeIva] = { cantidad: 0, total: 0 };
        }
        resumenImpuestos[porcentajeIva].cantidad += p.cantidad;
        resumenImpuestos[porcentajeIva].total += p.total;
    }
    // let bases = []
    let impuestoTotal = 0;
    for (let i in resumenImpuestos) {
        let importeTotal = Number(resumenImpuestos[i].total.toFixed(2));
        let porcentajeIva = Number(i);
        let baseImponible = Number((importeTotal / (1 + porcentajeIva / 100)).toFixed(2));
        let impuesto = Number((importeTotal - baseImponible).toFixed(2));
        impuestoTotal += impuesto;
        bases.push({ porcentajeIva, baseImponible, impuesto, importeTotal, cantidad: resumenImpuestos[i].cantidad });
    }
    return { bases, impuestoTotal };
}
function convertirProductosMonei(productos) {
    let items = [];
    for (let i in productos) {
        let p = productos[i];
        items.push({
            text: p.nombreInterno,
            quantity: p.cantidad.toString(),
            unit_amount: p.precio.toFixed(2).toString(),
            full_amount: p.total.toFixed(2).toString(),
            system: {
                type: "REGULAR",
                category: {
                    type: "VAT",
                    rate: p.porcentajeiva.toString()
                }
            }
        });
    }
    return items;
}
