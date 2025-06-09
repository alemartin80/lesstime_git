export interface Tamaño {
    nombre: string;
    precio: number;
}
export interface Opcion {
    nombre: string;
    suplemento?: number;
}
export interface Producto {
    nombre: string;
    descripcion?: string;
    iva: number;
    tamaños?: Tamaño[];
    precio?: number;
    opciones?: Opcion[];
}
