import React from 'react'

export default function Footer() {
  return (
    <footer className="py-3 my-4">
      <ul className="nav justify-content-center border-bottom pb-1">
        <li className="nav-item"><a href="https://www.iudigital.edu.co/Paginas/default.aspx" target="_blank" rel="noreferrer" className="nav-link px-2 text-muted">Portal Educativo</a></li>
        <li className="nav-item"><a href="https://www.iudigital.edu.co/OfertaEducativa/Paginas/Facultades.aspx" target="_blank" rel="noreferrer" className="nav-link px-2 text-muted">Carreras</a></li>
        <li className="nav-item"><a href="https://iudigital.educatic.com.co/cas/logout?url=https://iudigital.educatic.com.co/extranet&idEmpresa=1" target="_blank" rel="noreferrer" className="nav-link px-2 text-muted">Educatic</a></li>
        <li className="nav-item"><a href="https://www.iudigital.edu.co/Paginas/Politicas-de-Privacidad-y-Condiciones-de-Uso-del-Sitio.aspx" target="_blank" rel="noreferrer" className="nav-link px-2 text-muted">FAQs</a></li>
        <li className="nav-item"><a href="https://www.iudigital.edu.co/Transparencia/Paginas/Transparencia-y-Acceso-a-Informacion-Publica.aspx" target="_blank" rel="noreferrer" className="nav-link px-2 text-muted">Acerca de nosotros</a></li>
      </ul>

      <p className="text-center text-muted">© 2022 IUDigitial de Antioquia</p>

      <section className="d-flex justify-content-center p-1 border-bottom">

        <a a target="_blank" rel="noreferrer" href="https://www.facebook.com/soyiudigital/" className="me-2 link-secondary">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a a target="_blank" rel="noreferrer" href="https://twitter.com/IUDIGITAL" className="me-2 link-secondary">
          <i className="fab fa-twitter"></i>
        </a>
        <a a target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UCjXIEjEl649RSqLD9qPj7Xg" className="me-2 link-secondary">
          <i className="fab fa-google"></i>
        </a>
        <a a target="_blank" rel="noreferrer" href="https://www.instagram.com/iudigital/" className="me-2 link-secondary">
          <i className="fab fa-instagram"></i>
        </a>
      </section>

      <section className="d-flex justify-content-center p-1 border-top">
        <a a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/francisco-c/" className="me-2 link-secondary">
          <i className="fab fa-linkedin"></i>
        </a>
        <p className='text-center text-muted-bold p-1'>Make By: Francisco Cequeda </p>
        <a a target="_blank" rel="noreferrer" href="https://github.com/FranciscoCequeda" className="me-2 link-secondary">
          <i className="fab fa-github"></i>
        </a>


      </section>


    </footer >
  )
}