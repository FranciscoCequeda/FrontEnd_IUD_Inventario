import { axiosConfig } from "../configuration/axiosConfig";

/* 
*Crear tipos de equipo
*/
const crearInventarios = (data) => {
    return axiosConfig.post('/inventarios/create', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


/* 
*Consultar tipos de equipo
*/
const getInventarios = (estado) => {
    return axiosConfig.get('/inventarios/all?estado=' + estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/* 
*Consultar tipos de equipos por ID
*/
const getInventarioByID = (id) => {
    return axiosConfig.get('/inventarios/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/* 
*Actualizar tipos de equipos por ID
*/
const actualizarInventarioByID = (id, data) => {
    return axiosConfig.put('/inventarios/update/' + id, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


/* 
*Borrar tipos de equipos por ID
*/
const borrarInventarioByID = (id) => {
    return axiosConfig.delete('/inventarios/delete/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export {
    crearInventarios, getInventarios, getInventarioByID, actualizarInventarioByID, borrarInventarioByID
}