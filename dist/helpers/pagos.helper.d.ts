import { DatosFactura } from '../interfaces/datos-factura.interface';
import { Establecimiento } from '../interfaces/establecimiento.interface';
import { Pago } from '../interfaces/pago.interface';
import { Producto } from '../interfaces/producto.interface';
import { Usuario } from '../interfaces/usuario.interface';
export declare function modelarPago(http: any, establecimiento: Establecimiento, origen: string, lesstime: boolean, tipo: string, uidTipo: string, tipoPago: string, cantidadObjeto: any, saldoAPagar: any, propina: any, tipoFactura: string, datosFactura: DatosFactura, productos: Producto[], usuario: Usuario, production: boolean, urlMoneiPhp: string): Promise<Pago>;
export declare function getURLMONEI(http: any, cantidad: number, orderId: string, usuario: Usuario, production: boolean, urlMoneiPhp: string): Promise<any>;
