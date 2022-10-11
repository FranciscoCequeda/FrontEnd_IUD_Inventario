import React, { useEffect } from 'react'
import { getEquipos } from '../../services/tipoEquiposService';

export default function TipoEquipos() {

  const listarEquipos = async () => {
    const { data } = await getEquipos(true)
    console.log(data);
  }

  useEffect(() => {
    listarEquipos()
  }, []
  )


  return (
    <div>Tipo Equipos</div>
  )
}
