import { axiosConfig } from "../configuration/axiosConfig";

/* 
*Crear tipos de equipo
*/
const crearEstados = (data) => {
    return axiosConfig.post('/estados/create', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


/* 
*Consultar tipos de equipo
*/
const getEstados = (estado) => {
    return axiosConfig.get('/estados/all?estado=' + estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/* 
*Consultar tipos de equipos por ID
*/
const getEstadoByID = (id) => {
    return axiosConfig.get('/estados/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/* 
*Actualizar tipos de equipos por ID
*/
const actualizarEstadoByID = (id, data) => {
    return axiosConfig.put('/estados/update/' + id, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


/* 
*Borrar tipos de equipos por ID
*/
const borrarEstadoByID = (id) => {
    return axiosConfig.delete('/estados/delete/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export {
    crearEstados, getEstados, getEstadoByID, actualizarEstadoByID, borrarEstadoByID
}