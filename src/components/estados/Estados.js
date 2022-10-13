import React, { useEffect, useState } from 'react'
import { crearEstados, getEstados, actualizarEstadoByID, borrarEstadoByID } from '../../services/estadoService';
import dayjs from 'dayjs';
import ModalEditar from '../estados/ModalEditar';
import Modal from '../estados/Modal';
import DialogoConfirmar from '../estados/DialogoConfirmar';

export default function Estados() {

  const [EstadosState, setEstadosState] = useState([])
  const [load, setLoad] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [estado, setEstado] = useState({
    nombre: '',
    estado: true
  })

  const [errorEnvio, setErrorEnvio] = useState({
    status: false, msg: ''
  })

  useEffect(() => {
    listarEstados()
  }, [query]
  )

  const [estadoToEdit, setestadoToEdit] = useState({
    nombre: '',
    estado: true
  })

  const listarEstados = async () => {
    setLoad(true)
    try {
      setError(false)
      const { data } = await getEstados(query)
      setEstadosState(data.estadosDB);
      setLoad(false)
      setLoad(false)
    } catch (e) {
      console.log(e);
      setError(true)
      setLoad(false)
      setErrorEnvio([])
    }
  }

  const cambiarSwitch = () => {
    setQuery(!query)
  }

  const guardarEstado = async () => {
    try {
      await crearEstados(estado)
      setLoad(true)
      setEstado({ nombre: '' })
      setErrorEnvio({ status: false, msg: '' })
      listarEstados();
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
    setEstado({ ...estado, [e.target.name]: e.target.value })
  }

  const resetFields = () => {
    setErrorEnvio({
      status: false, msg: ''
    })
    setEstado({ nombre: '' })
  }

  const borrarEstado = async () => {
    try {
      const res = await borrarEstadoByID(estadoToEdit._id)
      console.log(res);
      listarEstados()
    } catch (e) {
      console.log(e);
    }
  }

  const setearEstado = (e) => {
    try {
      const id = e.target.id;
      const estado = EstadosState.filter(estado => estado._id == id)
      const { ...objEstado } = estado[0]
      setestadoToEdit(objEstado)
    } catch (error) {
      console.log(error);
    }
  }

  const changeEstado = (e) => {
    setestadoToEdit({ ...estadoToEdit, [e.target.name]: e.target.value })
  }

  const resetearEstado = () => {
    setestadoToEdit({
      nombre: '',
      estado: true
    })
  }

  const editarTipoEstado = async (e) => {
    e.preventDefault()
    setLoad(true)
    try {
      setError(false)
      const resp = await actualizarEstadoByID(estadoToEdit._id, estadoToEdit);
      console.log(resp)
      resetearEstado()
      listarEstados()
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
            EstadosState.map((estado, i) => {
              return (
                <tr key={estado._id}>
                  <th scope="row" className='align-middle'>{i + 1}</th>
                  <td className='align-middle'>{estado.nombre}</td>
                  <td className="align-middle">{estado.estado ? 'Activo' : 'Inactivo'}</td>
                  <td className='align-middle'>{dayjs(estado.fecha_creacion).format('YYYY-MM-DD')}</td>
                  <td className='align-middle'>{dayjs(estado.fecha_actualizacion).format('YYYY-MM-DD')}</td>
                  <td className='align-middle'>
                    <button id={estado._id} type="button" className="btn btn-warning btn-sm fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={setearEstado} name='editar'></button>
                    <button type="button" id={estado._id} className="btn btn-danger btn-sm fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#modalDelete" onClick={setearEstado}></button>
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

      <DialogoConfirmar estadoToEdit={estadoToEdit} borrarestado={borrarEstado} />

      <ModalEditar titulo={'Estado'} errorEnvio={errorEnvio} estado={estadoToEdit} resetearestado={resetearEstado} changeEstado={changeEstado} editar={editarTipoEstado} />


      <Modal titulo={'Estado'} guardar={guardarEstado} element={estado} change={changeInput} errorEnvio={errorEnvio} reset={resetFields} />

      <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" >
        <i className="fa-sharp fa-solid fa-plus"></i>
        Agregar
      </button>

    </div>

  )
}
