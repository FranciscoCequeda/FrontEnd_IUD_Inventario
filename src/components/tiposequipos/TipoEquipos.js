import React, { useEffect, useState } from 'react'
import { getEquipos } from '../../services/tipoEquiposService';
import dayjs from 'dayjs';
import Modal from '../ui/Modal';

export default function TipoEquipos() {

  const [tipoEquipo, setTipoEquipo] = useState([])
  const [load, setLoad] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)


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
      setLoad(true)
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


  return (
    <div>

      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={query} onChange={cambiarSwitch} />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Inactivo / Activo</label>
      </div>

      <table className="table">

        <thead>
          <tr>
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
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{tipoEquipo.nombre}</td>
                  <td>{tipoEquipo.estado ? 'Activo' : 'Inactivo'}</td>
                  <td>{dayjs(tipoEquipo.fecha_creacion).format('YYYY-MM-DD')}</td>
                  <td>{dayjs(tipoEquipo.fecha_actualizacion).format('YYYY-MM-DD')}</td>
                  <td>
                    <button type="button" className="btn btn-warning btn-sm"><i className="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" className="btn btn-danger btn-sm"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              )
            })

          }

{
        load && (
          <td colSpan="6">
            <div className="d-flex justify-content-center">
              <div class="spinner-grow text-dark " role="status">
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

      <Modal titulo={'Tipo de Equipo'} />

      <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i className="fa-sharp fa-solid fa-plus"></i> Agregar Equipo</button>

    </div>

  )
}
