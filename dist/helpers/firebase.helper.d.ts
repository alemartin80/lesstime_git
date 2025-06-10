import { Firestore } from 'firebase/firestore';
/**
 * Inserta un nuevo documento en una colección de Firestore.
 * @param db instancia de Firestore
 * @param path ruta de la colección (por ejemplo: 'productos')
 * @param data objeto a guardar
 */
export declare function insertarDocumento(db: Firestore, path: string, data: any): Promise<string>;
/**
 * Actualiza un documento en una colección de Firestore.
 * @param db instancia de Firestore
 * @param path ruta de la colección (por ejemplo: 'productos')
 * @param id ID del documento a actualizar
 * @param data datos a actualizar (parcial o completo)
 */
export declare function actualizarDocumento(db: Firestore, path: string, id: string, data: Partial<any>): Promise<void>;
/**
 * Inserta o actualiza un documento con ID fijo
 * @param db instancia de Firestore
 * @param path ruta de la colección
 * @param id ID deseado
 * @param data documento completo a escribir
 */
export declare function guardarDocumentoConID(db: Firestore, path: string, id: string, data: any): Promise<void>;
