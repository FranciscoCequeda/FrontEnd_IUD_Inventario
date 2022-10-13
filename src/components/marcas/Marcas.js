import React, { useEffect, useState } from 'react'
import { borrarMarcaByID, crearMarcas, getMarcas, actualizarMarcaByID } from '../../services/marcasService';
import dayjs from 'dayjs';
import ModalEditar from '../marcas/ModalEditar';
import Modal from '../marcas/Modal';
import DialogoConfirmar from '../marcas/DialogoConfirmar';

export default function Marcas() {

  const [MarcasState, setMarcasState] = useState([])
  const [load, setLoad] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [marca, setMarca] = useState({
    nombre: '',
    estado: true
  })

  const [errorEnvio, setErrorEnvio] = useState({
    status: false, msg: ''
  })

  useEffect(() => {
    listarMarcas()
  }, [query]
  )

  const [marcaToEdit, setmarcaToEdit] = useState({
    nombre: '',
    estado: true
  })

  const listarMarcas = async () => {
    setLoad(true)
    try {
      setError(false)
      const { data } = await getMarcas(query)
      setMarcasState(data.MarcasDB);
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

  const guardarMarca = async () => {
    try {
      await crearMarcas(marca)
      setLoad(true)
      setMarca({ nombre: '' })
      setErrorEnvio({ status: false, msg: '' })
      listarMarcas();
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
    setMarca({ ...marca, [e.target.name]: e.target.value })
  }

  const resetFields = () => {
    setErrorEnvio({
      status: false, msg: ''
    })
    setMarca({ nombre: '' })
  }

  const borrarMarca = async () => {
    try {
      const res = await borrarMarcaByID(marcaToEdit._id)
      console.log(res);
      listarMarcas()
    } catch (e) {
      console.log(e);
    }
  }

  const setearMarca = (e) => {
    try {
      const id = e.target.id;
      const marca = MarcasState.filter(marca => marca._id == id)
      const { ...objMarca } = marca[0]
      setmarcaToEdit(objMarca)
    } catch (error) {
      console.log(error);
    }
  }

  const changeMarca = (e) => {
    setmarcaToEdit({ ...marcaToEdit, [e.target.name]: e.target.value })
  }

  const resetearMarca = () => {
    setmarcaToEdit({
      nombre: '',
      estado: true
    })
  }

  const editarTipoMarca = async (e) => {
    e.preventDefault()
    setLoad(true)
    try {
      setError(false)
      const resp = await actualizarMarcaByID(marcaToEdit._id, marcaToEdit);
      console.log(resp)
      resetearMarca()
      listarMarcas()
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
            MarcasState.map((marca, i) => {
              return (
                <tr key={marca._id}>
                  <th scope="row" className='align-middle'>{i + 1}</th>
                  <td className='align-middle'>{marca.nombre}</td>
                  <td className="align-middle">{marca.estado ? 'Activo' : 'Inactivo'}</td>
                  <td className='align-middle'>{dayjs(marca.fecha_creacion).format('YYYY-MM-DD')}</td>
                  <td className='align-middle'>{dayjs(marca.fecha_actualizacion).format('YYYY-MM-DD')}</td>
                  <td className='align-middle'>
                    <button id={marca._id} type="button" className="btn btn-warning btn-sm fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={setearMarca} name='editar'></button>
                    <button type="button" id={marca._id} className="btn btn-danger btn-sm fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#modalDelete" onClick={setearMarca}></button>
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

      <DialogoConfirmar marcaToEdit={marcaToEdit} borrarmarca={borrarMarca} />

      <ModalEditar titulo={'Marca'} errorEnvio={errorEnvio} marca={marcaToEdit} resetearmarca={resetearMarca} changeMarca={changeMarca} editar={editarTipoMarca} />


      <Modal titulo={'Marca'} guardar={guardarMarca} element={marca} change={changeInput} errorEnvio={errorEnvio} reset={resetFields} />

      <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" >
        <i className="fa-sharp fa-solid fa-plus"></i>
        Agregar
      </button>

    </div>

  )
}
