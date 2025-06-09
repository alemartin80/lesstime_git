import { Producto } from '../interfaces/producto.interface';
import { Traduccion } from '../interfaces/traduccion.interface';
export declare function calcularPrecioConIVA(base: number, iva: number): number;
export declare function validarProducto(producto: Producto): boolean;
export declare function getTexto(elementos: Traduccion[], idioma: string): string;
