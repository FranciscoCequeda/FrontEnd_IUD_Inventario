import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import icono from "../../utils/icono.ico";

export default function navBar() {
    const icoSize = { width: '50px', height: '50px' };
    return (
        <nav className="navbar navbar-expand-lg bg-light">

            <div className="container-fluid">

                <Link className="navbar-brand" tabIndex={0} to="/" aria-label='Ir a inicio'>
                    <img className="img-fluid" style={icoSize} src={icono} alt="icono" />
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <NavLink tabIndex={1} className="nav-item nav-link" to='/'>
                            Tipo Equipos
                        </NavLink>
                        <NavLink tabIndex={2} className="nav-item nav-link" to='/Estados'>
                            Estados
                        </NavLink>
                        <NavLink tabIndex={3} className="nav-item nav-link" to='/Marcas'>
                            Marcas
                        </NavLink>
                        <NavLink tabIndex={4} className="nav-item nav-link" to='/Usuarios'>
                            Usuarios
                        </NavLink>
                        <NavLink tabIndex={5} className="nav-item nav-link" to='/Inventario'>
                            Inventario
                        </NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
