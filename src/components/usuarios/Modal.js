import React from 'react'

export default function Modal({ titulo, guardar, element, change, errorEnvio, reset }) {

    const guardarElement = (e) => {
        e.preventDefault()
        guardar()
    }

    const changeInput = (e) => {
        change(e)
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex={0} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Crear {titulo}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={reset}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={guardarElement}>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                                <input type="text" className="form-control" id="recipient-name" onChange={changeInput} value={element.nombre} name={"nombre"} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="recipient-email" className="col-form-label">Email:</label>
                                <input type="email" className="form-control" id="recipient-email" onChange={changeInput} value={element.email} name={"email"} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={reset}>Cerrar</button>
                                <button type="submit" className="btn btn-success" disabled={element.nombre.length < 1}>Guardar</button>
                            </div>
                            {errorEnvio.status && (<div className="d-flex justify-content-center alert alert-danger" role="alert"> {`${errorEnvio.msg}!!`}</div>)}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
