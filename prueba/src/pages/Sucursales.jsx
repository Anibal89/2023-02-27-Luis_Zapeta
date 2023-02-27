import { useState, useEffect } from "react";
import axios from "axios";
import Versucursales from "../components/sucursales/Versucursales";

const Sucursales = () => {

  const [listUpdate, setListUpdate] = useState(false);

  const URLLISTsucursal ="http://localhost:4000/api/sucursal/Sucursal";

  const [listSucursales,SetListSucursales ] = useState([]);

  const getListSucursales = async () => {
    const res = axios.get(URLLISTsucursal);
    return res;
  };

  useEffect(() => {
    getListSucursales().then((res) => {
     SetListSucursales(res.data);
    });
  }, [listUpdate]);

  return (
    <>
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              {listSucursales && listSucursales.length ? (
                <div className="container"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  {listSucursales.map((datoingreso, index) => (
                    <Versucursales
                      key={index}
                      datoingreso={datoingreso}
                      setListUpdate={setListUpdate}
                      listUpdate={listUpdate}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <div className="container"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <h6
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "25px",
                        backgroundColor: "#F5C85B",
                        width: "250px",
                        padding: "1rem",
                        borderRadius: "5px",
                      }}
                    >
                      No Hay Sucursales
                    </h6>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      
    </>
   
  );
};

export default Sucursales;
