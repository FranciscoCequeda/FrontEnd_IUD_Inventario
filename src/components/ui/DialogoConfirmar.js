import React from 'react'

export default function DialogoConfirmar({ equipoToEdit, borrarequipo }) {

    console.log(equipoToEdit);

    return (
        <div className="modal fade" id="modalDelete" tabIndex={0} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Confirmar Borrado?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label">Elemento:</label>
                                <input type="text" className="form-control" id="nombre" value={equipoToEdit.nombre} disabled />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label">Estado:</label>
                                <input type="text" className="form-control" id="estado" value={equipoToEdit.estado ? "Activo" : "Inactivo"} disabled />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">NO</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={borrarequipo}>SI</button>
                    </div>
                </div>
            </div>
        </div >
    )
}
