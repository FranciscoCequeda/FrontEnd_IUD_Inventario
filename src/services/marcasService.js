import { axiosConfig } from "../configuration/axiosConfig";

/* 
*Crear tipos de equipo
*/
const crearMarcas = (data) => {
    return axiosConfig.post('/marcas/create', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


/* 
*Consultar tipos de equipo
*/
const getMarcas = (estado) => {
    return axiosConfig.get('/marcas/all?estado=' + estado, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/* 
*Consultar tipos de equipos por ID
*/
const getMarcaByID = (id) => {
    return axiosConfig.get('/marcas/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

/* 
*Actualizar tipos de equipos por ID
*/
const actualizarMarcaByID = (id, data) => {
    return axiosConfig.put('/marcas/update/' + id, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


/* 
*Borrar tipos de equipos por ID
*/
const borrarMarcaByID = (id) => {
    return axiosConfig.delete('/marcas/delete/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export {
    getMarcas,
    crearMarcas,
    actualizarMarcaByID,
    borrarMarcaByID,
    getMarcaByID
}