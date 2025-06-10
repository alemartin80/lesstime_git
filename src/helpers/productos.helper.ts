import { Producto } from '../interfaces/producto.interface';

export function calcularPrecioConIVA(base: number, iva: number): number {
  return +(base + (base * iva / 100)).toFixed(2);
}

export function validarProducto(producto: Producto): boolean {
  if (!producto.nombre || typeof producto.iva !== 'number') return false;

  const tieneTamaños = Array.isArray(producto.tamaños) && producto.tamaños.length > 0;
  const tienePrecioBase = typeof producto.precio === 'number';

  return tieneTamaños || tienePrecioBase;
}
