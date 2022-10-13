import { axiosConfig } from "../configuration/axiosConfig";

/* 
*Crear tipos de equipo
*/
const crearUsuarios = (data) => {
    return axiosConfig.post('/usuarios/create', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


/* 
*Consultar tipos de equipo
*/
const getUsuarios = (estado) => {
    return axiosConfig.get('/usuarios/all?estado=' + estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/* 
*Consultar tipos de equipos por ID
*/
const getUsuarioByID = (id) => {
    return axiosConfig.get('/usuarios/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/* 
*Actualizar tipos de equipos por ID
*/
const actualizarUsuarioByID = (id, data) => {
    return axiosConfig.put('/usuarios/update/' + id, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


/* 
*Borrar tipos de equipos por ID
*/
const borrarUsuarioByID = (id) => {
    return axiosConfig.delete('/usuarios/delete/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export {
    crearUsuarios, getUsuarios, getUsuarioByID, actualizarUsuarioByID, borrarUsuarioByID
}