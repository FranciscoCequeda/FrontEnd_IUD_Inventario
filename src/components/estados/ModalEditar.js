import React from 'react'

export default function ModalEditar({ titulo, editar, errorEnvio, estado, resetearestado, changeEstado }) {

    const changeEl = (e) => {
        changeEstado(e)
    }

    return (
        <div className="modal fade" id="exampleModal2" tabIndex={0} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel2">Editar {titulo}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetearestado}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={editar}>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                                <input type="text" className="form-control" id="recipient-name" name="nombre" value={estado.nombre} onChange={changeEl} />
                                <select className="form-select" aria-label="Default select example" name='estado' value={estado.estado} onChange={changeEl}>
                                    <option value={true}>Activo</option>
                                    <option value={false}>Inactivo</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetearestado}>Cancelar</button>
                                <button type="submit" className="btn btn-success" data-bs-dismiss="modal" >Editar</button>
                            </div>
                            {errorEnvio.status && (<div className="d-flex justify-content-center alert alert-danger" role="alert"> {`${errorEnvio.msg}!!`}</div>)}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
