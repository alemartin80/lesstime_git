"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelarServicio = modelarServicio;
exports.enviarComanda = enviarComanda;
const texto_helper_1 = require("./texto.helper");
const firestore_1 = require("firebase/firestore");
const productos_helper_1 = require("./productos.helper");
function modelarServicio(establecimiento, tipo, mesa, nombreServicio, comensales, usuarioInput, reserva = {}) {
    let servicio = {};
    let hoy = new Date();
    servicio.mesas = [];
    servicio.mesasuid = [];
    servicio.sala = '';
    if (mesa.uid != undefined) {
        servicio.mesas.push(mesa);
        servicio.mesasuid.push(mesa.uid);
        servicio.sala = mesa.localizacion;
    }
    servicio.nombreServicio = nombreServicio;
    servicio.lesstime = true;
    servicio.uidEstablecimiento = establecimiento.uid;
    servicio.nombreEstablecimiento = establecimiento.nombre;
    servicio.fotoEstablecimiento = establecimiento.foto;
    servicio.envioComandaLessTime = establecimiento.envioComandaLessTime;
    servicio.cobrarPorComensal = establecimiento.cobrarPorComensal;
    servicio.precioComensalComidaIva = establecimiento.precioComensalComidaIva;
    servicio.precioComensalComidaPorcentajeIva = establecimiento.precioComensalComidaPorcentajeIva;
    servicio.cubiertosPrecio = establecimiento.precioComensalComida;
    servicio.cubiertosNombre = establecimiento.descripcionPrecioComensal;
    servicio.cubiertos = 0;
    if (establecimiento.aceptarMesaAutomatica == true) {
        servicio.estado = 'confirmado';
        servicio.fechaConfirmacion = hoy;
    }
    else {
        servicio.estado = 'pendiente';
    }
    servicio.fotos = [];
    servicio.comensales = comensales;
    servicio.alergenos = [];
    let usuario = {};
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
        servicio.uidEnMesa.push(usuarioInput.uid);
        servicio.comensalesRegistrados = 1;
        servicio.alergenos = usuarioInput.alergenos || [];
    }
    //Informacion de los usuarios
    servicio.uidPendiente = [];
    servicio.usuariosInvitados = [];
    servicio.uidSalida = [];
    servicio.turno = establecimiento.turno;
    servicio.tipo = tipo;
    servicio.utensilios = [];
    //Camarero
    servicio.flag_camarero = false;
    servicio.flag_validarPago = false;
    servicio.flag_utensilios = false;
    servicio.flag_comandaPediente = false;
    servicio.flag_ampliacion = false;
    servicio.comandasEnviadas = 0;
    servicio.valoracionesUid = [];
    servicio.fechaInicio = hoy;
    //info dinero  
    servicio.pendiente = 0;
    servicio.cantidad = 0;
    servicio.total = 0;
    servicio.cubiertos = 0;
    servicio.propina = 0;
    servicio.pendienteValidar = 0;
    servicio.pagoPendiente = false;
    servicio.impuestosTotal = 0;
    servicio.impuestosDetalle = [];
    servicio.pagos = [];
    servicio.pagado = 0;
    //descuentos
    servicio.descuentoProductos = 0;
    servicio.descuentoTotal = 0;
    servicio.descuentoServicio = 0;
    servicio.descuentoCantidad = 0;
    servicio.descuentoTipo = '';
    servicio.descuentoInvitacion = 0;
    servicio.uid = (0, texto_helper_1.getID)();
    if (reserva.uid) {
        servicio.reserva = reserva;
        if (reserva.descuento || 0 > 0) {
            servicio.descuentoCantidad = reserva.descuento || 0;
            servicio.descuentoTipo = 'porcentaje';
        }
    }
    return servicio;
}
function enviarComanda(firestore, coleccion, servicio, productos, observaciones, usuario) {
    let comanda = {};
    comanda.cantidad = productos.reduce((anterior, producto) => anterior + (producto.cantidad || 0), 0);
    comanda.total = Number(productos.reduce((anterior, producto) => anterior + Number(producto.total), 0).toFixed(2));
    comanda.enviadaCocina = new Date();
    comanda.estado = "enviada";
    comanda.observaciones = observaciones;
    comanda.uidUsuario = usuario.uid;
    comanda.nombreUsuario = usuario.nombre;
    let comandasEnviadas = servicio.comandasEnviadas || 0;
    comanda.numeroComanda = comandasEnviadas + 1;
    comanda.qr = 'C_' + servicio.uid + '/)' + comanda.numeroComanda;
    servicio.comandasEnviadas = comandasEnviadas + 1;
    let productosServicio = [];
    productosServicio = [...servicio.productos || []];
    comanda.uid = (0, texto_helper_1.getID)();
    const refServicio = (0, firestore_1.doc)(firestore, coleccion + "/" + servicio.uid);
    const refComanda = (0, firestore_1.doc)(firestore, coleccion + "/" + servicio.uid + "/Comandas/" + comanda.uid);
    const batch = (0, firestore_1.writeBatch)(firestore);
    for (let i in productos) {
        const prod = productos[i];
        prod.enviado = true;
        prod.numeroComanda = servicio.comandasEnviadas;
        const refProducto = (0, firestore_1.doc)(firestore, coleccion +
            "/" +
            servicio.uid +
            "/Productos/" +
            prod.clave);
        batch.update(refProducto, prod);
    }
    productosServicio.push(...productos);
    let salidaImpuestos = (0, productos_helper_1.agruparImpuestos)(productosServicio);
    let servicioTotal = servicio.total || 0;
    let descuentoProductos = servicio.descuentoProductos || 0;
    //Calcular los descuentos
    let auxTotal = Number(servicioTotal.toFixed(2)) + Number(comanda.total.toFixed(2));
    let auxTotalConDescuento = auxTotal - Number(descuentoProductos.toFixed(2));
    let descuentoServicio = 0;
    if (servicio.descuentoTipo == 'cantidad') {
        descuentoServicio = servicio.descuentoCantidad || 0;
    }
    if (servicio.descuentoTipo == 'porcentaje') {
        descuentoServicio = auxTotalConDescuento * (servicio.descuentoCantidad || 0) / 100;
    }
    let pagado = servicio.pagado || 0;
    let descuentoTotal = descuentoProductos + descuentoServicio;
    let pendiente = auxTotalConDescuento - descuentoTotal - pagado;
    batch.update(refServicio, {
        comandasEnviadas: (0, firestore_1.increment)(1),
        cantidad: (0, firestore_1.increment)(comanda.cantidad),
        total: (0, firestore_1.increment)(Number(comanda.total.toFixed(2))),
        flag_comandaPediente: true,
        impuestosTotal: Number(salidaImpuestos.impuestoTotal.toFixed(2)),
        impuestosDetalle: salidaImpuestos.bases,
        descuentoServicio: descuentoServicio,
        pendiente: Number(pendiente.toFixed(2)),
        descuentoTotal: descuentoTotal
    });
    batch.set(refComanda, comanda);
    batch.commit();
}
