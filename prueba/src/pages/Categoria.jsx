import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";


const Categoria = () => {
  const [listUpdate, setListUpdate] = useState(false);

  //Formulario Categoria

  const [categoria, SetCategoria] = useState({
    Nombre_Categoria: "",
    Descripcion_Categoria: "",
  });

  const handleCategoria = ({ target }) => {
    SetCategoria({
      ...categoria,
      [target.name]: target.value,
    });
  };

  //Listarcategoria
  const [listcategoria, SetListCategoria] = useState([]);
  const URLCATEGORIA = "http://localhost:4000/api/sucursal/listcategoria";

  const getCategoria = async () => {
    const res = axios.get(URLCATEGORIA);
    return res;
  };

  useEffect(() => {
    getCategoria().then((res) => {
      SetListCategoria(res.data);
      setListUpdate(false);
    });
  }, [listUpdate]);

  //Agregar Categoria

  const URLADDCATEGORIA = "http://localhost:4000/api/sucursal/addcategoria";

  const handleItemCategoria = async (e) => {
    e.preventDefault();
    if (
      categoria.Nombre_Categoria.length == 0 ||
      categoria.Descripcion_Categoria.length == 0
    ) {
      return toast.warn(
        "por favor complete los campos del formulario correctamente",
        { autoClose: 1500 }
      );
    }
    const res = await axios.post(URLADDCATEGORIA, categoria);
    if (res.status === 200) {
      SetCategoria({ Nombre_Categoria: "", Descripcion_Categoria: "" });
      toast.success("categoria agregada", { autoClose: 1500 });
      setListUpdate(true);
    } else {
      toast.error("No se agrego categoria", { autoClose: 1500 });
    }
  };

  //Eliminar Categoria

  const URLDELETECATEGORIA =
    "http://localhost:4000/api/sucursal/deletecategoria";

  const handleDelete = async (Id_Categoria) => {
    axios.delete(`${URLDELETECATEGORIA}/${Id_Categoria}`).then((res) => {
      if (res.status === 200) {
        toast.info("Categoria Eliminada", { autoClose: 1500 });
        setListUpdate(true);
      } else {
        toast.error("Categoria no eliminada", { autoClose: 1500 });
      }
    });
  };

  return (
    <>
      <div className="container mt-5">
        <h6 className="text-center">portal de categorias</h6>
        <div className="row mt-5">
          <div className="col-4">
            <div className="container">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleItemCategoria}>
                    <div className="col mb-2">
                      <label htmlFor="Nombre_Categoria" className="form-label">
                        Nombre categoria
                      </label>
                      <input
                        type="text"
                        name="Nombre_Categoria"
                        className="form-control"
                        onChange={handleCategoria}
                        value={categoria.Nombre_Categoria}
                      />
                    </div>

                    <div className="col-12 mb-4">
                      <label
                        htmlFor="Descripcion_Categoria"
                        className="form-label"
                      >
                        Descripcion
                      </label>
                      <textarea
                        type="text"
                        name="Descripcion_Categoria"
                        className="form-control"
                        onChange={handleCategoria}
                        value={categoria.Descripcion_Categoria}
                      />
                    </div>

                    <button type="submit" className="btnhover_add">
                      <i className="bx bx-check-double font-size-16 align-middle me-2"></i>
                      Crear Producto{" "}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col-8">
            <div className="card">
              <div className="card-body">
                <div className="card-title"> Lista de categorias</div>
                <div
                  className="table-responsive text-center"
                  style={{ overflowx: "scroll", height: "350px" }}
                >
                  <table className="table">
                    <thead>
                      <tr className="table-dark">
                        <th scope="col">No</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th colSpan={2}>Gestionar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listcategoria.map((item) => (
                        <tr key={item.Id_Categoria}>
                          <th>{item.Id_Categoria}</th>
                          <th>{item.Nombre_Categoria}</th>
                          <th>{item.Descripcion_Categoria}</th>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => handleDelete(item.Id_Categoria)}
                            >
                              <i className="bx bx-trash"></i>
                            </button>{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categoria;
