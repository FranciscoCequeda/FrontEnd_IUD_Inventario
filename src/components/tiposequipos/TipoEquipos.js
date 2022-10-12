import React, { useEffect, useState } from 'react'
import { borrarEquipoByID, crearEquipos, getEquipos } from '../../services/tipoEquiposService';
import dayjs from 'dayjs';
import Modal from '../ui/Modal';

export default function TipoEquipos() {

  const [tipoEquipo, setTipoEquipo] = useState([])
  const [load, setLoad] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [equipo, setEquipo] = useState({
    nombre: '',
    estado: true
  })

  const [errorEnvio, setErrorEnvio] = useState({
    status: false, msg: ''
  })

  const listarEquipos = async () => {
    setLoad(true)
    try {
      setError(false)
      const { data } = await getEquipos(query)
      setTipoEquipo(data);
      setLoad(false)
    } catch (e) {
      console.log(e);
      setError(true)
      setLoad(false)
      setTipoEquipo([])
    }
  }

  useEffect(() => {
    listarEquipos()
  }, [query]
  )

  const cambiarSwitch = () => {
    setQuery(!query)
  }

  const guardarEquipo = async () => {
    try {
      await crearEquipos(equipo)
      setLoad(true)
      setEquipo({ nombre: '' })
      setErrorEnvio({ status: false, msg: '' })
      listarEquipos();
    } catch (e) {
      const { status, data } = e.response
      if (status === 400) {
        console.log(data.msg);
        setErrorEnvio({ status: true, msg: data.msg })
      }
      console.log(e);
      setLoad(false)
    }
  }

  const changeInput = (e) => {
    setEquipo({ ...equipo, [e.target.name]: e.target.value })
  }

  const resetFields = () => {
    setErrorEnvio({
      status: false, msg: ''
    })
    setEquipo({ nombre: '' })
  }

  const borrarEquipo = async (e) => {
    try {
      const id = e.target.id
      console.log(id);
      const res = await borrarEquipoByID(id)
      console.log(res);
      listarEquipos()
    } catch (e) {
      console.log(e);
    }
  }

  const editartipoEquipo = async (e) => {
    e.preventDefault();
    console.log('editar');
  }


  return (
    <div className='container'>

      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={query} onChange={cambiarSwitch} />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Inactivo / Activo</label>
      </div>

      <table className="table table-striped table-bordered" >
        <thead>
          <tr >
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Creado</th>
            <th scope="col">Actualizado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            tipoEquipo.map((tipoEquipo, i) => {
              return (
                <tr key={tipoEquipo._id}>
                  <th scope="row" className='align-middle'>{i + 1}</th>
                  <td className='align-middle'>{tipoEquipo.nombre}</td>
                  <td className="align-middle">{tipoEquipo.estado ? 'Activo' : 'Inactivo'}</td>
                  <td className='align-middle'>{dayjs(tipoEquipo.fecha_creacion).format('YYYY-MM-DD')}</td>
                  <td className='align-middle'>{dayjs(tipoEquipo.fecha_actualizacion).format('YYYY-MM-DD')}</td>
                  <td className='align-middle'>
                    <button id={tipoEquipo._id} type="button" className="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal2"><i className="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" id={tipoEquipo._id} className="btn btn-danger btn-sm" onClick={borrarEquipo}><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              )
            })

          }
          {
            load && (
              <td colSpan="6">
                <div className="d-flex justify-content-center">
                  <div className="spinner-grow text-dark " role="status">
                  </div>
                </div>
              </td>
            )
          }

        </tbody>

      </table>

      {
        error && (<div className="d-flex justify-content-center alert alert-danger" role="alert"> Error, no se pudo obtener la informacion!!</div>)
      }





      <div className="modal fade" id="exampleModal2" tabIndex={0} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel2">Editar Tipo Equipo</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={editartipoEquipo}>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                  <input type="text" className="form-control" id="recipient-name" onChange={changeInput} value={'hola'} name={"nombre"} />
                  <select className="form-select" aria-label="Default select example" name='estado' value={'hola'}>
                    <option value={true}>Activo</option>
                    <option value={false}>Inactivo</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Editar</button>
                </div>
                {errorEnvio.status && (<div className="d-flex justify-content-center alert alert-danger" role="alert"> {`${errorEnvio.msg}!!`}</div>)}
              </form>
            </div>
          </div>
        </div>
      </div>


      <Modal titulo={'Tipo de Equipo'} guardar={guardarEquipo} element={equipo} change={changeInput} errorEnvio={errorEnvio} reset={resetFields} />

      <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" >
        <i className="fa-sharp fa-solid fa-plus"></i>
        Agregar
      </button>

    </div>

  )
}
