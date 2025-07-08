"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservar = reservar;
function reservar(establecimiento, comensales, mesas, localizaciones, horasDescuentos, reservas) {
    const diasReserva = establecimiento.diasReserva || 0;
    const duracionReserva = establecimiento.duracionReserva || 0;
    let horasReservas = establecimiento.horasReserva;
    mesas = mesas.filter(mesa => {
        return mesa.permiteReserva == true && mesa.disponible == true;
    });
    console.log("RBB  antes de docR");
    const fechaFinal = new Date();
    const fechaActual = new Date();
    console.log("RBB  horasReservas", horasReservas);
    fechaFinal.setDate(fechaActual.getDate() + diasReserva);
    const disponible = generarHorariosDisponibles(mesas, reservas, comensales, fechaActual, fechaFinal, horasReservas, horasDescuentos);
    return { fechaFinal: fechaFinal, reservas: reservas, localizaciones: localizaciones, mesas: mesas, diasReserva: diasReserva, duracionReserva: duracionReserva, disponible: disponible };
    ;
}
function generarHorariosDisponibles(mesas, reservas, comensales, fechaActual, fechaFinal, horasReservas, horasDescuentos) {
    // Obtener la fecha actual
    const fechasDisponibles = [];
    console.log('RBB ******EMPIEZA EL PROCESO DE BUSQUEDA');
    let contador = 0;
    const mesasFiltradas = mesas.filter((mesa) => mesa.numeroMinimoComensales || 0 <= comensales && mesa.numeroComensales || 0 >= comensales);
    console.log('RBB ******EMPIEZA EL PROCESO DE BUSQUEDA mesasFiltradas', mesasFiltradas);
    while (fechaActual <= fechaFinal) {
        const fechaString = fechaActual.toISOString().split('T')[0];
        console.log('RBB Fecha a tratar', fechaString);
        // Inicializar la disponibilidad para esta fecha
        let dia = fechaActual.getDay().toString();
        let diaC = convertirDia(dia);
        fechasDisponibles.push({
            fecha: fechaString,
            dia: fechaActual.getDay().toString(),
            diaC: convertirDia(fechaActual.getDay().toString()),
            ocupado: 0,
            disponible: 0,
            porcentajeOcupacion: 0,
            mesasDisponibles: [],
            cerrado: false
        });
        //console.log('fechasDisponibles', fechasDisponibles.length)
        // ver que horario coger
        let horas = horasReservas.filter((hora) => {
            console.log('RBB horasReservas--', hora);
            return hora.dia == diaC;
        });
        //if (horario.length > 0) {
        if (horas.length > 0) {
            if (horas[0].tipo == 'cerrado') {
                fechasDisponibles[contador].cerrado = true;
            }
            else {
                const intervalosReserva = horas[0].horarios;
                const [anio, mes, dia] = fechaString.split('-');
                let fechaR = `${dia}-${mes}-${anio}`;
                console.log('RBB fechaR', fechaR);
                //debugger
                const diaR = horasDescuentos.find((horaReseva) => horaReseva.fecha === fechaR);
                console.log('RBB diaR', diaR);
                // Iterar sobre los intervalos de reserva para esta fecha
                for (const intervalo of intervalosReserva) {
                    // Verificar la disponibilidad de las mesas en este intervalo
                    const mesasDisponibles = verificarDisponibilidadMesas(reservas, fechaString, intervalo, intervalo, mesasFiltradas);
                    let descuento = 0;
                    console.log('RBB intervalo', diaC, intervalo, diaR);
                    if (diaR) {
                        const hora = diaR.horarios.find((h1) => h1.hora == intervalo);
                        console.log('RBB intervalo TENEMOS LA HORA', hora);
                        if (hora) {
                            descuento = hora.porcentaje;
                        }
                    }
                    // Actualizar la disponibilidad para esta fecha
                    fechasDisponibles[contador].disponible += mesasDisponibles.length;
                    fechasDisponibles[contador].ocupado += mesasFiltradas.length - mesasDisponibles.length;
                    let dato = {
                        intervalo: `${intervalo} - ${intervalo}`,
                        mesas: mesasDisponibles,
                        descuento
                    };
                    fechasDisponibles[contador].mesasDisponibles.push(dato);
                }
                // Calcular el porcentaje de ocupación para esta fecha
                fechasDisponibles[contador].porcentajeOcupacion =
                    (fechasDisponibles[contador].ocupado /
                        (fechasDisponibles[contador].ocupado + fechasDisponibles[contador].disponible)) *
                        100;
            }
            // Pasar a la siguiente fecha
            fechaActual.setDate(fechaActual.getDate() + 1);
        }
        else {
            fechaActual.setDate(fechaActual.getDate() + 1);
        }
        contador += 1;
    }
    return fechasDisponibles;
}
function convertirDia(dia) {
    switch (dia) {
        case '0':
            {
                return 'D';
            }
        case '1':
            {
                return 'L';
            }
        case '2':
            {
                return 'M';
            }
        case '3':
            {
                return 'X';
            }
        case '4':
            {
                return 'J';
            }
        case '5':
            {
                return 'V';
            }
        case '6':
            {
                return 'S';
            }
    }
    return '';
}
function verificarDisponibilidadMesas(reservas, fechaString, horaInicio, horaFin, mesasFiltradas) {
    const toMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };
    const inicio = toMinutes(horaInicio);
    const fin = toMinutes(horaFin);
    const mesasOcupadas = reservas.filter((reserva) => {
        if (reserva.fechaString != fechaString)
            return false;
        const resInicio = toMinutes(reserva.hora);
        const resFin = resInicio + Number(reserva.duracion);
        // Verificar superposición de intervalos
        return (resInicio < fin && resFin > inicio);
    }).map((reserva) => reserva.mesa.uid);
    const mesasDisponibles = mesasFiltradas.filter((mesa) => !mesasOcupadas.includes(mesa.uid));
    return mesasDisponibles.map((mesa) => { return mesa.uid; });
}
