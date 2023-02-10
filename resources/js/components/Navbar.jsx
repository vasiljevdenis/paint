import React from 'react'

function Navbar() {
  return (
    <header>
        <nav className="navbar navbar-expand-md bg-body-tertiary" role="navigation" style={{height: '10vh'}}>
            <div className="container-fluid ps-lg-5 pe-lg-5">
                <a className="navbar-brand order-2 order-md-1" href="/"><img src="images/logo.png" alt="Логотип" className="w-100"
                        style={{maxWidth: '250px'}} /></a>
                <button className="navbar-toggler order-1 order-md-2 border-0" type="button"
                    data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon"></span>
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
                                <a className="nav-link btn-custom me-md-2" href="#">Dota 2</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link btn-custom mt-2 mt-md-0" href="#">CS:GO</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
  )
}
export default Navbar;