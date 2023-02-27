import React from "react";

import logo from "../assets/logo2.jpg";

const Home = () => {
  return (
    <>
    <div className="container mt-5 d-flex justify-content-center">
     <div className="row">
      <div className="col">
      <img
          src={logo}
          alt="Login image"
          className="w-100"
          style={{ objectFit: "cover", border: "none" }}
        />
      </div>
      <div className="col">
      <div className="py-5 bg-light border-bottom mb-4">
        <div className="container">
          <div className="text-center my-5">
            <h1 className="fw-bolder">Aplicacion de Productos y sucursales</h1>
            <p>{new Date().getFullYear()}</p>
            <p className="lead mb-0"></p>
          </div>
        </div>
      </div>
      </div>
     </div>
    </div>
    
    </>
  );
};

export default Home;
