import React from 'react'
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/ui/NavBar";
import Footer from "../components/ui/Footer";
import TipoEquipos from "../components/tiposequipos/TipoEquipos";
import Estados from "../components/estados/Estados";
import Marcas from "../components/marcas/Marcas";
import Usuarios from "../components/usuarios/Usuarios";
import Inventarios from "../components/inventarios/Inventarios";
import NotFound from "../components/ui/NotFound";

export default function AppRouter() {
  return (
    <div>
      <NavBar />
      <main className='container'>
        <Routes>
          <Route path='/' element={<TipoEquipos />} />
          <Route path='/Estados' element={<Estados />} />
          <Route path='/Marcas' element={<Marcas />} />
          <Route path='/Usuarios' element={<Usuarios />} />
          <Route path='/Inventario' element={<Inventarios />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div >
  )
}
