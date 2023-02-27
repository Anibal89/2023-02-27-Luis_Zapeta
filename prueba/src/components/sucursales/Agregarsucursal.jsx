import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const Agregarsucursal = () => {

  const [listUpdate, setListUpdate] = useState(false); // Actualizacion de Estado General

  const [sucursal, SetSucursal] = useState({
    Nombre_Sucursal: "",
    Direccion_Sucursal: "",
    Correo_Sucursal: "",
    Id_Departamento: "",
    Nombre_Municipio: "",
    Telefono_Sucursal: "",
  });

  const handleData = ({ target }) => {
    SetSucursal({
      ...sucursal,
      [target.name]: target.value,
    });
  };

  const [listdepartamento, SetListDepartamento]= useState([])
  
  const UrlDepartamento = "http://localhost:4000/api/sucursal/listDepartamentos";

  const getDepartamentos = async () => {
    const res = axios.get(UrlDepartamento);
    return res;
  };


  useEffect(() => {
    getDepartamentos().then((res) => {
      SetListDepartamento(res.data);
      setListUpdate(false);
    });
  }, [listUpdate]);

  const [listmunicipio, SetLisMunicipio]= useState([])

  const UrlMunicipio = "http://localhost:4000/api/sucursal/listMunicipios";

  const getMunicipios = async () => {
    const res = axios.get(UrlMunicipio);
    return res;
  };


  useEffect(() => {
    getMunicipios().then((res) => {
      SetLisMunicipio(res.data);
      setListUpdate(false);
    });
  }, [listUpdate]);

  
  // Funcion de filtro
  const municipio = listmunicipio.filter(lol => lol.Id_Departamento == sucursal.Id_Departamento);


   const URLPOSTSUCURSAL = "http://localhost:4000/api/sucursal/addSucursal";

  const handleAdd = async(e) => {
    e.preventDefault();
    if (sucursal.Nombre_Sucursal.length == 0 && sucursal.Direccion_Sucursal.length == 0  && sucursal.Correo_Sucursal.length == 0  && sucursal.Id_Departamento.length == 0  && sucursal.Nombre_Municipio.length == 0  && sucursal.Telefono_Sucursal.length == 0 )
   {
      return (
      toast.info("por favor complete los campos del formulario correctamente",{ autoClose: 1500 }))
   }
    const res = await axios.post(URLPOSTSUCURSAL, sucursal);
    if (res.status === 200) {
      toast.success("Sucursal registrada", { autoClose: 1500 });
      setListUpdate(true);
    } else {
      toast.error("No se agrego sucursal", { autoClose: 1500 });
    }
  };

  return (
    <>
      <div className="container mt-5" style={{ width: "500px" }}>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleAdd}>
              <div className="col">
                <label htmlFor="Nombre_sucursal" className="form-label">
                  Nombre de sucursal
                </label>
                <input
                  type="text"
                  name="Nombre_Sucursal"
                  className="form-control"
                  onChange={handleData}
                  value={sucursal.Nombre_Sucursal}
                />
              </div>
              <div className="col mb-2">
                <label htmlFor="Direccion_Sucursal" className="form-label">
                  Direccion de sucursal
                </label>
                <input
                  type="text"
                  name="Direccion_Sucursal"
                  className="form-control"
                  onChange={handleData}
                  value={sucursal.Direccion_Sucursal}
                />
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="Telefono_Sucursal" className="form-label">
                    Telefono
                  </label>
                  <input
                    name="Telefono_Sucursal"
                    className="form-control"
                    onChange={handleData}
                    value={sucursal.Telefono_Sucursal}
                    placeholder= "0000-0000"
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="Correo_Sucursal" className="form-label">
                    Correo electronico
                  </label>
                  <input
                    type="email"
                    name="Correo_Sucursal"
                    className="form-control"
                    onChange={handleData}
                    value={sucursal.Correo_Sucursal}
                    placeholder= "ejemplo@gmail.com"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="Id_Departamento" className="form-label">
                    departamento
                  </label>
                  <select
                    className="form-select"
                    name="Id_Departamento"
                    type="number"
                    onChange={handleData}
                    value={sucursal.Id_Departamento}
                    required
                  >
                    <option defaultValue="Seleccione" hidden>
                      Seleccionar
                    </option>
                    {listdepartamento.map((item) => (
                      <option key={item.Id_Departamento} value={item.Id_Departamento}>
                        {item.Nombre_Departamento}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label htmlFor="Nombre_Municipio" className="form-label">
                    Municipio
                  </label>
                  <select
                    className="form-select"
                    name="Nombre_Municipio"
                    type="number"
                    onChange={handleData}
                    value={sucursal.Nombre_Municipio}
                    required
                  >
                    <option defaultValue="Seleccione" hidden>
                      Seleccionar
                    </option>
                    {municipio.map((item) =>  (
                      <option key={item.Id_Municipio} value={item.Nombre_Municipio}>
                        {item.Nombre_Municipio}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="btnhover">
                <i className="bx bx-check-double font-size-16 align-middle me-2"></i>
                Crear Sucursal{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Agregarsucursal;
