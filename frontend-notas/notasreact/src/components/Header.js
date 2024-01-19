import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/logo.svg';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* Logo en la parte izquierda */}
                <NavLink to="/" className="navbar-brand">
                    <img className="app-logo" src={logo} alt="logo" width="50" />
                </NavLink>

                {/* Enlace a Inicio */}
                <ul className="nav justify-content-start">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" style={{ color: 'white' }}>Inicio</NavLink>
                    </li>
                </ul>

                {/* Enlace a Artículos en la parte derecha */}
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <NavLink to="/articles" className="nav-link" style={{ color: 'white' }}>Articulos</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
