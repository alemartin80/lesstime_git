import { DatosFactura } from '../interfaces/datos-factura.interface';
import { Establecimiento } from '../interfaces/establecimiento.interface';
import { Pago } from '../interfaces/pago.interface';
import { Producto } from '../interfaces/producto.interface';
import { Usuario } from '../interfaces/usuario.interface';
import { agruparImpuestos, convertirProductosMonei } from './productos.helper';
import { generarUuid, getID } from './texto.helper';

export async function
  modelarPago(http: any, establecimiento: Establecimiento, origen: string, lesstime: boolean,
    tipo: string, uidTipo: string, tipoPago: string,
    cantidadObjeto: any, saldoAPagar: any, propina: any,
    tipoFactura: string, datosFactura: DatosFactura,
    productos: Producto[], usuario: Usuario, production: boolean, urlMoneiPhp: string): Promise<Pago> {


  //Primero creamos el objeto pago y vamos informando los datos 
  let pago: Pago = {}
  pago.uid = getID();
  pago.url = '';
  pago.id = '';
  pago.procesado = false
  pago.fecha = new Date();
  pago.uidUsuario = usuario.uid;
  pago.uidTipo = uidTipo;
  pago.tipo = tipo;
  pago.uidEstablecimiento = establecimiento.uid
  pago.origen = origen;
  pago.lesstime = lesstime;

  pago.prefijo = establecimiento.prefijoFactura || '';
  pago.tipoFactura = tipoFactura
  pago.turno = establecimiento.turno || 0;

  pago.factura_establecimiento = establecimiento.nombre
  pago.factura_cif = establecimiento.cif

  pago.lineaCabeceraTicket = establecimiento.lineaCabeceraTicket || '';
  pago.lineaPieTicket = establecimiento.lineaPieTicket || '';

  if (tipoFactura == 'ticket') {
    pago.factura_nombre = '';
    pago.factura_identificacion = '';
    pago.factura_domicilio = '';
    pago.factura_codigopostal = '';
    pago.factura_telefono = '';
    pago.factura_email = '';
  } else {
    pago.factura_nombre = datosFactura.nombre || '';
    pago.factura_identificacion = datosFactura.identificacion || '';
    pago.factura_domicilio = datosFactura.domicilio || '';
    pago.factura_codigopostal = datosFactura.codigopostal || '';
    pago.factura_telefono = datosFactura.telefono || '';
    pago.factura_email = datosFactura.email || '';

  }
  pago.numeroFactura = 0;

  //Tipo de pago e importes
  pago.tipoPago = tipoPago;
  pago.cantidad = Number((cantidadObjeto).toFixed(2));
  pago.saldo = saldoAPagar;
  pago.propina = propina;
  pago.uuid = generarUuid();
  pago.total = Number(pago.cantidad) + Number(pago.saldo) + Number(pago.propina);

  if (tipoPago == 'saldo') {
    pago.validado = true
    pago.fechaValidacion = new Date();
  } else {
    pago.validado = false
    if (tipoPago == 'lesstime') {
      let urlGenerado = false;
      let cantidad = Number(cantidadObjeto.toFixed(2))
      const respuesta: any = await getURLMONEI(http,
        cantidad, pago.uid, usuario, production, urlMoneiPhp);

      if (respuesta != undefined) {
        urlGenerado = true;
        pago.url = respuesta.url
        pago.id = respuesta.id;
      }

      if (!urlGenerado) {
        throw new Error('Error al generar el enlace de pago');

      }
    }
  }
  
  //Tratamiento de productos... 
  // - calculamos los impuestos
  // - convertimos los productos a formato Monei
  pago.items = convertirProductosMonei(productos);
  let imp = agruparImpuestos(productos)
  pago.impuestos = imp.bases;
  pago.zz_fiskaly_enviado = false;
  pago.impuestosTotal = imp.impuestoTotal

  return pago
}




export function getURLMONEI(http: any, cantidad: number, orderId: string, usuario: Usuario, production: boolean, urlMoneiPhp: string): Promise<any> {
  return new Promise(async resolve => {
    let cantidadPor100 = Number(cantidad * 100).toFixed(0);
    let datos = {
      apiKey: "S8PVCHDEJB1XVX6PM2WNS2N4FDRSA9JP",
      amount: cantidadPor100.toString(),
      currency: "EUR",
      orderId: orderId,
      email: usuario.email,
      fecha: new Date(),
      phone: usuario.telefono,
      production: production
    }

    let myData = JSON.stringify(datos)

    http.post(urlMoneiPhp, myData).subscribe((data: any) => {
      let dat: any = data;
      if (dat) {
        let id = dat.id;
        let url = dat.nextAction.redirectUrl;
        resolve({ id, url })

      }
      resolve(null);
    }, (error: any) => {
      console.log('ERROR', error, datos)

      resolve(null);
    })
  });
}
