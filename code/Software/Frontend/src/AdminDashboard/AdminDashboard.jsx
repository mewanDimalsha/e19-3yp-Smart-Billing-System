import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet } from "react-router-dom"
import { useState } from 'react';
import './AdminDashboard.css'; // Import the CSS file for styles



function AdminDashboard(){ 
  return (
    <div className="login-container">
      <div className="header-bar ">
        <h2 style={{ color: 'white', textAlign: 'left' }}><b>SMART</b> <span className="thin-text">BILLING SYSTEM</span></h2>
      </div>
      <div className={`container-fluid`} >
        <div className="row">
          {/* Sidebar */}
          <div className="col-auto col-md-5 col-xl-2 px-sm-2 px-0 bg-light" >
            <div className="d-flex flex-column align-items-start px-3 pt-2 min-vh-100">

          
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                
                    <li>
                        <Link to="/AdminDashboard" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-house-door icon-color" ></i> <span className="ms-1 d-none d-sm-inline text-dark thin-text" ><b>Dashboard</b></span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to='/AdminDashboard/Invoices' className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-file-text icon-color" ></i> <span className="ms-1 d-none d-sm-inline text-dark thin-text" ><b>Invoices</b></span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/AdminDashboard/Sales' className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-cash-coin icon-color" ></i> <span className="ms-1 d-none d-sm-inline text-dark thin-text" ><b>Sales</b></span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/AdminDashboard/Security_Footage' className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-lock icon-color" ></i> <span className="ms-1 d-none d-sm-inline text-dark thin-text" ><b>Security Footage</b></span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/AdminDashboard/Device_Status' className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-gear icon-color" ></i> <span className="ms-1 d-none d-sm-inline text-dark thin-text" ><b>Device Status</b></span>               
                        </Link>
                    </li>
                    <li>
                        <Link to='/' className="nav-link px-0 align-middle">
                             <i className="fs-4 bi-power icon-color" ></i> <span className="ms-1 d-none d-sm-inline text-dark thin-text" ><b>Logout</b></span>
                        </Link>
                    </li>
                </ul>

            </div>
        </div>
        <div className="col py-3 position-relative">

          {/* Content area */}
          <div className="p-3 d-flex justify-content-center " >
            <h3 className="text-dark"  >ADMINISTRATOR MANAGEMNT</h3>
          </div>
          <Outlet />
        </div>
    </div>
</div>

</div>
 
    )
}

export default AdminDashboard