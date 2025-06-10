"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertarDocumento = insertarDocumento;
exports.actualizarDocumento = actualizarDocumento;
exports.guardarDocumentoConID = guardarDocumentoConID;
// src/helpers/firebase.helper.ts
const firestore_1 = require("firebase/firestore");
/**
 * Inserta un nuevo documento en una colección de Firestore.
 * @param db instancia de Firestore
 * @param path ruta de la colección (por ejemplo: 'productos')
 * @param data objeto a guardar
 */
async function insertarDocumento(db, path, data) {
    const colRef = (0, firestore_1.collection)(db, path);
    const docRef = await (0, firestore_1.addDoc)(colRef, data);
    return docRef.id;
}
/**
 * Actualiza un documento en una colección de Firestore.
 * @param db instancia de Firestore
 * @param path ruta de la colección (por ejemplo: 'productos')
 * @param id ID del documento a actualizar
 * @param data datos a actualizar (parcial o completo)
 */
async function actualizarDocumento(db, path, id, data) {
    const docRef = (0, firestore_1.doc)(db, path, id);
    await (0, firestore_1.updateDoc)(docRef, data);
}
/**
 * Inserta o actualiza un documento con ID fijo
 * @param db instancia de Firestore
 * @param path ruta de la colección
 * @param id ID deseado
 * @param data documento completo a escribir
 */
async function guardarDocumentoConID(db, path, id, data) {
    const docRef = (0, firestore_1.doc)(db, path, id);
    await (0, firestore_1.setDoc)(docRef, data, { merge: true });
}
