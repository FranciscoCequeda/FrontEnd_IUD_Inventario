import React from 'react'

export default function ModalEditar({ titulo, editar, errorEnvio, inventarios, resetearinventarios, changeInventario }) {

    const changeEl = (e) => {
        changeInventario(e)
    }

    return (
        <div className="modal fade" id="exampleModal2" tabIndex={0} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel2">Editar {titulo}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetearinventarios}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={editar}>
                            <div className="mb-3">
                                <label htmlFor="recipient-serial" className="col-form-label">Serial:</label>
                                <input type="text" className="form-control" id="recipient-serial" name="serial" value={inventarios.serial} onChange={changeEl} />

                                <label htmlFor="recipient-modelo" className="col-form-label">Modelo:</label>
                                <input type="number" className="form-control" id="recipient-modelo" name="modelo" value={inventarios.modelo} onChange={changeEl} />

                                <label htmlFor="exampleColorInput" className="form-label">Color</label>
                                <input type="color" className="form-control form-control-color" id="color" name='color' value="#563d7c" onChange={changeEl} title="Selecciona el color" />

                                <label htmlFor="recipient-fecha_compra" className="col-form-label">Fecha Compra:</label>
                                <input type="date" className="form-control" id="recipient-fecha_compra" name="fecha_compra" value={inventarios.fecha_compra} onChange={changeEl} />

                                <label htmlFor="recipient-usuario" className="col-form-label">Usuario:</label>
                                <input type="text" className="form-control" id="recipient-usuario" name="usuario" value={!inventarios.usuario} onChange={changeEl} />

                                <label htmlFor="recipient-marca" className="col-form-label">Marca:</label>
                                <input type="text" className="form-control" id="recipient-marca" name="marca" value={inventarios.marca} onChange={changeEl} />

                                <label htmlFor="recipient-estado_equipo" className="col-form-label">Estado Equipo:</label>
                                <input type="text" className="form-control" id="recipient-estado_equipo" name="estado_equipo" value={inventarios.estado_equipo} onChange={changeEl} />

                                <label htmlFor="recipient-tipo_equipo" className="col-form-label">Tipo Equipo:</label>
                                <input type="text" className="form-control" id="recipient-tipo_equipo" name="tipo_equipo" value={inventarios.tipo_equipo} onChange={changeEl} />

                                <select className="form-select" aria-label="Default select example" name='estado' value={inventarios.estado} onChange={changeEl}>
                                    <option value={true}>Activo</option>
                                    <option value={false}>Inactivo</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetearinventarios}>Cancelar</button>
                                <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Editar</button>
                            </div>
                            {errorEnvio.status && (<div className="d-flex justify-content-center alert alert-danger" role="alert"> {`${errorEnvio.msg}!!`}</div>)}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
