import { Establecimiento } from '../interfaces/establecimiento.interface';
import { Pago } from '../interfaces/pago.interface';
import { Producto } from '../interfaces/producto.interface';
import { Usuario } from '../interfaces/usuario.interface';
import { generarUuid, getID } from './texto.helper';

export async function
  modelarPago(http: any, establecimiento: Establecimiento, origen: string, lesstime: boolean,
    tipo: string, uidTipo: string, tipoPago: string,
    cantidadObjeto: any, saldoAPagar: any, propina: any,
    tipoFactura: string, datosFactura: any,
    observaciones: string,
    productos: Producto[], usuario: Usuario, production: boolean, urlMoneiPhp: string): Promise<Pago> {

  let pago: Pago = {}
  pago.uid = getID();
  pago.url = '';
  pago.id = '';

  if (tipoPago == 'lesstime') {
    //se genera el link

    let urlGenerado = false;
    let cantidad = Number(cantidadObjeto.toFixed(2))
    const respuesta: any = await getPagoMonei(http,
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
  pago.observaciones = observaciones
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
  }
  pago.procesado = false
  let imp = impuestos(productos)
  pago.impuestos = imp.bases;
  pago.zz_fiskaly_enviado = false;
  pago.impuestosTotal = imp.impuestoTotal
  pago.items = convertirProductos(productos);

  return pago
}




export function impuestos(productos: Producto[]): any {
  let bases = [];
  let porcentajes = Array.from(new Set(productos.map(dato => { return dato.porcentajeiva })).values()).sort();
  console.log('porcentajes', porcentajes);
  let resumenImpuestos: any = {};

  for (let i in productos) {
    let p: any = productos[i];
    let porcentajeIva = p.porcentajeiva || 0;

    if (!resumenImpuestos[porcentajeIva]) {
      resumenImpuestos[porcentajeIva] = { cantidad: 0, total: 0 };
    }

    resumenImpuestos[porcentajeIva].cantidad += p.cantidad;
    resumenImpuestos[porcentajeIva].total += p.total;
  }
  // let bases = []
  let impuestoTotal = 0;
  for (let i in resumenImpuestos) {
    let importeTotal = Number(resumenImpuestos[i].total.toFixed(2));
    let porcentajeIva = Number(i);
    let baseImponible = Number((importeTotal / (1 + porcentajeIva / 100)).toFixed(2));
    let impuesto = Number((importeTotal - baseImponible).toFixed(2));
    impuestoTotal += impuesto
    bases.push({ porcentajeIva, baseImponible, impuesto, importeTotal, cantidad: resumenImpuestos[i].cantidad })
  }

  return { bases, impuestoTotal };
}


export function convertirProductos(productos: Producto[]): any[] {

  let items = []
  for (let i in productos) {
    let p: any = productos[i];
    items.push({
      text: p.nombreInterno,
      quantity: p.cantidad.toString(),
      unit_amount: p.precio.toFixed(2).toString(),
      full_amount: p.total.toFixed(2).toString(),
      system: {
        type: "REGULAR",
        category: {
          type: "VAT",
          rate: p.porcentajeiva.toString()
        }
      }
    })
  }
  return items;


}

export function getPagoMonei(http: any, cantidad: number, orderId: string, usuario: Usuario, production: boolean, urlMoneiPhp: string): Promise<any> {
  return new Promise(async resolve => {
    let cantidadPor100 = Number(cantidad * 100).toFixed(0);
    let datos = {
      apiKey: "S8PVCHDEJB1XVX6PM2WNS2N4FDRSA9JP",
      amount: cantidadPor100.toString(),
      currency: "EUR",
      orderId: orderId,
      // description: descripcion,
      email: usuario.email,
      fecha: new Date(),
      phone: usuario.telefono, // null//"+34 605429701"
      production: production
    }

    let myData = JSON.stringify(datos)
    console.log('MyData ', myData)


    http.post(urlMoneiPhp, myData).subscribe((data: any) => {
      let dat: any = data;
      if (dat) {
        let id = dat.id;
        let url = dat.nextAction.redirectUrl;
        resolve({ id, url })

      }
      console.log('data', data)
      console.log('dat', dat)

      resolve(null);
    }, (error: any) => {
      console.log('ERROR', error, datos)

      resolve(null);
    })
  });
}
