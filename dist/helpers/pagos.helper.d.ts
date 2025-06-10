import { Establecimiento } from '../interfaces/establecimiento.interface';
import { Pago } from '../interfaces/pago.interface';
import { Producto } from '../interfaces/producto.interface';
export declare function modelarPago(http: any, establecimiento: Establecimiento, origen: string, lesstime: boolean, tipo: string, uidTipo: string, tipoPago: string, cantidadObjeto: any, saldoAPagar: any, propina: any, tipoFactura: string, datosFactura: any, observaciones: string, productos: Producto[], uidUsuario: string, email: string, telefono: string, production: boolean, urlMoneiPhp: string): Promise<Pago>;
export declare function impuestos(productos: Producto[]): any;
export declare function convertirProductos(productos: Producto[]): any[];
export declare function pagophp(http: any, cantidad: number, orderId: string, descripcion: string, email: string, telefono: string, production: boolean, urlMoneiPhp: string): Promise<any>;
