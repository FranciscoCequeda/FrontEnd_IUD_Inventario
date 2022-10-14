import React, { useEffect, useState } from 'react'
import { crearInventarios, getInventarios, actualizarInventarioByID, borrarInventarioByID } from '../../services/inventarioService';
import dayjs from 'dayjs';
import ModalEditar from '../inventarios/ModalEditar';
import Modal from '../inventarios/Modal';
import DialogoConfirmar from '../inventarios/DialogoConfirmar';

export default function Inventarios() {

  const [InventariosState, setInventariosState] = useState([])
  const [load, setLoad] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [inventarios, setInventario] = useState({
    serial: '',
    modelo: '',
    descripcion: '',
    color: '',
    fecha_compra: '',
    precio: '',
    usuario: '',
    marca: '',
    estado: true,
    tipo_equipo: ''
  })

  const [errorEnvio, setErrorEnvio] = useState({
    status: false, msg: ''
  })

  useEffect(() => {
    listarInventarios()
  }, [query]
  )

  const [inventariosToEdit, setinventariosToEdit] = useState({
    serial: '',
    modelo: '',
    descripcion: '',
    color: '',
    fecha_compra: '',
    precio: '',
    usuario: '',
    marca: '',
    estado: true,
    tipo_equipo: ''
  })

  const listarInventarios = async () => {
    setLoad(true)
    try {
      setError(false)
      const { data } = await getInventarios(query)
      setInventariosState(data.inventarioDB);
      setinventariosToEdit(data.inventarioDB);
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

  const guardarInventario = async () => {
    try {
      await crearInventarios(inventarios)
      setLoad(true)
      setInventario({ nombre: '', email: '' })
      setErrorEnvio({ status: false, msg: '' })
      listarInventarios();
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
    setInventario({ ...inventarios, [e.target.name]: e.target.value })
  }

  const resetFields = () => {
    setErrorEnvio({
      status: false, msg: ''
    })
    setInventario({ nombre: '', email: '' })
  }

  const borrarInventario = async () => {
    try {
      const res = await borrarInventarioByID(inventariosToEdit._id)
      console.log(res);
      listarInventarios()
    } catch (e) {
      console.log(e);
    }
  }

  const setearInventario = (e) => {
    try {
      const id = e.target.id;
      const inventarios = InventariosState.filter(inventarios => inventarios._id == id)
      const { ...objInventario } = inventarios[0]
      setinventariosToEdit(objInventario)
    } catch (error) {
      console.log(error);
    }
  }

  const changeInventario = (e) => {
    setinventariosToEdit({ ...inventariosToEdit, [e.target.name]: e.target.value })
  }

  const resetearInventario = () => {
    setinventariosToEdit({
      serial: '',
      modelo: '',
      descripcion: '',
      color: '',
      fecha_compra: '',
      precio: '',
      usuario: '',
      marca: '',
      estado: true,
      tipo_equipo: ''
    })
  }

  const editarTipoInventario = async (e) => {
    e.preventDefault()
    setLoad(true)
    try {
      setError(false)
      const resp = await actualizarInventarioByID(inventariosToEdit._id, inventariosToEdit);
      console.log(resp)
      resetearInventario()
      listarInventarios()
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
            <th scope="col">Serial</th>
            <th scope="col">Modelo</th>
            <th scope="col">Color</th>
            <th scope="col">Fecha Compra</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Usuario</th>
            <th scope="col">Marca</th>
            <th scope="col">Estado Equipo</th>
            <th scope="col">Tipo Equipo</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            InventariosState.map((inventarios, i) => {
              return (
                <tr key={inventarios._id}>
                  <th scope="row" className='align-middle'>{i + 1}</th>
                  <td className='align-middle'>{inventarios.serial}</td>
                  <td className='align-middle'>{inventarios.modelo}</td>
                  <td className='align-middle'>{inventarios.color}</td>
                  <td className='align-middle'>{dayjs(inventarios.fecha_compra).format('YYYY-MM-DD')}</td>
                  <td className='align-middle'>{inventarios.descripcion}</td>
                  <td className='align-middle'>{inventarios.usuario.nombre}</td>
                  <td className='align-middle'>{inventarios.marca.nombre}</td>
                  <td className='align-middle'>{inventarios.estado_equipo.nombre}</td>
                  <td className='align-middle'>{inventarios.tipo_equipo.nombre}</td>
                  <td className="align-middle">{inventarios.estado ? 'Activo' : 'Inactivo'}</td>
                  <td className='align-middle'>
                    <button id={inventarios._id} type="button" className="btn btn-warning btn-sm fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={setearInventario} name='editar'></button>
                    <button type="button" id={inventarios._id} className="btn btn-danger btn-sm fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#modalDelete" onClick={setearInventario}></button>
                  </td>
                </tr>
              )
            })

          }
          {
            load && (
              <td colSpan="11">
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

      <DialogoConfirmar inventariosToEdit={inventariosToEdit} borrarinventarios={borrarInventario} />

      <ModalEditar titulo={'Inventario'} errorEnvio={errorEnvio} inventarios={inventariosToEdit} resetearinventarios={resetearInventario} changeInventario={changeInventario} editar={editarTipoInventario} />


      <Modal titulo={'Inventario'} guardar={guardarInventario} element={inventarios} change={changeInput} errorEnvio={errorEnvio} reset={resetFields} />

      <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" >
        <i className="fa-sharp fa-solid fa-plus"></i>
        Agregar
      </button>

    </div>

  )
}
