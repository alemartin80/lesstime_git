import { Producto } from '../interfaces/producto.interface';
import { Traduccion } from '../interfaces/traduccion.interface';

export function calcularPrecioConIVA(base: number, iva: number): number {
  return +(base + (base * iva / 100)).toFixed(2);
}

export function validarProducto(producto: Producto): boolean {
  if (!producto.nombre || typeof producto.iva !== 'number') return false;

  const tieneTamaños = Array.isArray(producto.tamaños) && producto.tamaños.length > 0;
  const tienePrecioBase = typeof producto.precio === 'number';

  return tieneTamaños || tienePrecioBase;
}

export function getTexto(elementos: Traduccion[], idioma: string): string {

  try {
    return elementos?.filter((n: any) => {
      return n.idioma == idioma;
    })[0]?.texto || 'sin salida falta traducir'

  } catch (error) {
    console.error('getTraduccion ERROR', elementos, error)
    return 'sin salida falta traducir'
  }

}