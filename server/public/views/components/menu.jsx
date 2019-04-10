import React from 'react';

const Menu = (props) => {

    return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon rotate-n-15">
            
        </div>
        
        </a>
        
        
        <hr className="sidebar-divider my-0" />
        
        
        <li className="nav-item active">
        <a className="nav-link" href="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>
        </li>
        
        
        <hr className="sidebar-divider" />
        
        
        <div className="sidebar-heading">
        Módulos
        </div>
        
        
        <li className="nav-item">
            <a className="nav-link" href="#" >
                <i className="fas fa-fw fa-cog"></i>
                <span>Página de prueba</span>
            </a>
        </li>
        
        <hr className="sidebar-divider" />
        
        
        <div className="sidebar-heading">
        Módulos
        </div>
        
        
        <li className="nav-item">
            <a className="nav-link" href="#" >
                <i className="fas fa-fw fa-folder"></i>
                <span>Página de prueba</span>
            </a>
        </li>
        
        
    </ul>)
}

export default Menu;