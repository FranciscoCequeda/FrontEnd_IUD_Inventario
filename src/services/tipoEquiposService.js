import { axiosConfig } from "../configuration/axiosConfig";

/* 
*Crear tipos de equipo
*/
const crearEquipos = (data) => {
    return axiosConfig.post('/tipoequipos/create', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


/* 
*Consultar tipos de equipo
*/
const getEquipos = (estado = true) => {
    return axiosConfig.get('/tipoequipos/all?estado='+ estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/* 
*Consultar tipos de equipos por ID
*/
const getEquipoByID = (id) => {
    return axiosConfig.get('/tipoequipos/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/* 
*Actualizar tipos de equipos por ID
*/
const actualizarEquipo = (id, data) => {
    return axiosConfig.put('/tipoequipos/update/' + id, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


/* 
*Borrar tipos de equipos por ID
*/
const borrarEquipo = (id) => {
    return axiosConfig.delete('/tipoequipos/delete/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export {
    getEquipos,
    crearEquipos,
    actualizarEquipo,
    borrarEquipo,
    getEquipoByID
}