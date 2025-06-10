// src/helpers/firebase.helper.ts
import {
    Firestore,
    collection,
    addDoc,
    doc,
    updateDoc,
    setDoc
} from 'firebase/firestore';

/**
 * Inserta un nuevo documento en una colección de Firestore.
 * @param db instancia de Firestore
 * @param path ruta de la colección (por ejemplo: 'productos')
 * @param data objeto a guardar
 */
export async function insertarDocumento(
    db: Firestore,
    path: string,
    data: any
): Promise<string> {
    const colRef = collection(db, path);
    const docRef = await addDoc(colRef, data);
    return docRef.id;
}

/**
 * Actualiza un documento en una colección de Firestore.
 * @param db instancia de Firestore
 * @param path ruta de la colección (por ejemplo: 'productos')
 * @param id ID del documento a actualizar
 * @param data datos a actualizar (parcial o completo)
 */
export async function actualizarDocumento(
    db: Firestore,
    path: string,
    id: string,
    data: Partial<any>
): Promise<void> {
    const docRef = doc(db, path, id);
    await updateDoc(docRef, data);
}

/**
 * Inserta o actualiza un documento con ID fijo
 * @param db instancia de Firestore
 * @param path ruta de la colección
 * @param id ID deseado
 * @param data documento completo a escribir
 */
export async function guardarDocumentoConID(
    db: Firestore,
    path: string,
    id: string,
    data: any
): Promise<void> {
    const docRef = doc(db, path, id);
    await setDoc(docRef, data, { merge: true });
}