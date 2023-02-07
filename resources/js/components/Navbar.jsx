import React from 'react'

function Navbar() {
  return (
    <div className="container-fluid">
        <nav className="navbar navbar-expand-md bg-body-tertiary" role="navigation">
            <div className="container-fluid ps-lg-5 pe-lg-5" style="height: 30vh;">
                <a className="navbar-brand order-2 order-md-1" href="/"><img src="" alt="Логотип" className="w-100"
                        style="max-width: 150px;" /></a>
                <button className="navbar-toggler order-1 order-md-2 border-0" type="button"
                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <img src="" alt="Иконка меню" />
                </button>
                <div className="offcanvas offcanvas-start order-md-2" tabindex="-1" id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close ps-0" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <a className="nav-link active" href="#about-agency">Link</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}
export default Navbar;