import { Establecimiento } from '../interfaces/establecimiento.interface';
import { Mesa } from '../interfaces/mesa.interface';
import { Servicio } from '../interfaces/servicio.interface';
import { Traduccion } from '../interfaces/traduccion.interface';
import { v4 as uuidv4 } from 'uuid';
import { UsuarioServicio } from '../interfaces/usuario-servicio.interface';
import { getID } from './texto.helper';
import { Reserva } from '../interfaces/reserva.interface';
import { ProductoComanda } from '../interfaces/producto-comanda.interface';
import { Comanda } from '../interfaces/comanda.interface';
import { collection, doc, Firestore, increment, setDoc, writeBatch } from 'firebase/firestore';
import { agruparImpuestos } from './productos.helper';

export function crearServicio(firestore: Firestore, coleccion: string,
  establecimiento: Establecimiento,
  tipo: string,
  mesa: Mesa,
  nombreServicio: string,
  comensales: number,
  usuarioInput: any, reserva: Reserva = {}) {

  let servicio: Servicio = {};
  let hoy = new Date();
  servicio.mesas = [];
  servicio.mesasuid = [];
  servicio.sala = '';
  if (mesa.uid != undefined) {
    servicio.mesas.push(mesa)
    servicio.mesasuid.push(mesa.uid)
    servicio.sala = mesa.localizacion;

  }
  servicio.nombreServicio = nombreServicio;
  servicio.lesstime = true;

  servicio.uidEstablecimiento = establecimiento.uid;
  servicio.nombreEstablecimiento = establecimiento.nombre;
  servicio.fotoEstablecimiento = establecimiento.foto
  servicio.envioComandaLessTime = establecimiento.envioComandaLessTime
  servicio.cobrarPorComensal = establecimiento.cobrarPorComensal
  servicio.precioComensalComidaIva = establecimiento.precioComensalComidaIva
  servicio.precioComensalComidaPorcentajeIva = establecimiento.precioComensalComidaPorcentajeIva
  servicio.cubiertosPrecio = establecimiento.precioComensalComida
  servicio.cubiertosNombre = establecimiento.descripcionPrecioComensal
  servicio.cubiertos = 0

  if (establecimiento.aceptarMesaAutomatica == true) {
    servicio.estado = 'confirmado';
    servicio.fechaConfirmacion = hoy
  } else {
    servicio.estado = 'pendiente'
  }
  servicio.fotos = [];
  servicio.comensales = comensales
  servicio.alergenos = [];
  let usuario: UsuarioServicio = {};
  servicio.uidTodos = [];
  servicio.usuariosInfo = [];
  servicio.uids = [];
  servicio.uidEnMesa = [];
  servicio.comensalesRegistrados = 0;
  if (usuarioInput.uid != undefined) {
    usuario.uid = usuarioInput.uid;
    usuario.nombre = usuarioInput.nombre;
    usuario.foto = usuarioInput.foto || " ";
    servicio.usuariosInfo.push(usuario);
    servicio.uidTodos.push(usuarioInput.uid);
    servicio.uids.push(usuarioInput.uid);
    servicio.uidEnMesa.push(usuarioInput.uid)
    servicio.comensalesRegistrados = 1;
    servicio.alergenos = usuarioInput.alergenos || [];

  }



  //Informacion de los usuarios

  servicio.uidPendiente = [];
  servicio.usuariosInvitados = [];
  servicio.uidSalida = [];




  servicio.turno = establecimiento.turno
  servicio.tipo = tipo
  servicio.utensilios = [];

  //Camarero

  servicio.flag_camarero = false
  servicio.flag_validarPago = false
  servicio.flag_utensilios = false
  servicio.flag_comandaPediente = false
  servicio.flag_ampliacion = false


  servicio.comandasEnviadas = 0;

  servicio.valoracionesUid = [];
  servicio.fechaInicio = hoy

  //info dinero  
  servicio.pendiente = 0;
  servicio.cantidad = 0;
  servicio.total = 0;
  servicio.cubiertos = 0;
  servicio.propina = 0;
  servicio.pendienteValidar = 0;
  servicio.pagoPendiente = false;
  servicio.impuestosTotal = 0
  servicio.impuestosDetalle = []
  servicio.pagos = [];
  servicio.pagado = 0;
  //descuentos
  servicio.descuentoProductos = 0;
  servicio.descuentoTotal = 0;
  servicio.descuentoServicio = 0;
  servicio.descuentoCantidad = 0;
  servicio.descuentoTipo = '';
  servicio.descuentoInvitacion = 0;
  servicio.uid = getID();
  if (reserva.uid) {
    servicio.reserva = reserva;
    if (reserva.descuento || 0 > 0) {
      servicio.descuentoCantidad = reserva.descuento || 0;
      servicio.descuentoTipo = 'porcentaje';
    }
  }

  setDoc(doc(firestore, coleccion + '' + servicio.uid), servicio);

  return servicio;


}


export function enviarComanda(firestore: Firestore, coleccion: string, servicio: Servicio, productos: ProductoComanda[], observaciones: string, usuario: UsuarioServicio) {
  try {
    console.log('enviarComanda', coleccion, servicio.uid, productos, observaciones, usuario);
    let comanda: Comanda = {};
    comanda.cantidad = productos.reduce((anterior, producto) => anterior + (producto.cantidad || 0), 0);
    comanda.total = Number(productos.reduce((anterior, producto) => anterior + Number(producto.total), 0).toFixed(2));
    comanda.enviadaCocina = new Date();
    comanda.estado = "enviada";
    comanda.observaciones = observaciones;
    comanda.uidUsuario = usuario.uid;
    comanda.nombreUsuario = usuario.nombre;
    let comandasEnviadas: number = servicio.comandasEnviadas || 0;
    comanda.numeroComanda = comandasEnviadas + 1;
    comanda.qr = 'C_' + servicio.uid + '/)' + comanda.numeroComanda;

    servicio.comandasEnviadas = comandasEnviadas + 1;

    let productosServicio: ProductoComanda[] = [];
    productosServicio = [...servicio.productos || []];


    comanda.uid = getID();
    console.log('enviarComanda', coleccion, servicio.uid, comanda.uid, productos);
    const refServicio = doc(
      firestore,
      coleccion + "/" + servicio.uid
    );
    const refComanda = doc(
      firestore,
      coleccion + "/" + servicio.uid + "/Comandas/" + comanda.uid
    );
    console.log('enviarComanda', refServicio, refComanda);
    const batch = writeBatch(firestore);
    console.log('despues de crear el batch');
    for (let i in productos) {
      const prod: any = productos[i];
      prod.enviado = true;
      prod.numeroComanda = servicio.comandasEnviadas;
      const refProducto = doc
        (
          firestore,
          coleccion +
          "/" +
          servicio.uid +
          "/Productos/" +
          prod.clave
        );
      console.log('productos', refProducto);
      batch.update(refProducto, prod);
    }
    productosServicio.push(...productos);
    let salidaImpuestos: any = agruparImpuestos(productosServicio)
    let servicioTotal: number = servicio.total || 0
    let descuentoProductos: number = servicio.descuentoProductos || 0;
    //Calcular los descuentos
    let auxTotal: number = Number(servicioTotal.toFixed(2)) + Number(comanda.total.toFixed(2))
    let auxTotalConDescuento: number = auxTotal - Number(descuentoProductos.toFixed(2));
    let descuentoServicio: number = 0;
    if (servicio.descuentoTipo == 'cantidad') {
      descuentoServicio = servicio.descuentoCantidad || 0;
    }
    if (servicio.descuentoTipo == 'porcentaje') {
      descuentoServicio = auxTotalConDescuento * (servicio.descuentoCantidad || 0) / 100;
    }

    let pagado: number = servicio.pagado || 0;
    let descuentoTotal = descuentoProductos + descuentoServicio;
    let pendiente = auxTotalConDescuento - descuentoTotal - pagado;

    console.log('antes de actualiza servicio');
    batch.update(refServicio, {
      comandasEnviadas: increment(1),
      cantidad: increment(comanda.cantidad),
      total: increment(Number(comanda.total.toFixed(2))),
      flag_comandaPediente: true,
      impuestosTotal: Number(salidaImpuestos.impuestoTotal.toFixed(2)),
      impuestosDetalle: salidaImpuestos.bases,
      descuentoServicio: descuentoServicio,
      pendiente: Number(pendiente.toFixed(2)),
      descuentoTotal: descuentoTotal
    });
    console.log('despues de actualiza servicio');
    batch.set(refComanda, comanda);

    console.log('despues de actualiza comanda');


    batch.commit();
    console.log('despues de commit');
  } catch (error: any) {
    console.error('Error al enviar comanda', error);
    throw new Error('Error al enviar comanda: ' + error.message);
  }


}