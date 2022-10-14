import React, { useEffect, useState } from 'react'
import { crearUsuarios, getUsuarios, actualizarUsuarioByID, borrarUsuarioByID } from '../../services/usuariosService';
import dayjs from 'dayjs';
import ModalEditar from '../usuarios/ModalEditar';
import Modal from '../usuarios/Modal';
import DialogoConfirmar from '../usuarios/DialogoConfirmar';

export default function Usuarios() {

  const [UsuariosState, setUsuariosState] = useState([])
  const [load, setLoad] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    estado: true
  })

  const [errorEnvio, setErrorEnvio] = useState({
    status: false, msg: ''
  })

  useEffect(() => {
    listarUsuarios()
  }, [query]
  )

  const [usuarioToEdit, setusuarioToEdit] = useState({
    nombre: '',
    email: '',
    estado: true
  })

  const listarUsuarios = async () => {
    setLoad(true)
    try {
      setError(false)
      const { data } = await getUsuarios(query)
      console.log(data);
      setUsuariosState(data.usuarioDB);
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

  const guardarUsuario = async () => {
    try {
      await crearUsuarios(usuario)
      setLoad(true)
      setUsuario({ nombre: '', email: '' })
      setErrorEnvio({ status: false, msg: '' })
      listarUsuarios();
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
    setUsuario({ ...usuario, [e.target.name]: e.target.value })
  }

  const resetFields = () => {
    setErrorEnvio({
      status: false, msg: ''
    })
    setUsuario({ nombre: '', email: '' })
  }

  const borrarUsuario = async () => {
    try {
      const res = await borrarUsuarioByID(usuarioToEdit._id)
      console.log(res);
      listarUsuarios()
    } catch (e) {
      console.log(e);
    }
  }

  const setearUsuario = (e) => {
    try {
      const id = e.target.id;
      const usuario = UsuariosState.filter(usuario => usuario._id == id)
      const { ...objUsuario } = usuario[0]
      setusuarioToEdit(objUsuario)
    } catch (error) {
      console.log(error);
    }
  }

  const changeUsuario = (e) => {
    setusuarioToEdit({ ...usuarioToEdit, [e.target.name]: e.target.value })
  }

  const resetearUsuario = () => {
    setusuarioToEdit({
      nombre: '',
      email: '',
      estado: true
    })
  }

  const editarTipoUsuario = async (e) => {
    e.preventDefault()
    setLoad(true)
    try {
      setError(false)
      const resp = await actualizarUsuarioByID(usuarioToEdit._id, usuarioToEdit);
      console.log(resp)
      resetearUsuario()
      listarUsuarios()
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
            <th scope="col">Email</th>
            <th scope="col">Estado</th>
            <th scope="col">Creado</th>
            <th scope="col">Actualizado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            UsuariosState.map((usuario, i) => {
              return (
                <tr key={usuario._id}>
                  <th scope="row" className='align-middle'>{i + 1}</th>
                  <td className='align-middle'>{usuario.nombre}</td>
                  <td className='align-middle'>{usuario.email}</td>
                  <td className="align-middle">{usuario.estado ? 'Activo' : 'Inactivo'}</td>
                  <td className='align-middle'>{dayjs(usuario.fecha_creacion).format('YYYY-MM-DD')}</td>
                  <td className='align-middle'>{dayjs(usuario.fecha_actualizacion).format('YYYY-MM-DD')}</td>
                  <td className='align-middle'>
                    <button id={usuario._id} type="button" className="btn btn-warning btn-sm fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={setearUsuario} name='editar'></button>
                    <button type="button" id={usuario._id} className="btn btn-danger btn-sm fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#modalDelete" onClick={setearUsuario}></button>
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

      <DialogoConfirmar usuarioToEdit={usuarioToEdit} borrarusuario={borrarUsuario} />

      <ModalEditar titulo={'Usuario'} errorEnvio={errorEnvio} usuario={usuarioToEdit} resetearusuario={resetearUsuario} changeUsuario={changeUsuario} editar={editarTipoUsuario} />


      <Modal titulo={'Usuario'} guardar={guardarUsuario} element={usuario} change={changeInput} errorEnvio={errorEnvio} reset={resetFields} />

      <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" >
        <i className="fa-sharp fa-solid fa-plus"></i>
        Agregar
      </button>

    </div>

  )
}
