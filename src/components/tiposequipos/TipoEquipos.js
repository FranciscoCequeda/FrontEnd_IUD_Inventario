import React, { useEffect, useState } from 'react'
import { actualizarEquipoByID, borrarEquipoByID, crearEquipos, getEquipos } from '../../services/tipoEquiposService';
import dayjs from 'dayjs';
import Modal from '../ui/Modal';
import ModalEditar from '../ui/ModalEditar';
import DialogoConfirmar from '../ui/DialogoConfirmar';

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

  useEffect(() => {
    listarEquipos()
  }, [query]
  )

  const [equipoToEdit, setequipoToEdit] = useState({
    nombre: '',
    estado: true
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

  const borrarEquipo = async () => {
    try {
      const res = await borrarEquipoByID(equipoToEdit._id)
      console.log(res);
      listarEquipos()
    } catch (e) {
      console.log(e);
    }
  }

  const setearEquipo = (e) => {
    try {
      const id = e.target.id;
      const equipo = tipoEquipo.filter(equipo => equipo._id == id)
      const { ...objEquito } = equipo[0]
      setequipoToEdit(objEquito)
    } catch (error) {
      console.log(error);
    }
  }

  const changeEquipo = (e) => {
    setequipoToEdit({ ...equipoToEdit, [e.target.name]: e.target.value })
  }

  const resetearEquipo = () => {
    setequipoToEdit({
      nombre: '',
      estado: true
    })
  }

  const editarTipoEquipo = async (e) => {
    e.preventDefault()
    setLoad(true)
    try {
      setError(false)
      const resp = await actualizarEquipoByID(equipoToEdit._id, equipoToEdit);
      console.log(resp)
      resetearEquipo()
      listarEquipos()
    } catch (e) {
      setLoad(false)
      console.log(e)
      setError(true)
    }

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
                    <button id={tipoEquipo._id} type="button" className="btn btn-warning btn-sm fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={setearEquipo} name='editar'></button>
                    <button type="button" id={tipoEquipo._id} className="btn btn-danger btn-sm fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#modalDelete" onClick={setearEquipo}></button>
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

      <DialogoConfirmar equipoToEdit={equipoToEdit} borrarequipo={borrarEquipo} />

      <ModalEditar titulo={'Tipo de Equipo'} editar={editarTipoEquipo} errorEnvio={errorEnvio} equipo={equipoToEdit} resetearequipo={resetearEquipo} changeEquipo={changeEquipo}  />


      <Modal titulo={'Tipo de Equipo'} guardar={guardarEquipo} element={equipo} change={changeInput} errorEnvio={errorEnvio} reset={resetFields} />

      <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" >
        <i className="fa-sharp fa-solid fa-plus"></i>
        Agregar
      </button>

    </div>

  )
}
