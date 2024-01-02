
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faDollarSign, faChartBar } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'; 

const Dashboard = () => {


  return (
    <div>
    <div >
      <h2>Today’s Sales</h2>
      <p>Sales Summary</p>
      <br />
      <div className="container_for_sales bg-white">
        <div className="row row-1 row-3-md-2 g-4">
          <div className="col">
            <div className="card square-card" style={{ backgroundColor: '#db8cd6'}}>
              <div className="card-body">
                <h5 className="card-title text-center">
                  <FontAwesomeIcon icon={faDollarSign} size="2x" color="#75136f" /> <br /><br/>
                  <p className="card-text">dkff</p>
                  Total Sales
                </h5>
                <p>...from yesterday</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card square-card" style={{ backgroundColor: '#FFE4B5' }}>
              <div className="card-body">

                <h5 className="card-title text-center">
                  <FontAwesomeIcon icon={faShoppingCart} size="2x" color="#754c09" /><br /><br />
                  <p className="card-text">ddh</p>
                  Total Orders
                </h5>
                <p>...from yesterday</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card square-card" style={{ backgroundColor: '#90EE90', marginRight:'140px' }}>
              <div className="card-body">
                <h5 className="card-title text-center">
                  <FontAwesomeIcon icon={faChartBar} size="2x" color="#1f6306" /><br /><br/>
                  <p className="card-text">12k</p>
                  Product Sold
                </h5>
                
                <p>...from yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div><br/><br/>

<div >
<h2>Top Selling Products</h2>
<p>View and Manage your top selling products</p>
<br />
<div className="container_for_topselling bg-white">
  <div className="row row-1 row-3-md-2 g-4">
    <div className="col">
      <div className="card square-card_topselling" >
        <div className="card-body_topselling"> 
        image will be here         
            <p className="card-text">product name</p> 
            <p className="card-text">sold count</p>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card square-card_topselling" >
        <div className="card-body_topselling">
        image will be here 
            <p className="card-text">product name</p> 
            <p className="card-text">sold count</p>
        </div>
      </div>
    </div>
    <div className="col">
      <div className="card square-card_topselling" >
        <div className="card-body_topselling">
        image will be here 
            <p className="card-text">product name</p>
            <p className="card-text">sold count</p> 
        </div>
      </div>
    </div>
  </div>
</div>
</div></div>
  );
};

export default Dashboard;
