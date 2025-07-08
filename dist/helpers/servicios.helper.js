"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelarServicio = modelarServicio;
const texto_helper_1 = require("./texto.helper");
function modelarServicio(establecimiento, tipo, mesa, nombreServicio, comensales, usuarioInput, reserva = {}) {
    //debugger
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
