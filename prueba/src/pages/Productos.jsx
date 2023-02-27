import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {Modal, Form} from "react-bootstrap"


const Productos = () => {

  const [listUpdate, setListUpdate] = useState(false);
  // Formulario

  const [producto, SetProducto] = useState({
    Codigo_Producto: "",
    Nombre_Producto: "",
    Descripcion_Producto: "",
    Precio_Producto: "",
    Id_Estado: "",
    Id_Categoria: "",
  });

  const handleDataProducto = ({ target }) => {
    SetProducto({
      ...producto,
      [target.name]: target.value,
    });
  };

  // Listar categorias

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

  // Listar Estados

  const [listestado, SetListEstado] = useState([]);

  const UrlEstado = "http://localhost:4000/api/sucursal/listestado";

  const getEstados = async () => {
    const res = axios.get(UrlEstado);
    return res;
  };

  useEffect(() => {
    getEstados().then((res) => {
      SetListEstado(res.data);
      setListUpdate(false);
    });
  }, [listUpdate]);

  //Agregar Producto

  const URLADDPRODUCTO = "http://localhost:4000/api/sucursal/addproducto";

  const handleAdd = async (e) => {
    e.preventDefault();
    if (
      producto.Codigo_Producto.length == 0 ||
      producto.Nombre_Producto.length == 0 ||
      producto.Descripcion_Producto.length == 0 ||
      producto.Precio_Producto.length == 0 ||
      producto.Id_Estado.length == 0 ||
      producto.Id_Categoria.length == 0
    ) {
      return toast.warn(
        "por favor complete los campos del formulario correctamente",
        { autoClose: 1500 }
      );
    }
    const res = await axios.post(URLADDPRODUCTO, producto);
    if (res.status === 200) {
      toast.success("Producto agregado", { autoClose: 1500 });
      setListUpdate(true);
    } else {
      toast.error("No se agrego el producto", { autoClose: 1500 });
    }
  };

  //Listar Productos

  const URLPRODCUTOS = "http://localhost:4000/api/sucursal/listproducto";

  const [listprodcutos, setListProductos] = useState([]); //Tabla Estatica para el nuevo mapeo

  const getListProductos = async () => {
    const res = axios.get(URLPRODCUTOS);
    return res;
  };

  useEffect(() => {
    getListProductos().then((res) => {
      setListProductos(res.data);
      setListUpdate(false);
    });
  }, [listUpdate]);

  //Eliminar Producto

  const URLDELETEPRODUCTO = "http://localhost:4000/api/sucursal/deleteproducto"; 

  const handleDelete = async (Id_Producto) => {
  
        axios.delete(`${URLDELETEPRODUCTO}/${Id_Producto}`).then((res) => {
          if (res.status === 200) {
            toast.success("Producto Eliminado",{ autoClose: 1500 })
            setListUpdate(true);
          } else {
            toast.error("producto no eliminado",{ autoClose: 1500 });
          }
        });
      }
  
 // Actualizar producto

 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 const [dataModal, setDataModal] = useState({});

 const handleUpdate = (item) => {
   handleShow();
   setDataModal(item);
 };

 const ModalData = ({ target }) => {
   setDataModal({
     ...dataModal,
     [target.name]: target.value,
   });
 };

 const URLUPDATEM = "http://localhost:4000/api/sucursal/updateproducto"

 const UpdateModal = async (e) => {
  e.preventDefault();
  const res = await axios.put(
    `${URLUPDATEM}/${dataModal.Id_Producto}`,dataModal);
  if (res.status === 200) {
    toast.info("producto actualizado", {autoClose:1500})
    setListUpdate(true);
    handleClose();
  } else {
    toast.error("producto no actualizado", {autoClose:1500})
  }
};

  return (
    <>
 <Modal show={show} onHide={handleClose}>
 <Modal.Header closeButton>
   <Modal.Title>Actualizar producto</Modal.Title>
 </Modal.Header>
  <form onSubmit={UpdateModal}>
 <Modal.Body>
  
     <div className="row mb-3">
       <div className="col">
         <label htmlFor="Codigo_Producto" className="form-label">
           Codigo
         </label>
         <input
           type="text"
           name="Codigo_Producto"
           className="form-control"
           onChange={ModalData}
           value={dataModal.Codigo_Producto}
         />
       </div>
       <div className="col-6">
         <label htmlFor="Precio_Producto" className="form-label">
           precio
         </label>
         <input
           type="number"
           name="Precio_Producto"
           className="form-control"
           onChange={ModalData}
           value={dataModal.Precio_Producto}
         />
       </div>
     </div>
     <div className="col mb-2">
       <label htmlFor="Nombre_Producto" className="form-label">
         Nombre producto
       </label>
       <input
         type="text"
         name="Nombre_Producto"
         className="form-control"
         onChange={ModalData}
         value={dataModal.Nombre_Producto}
       />
     </div>

     <div className="col-12">
       <label htmlFor="Descripcion_Producto" className="form-label">
         Descripcion
       </label>
       <textarea
         type="text"
         name="Descripcion_Producto"
         className="form-control"
         onChange={ModalData}
         value={dataModal.Descripcion_Producto}
       />
     </div>

     <div className="row mb-3">
       <div className="col-6">
         <label htmlFor="Id_Estado" className="form-label">
           Estado
         </label>
         <select
           className="form-select"
           name="Id_Estado"
           type="number"
           onChange={ModalData}
           value={dataModal.Id_Estado}
         >
           <option defaultValue="Seleccione" hidden>
             Seleccionar
           </option>
           {listestado.map((item) => (
             <option key={item.Id_Estado} value={item.Id_Estado}>
               {item.Nombre_Estado}
             </option>
           ))}
         </select>
       </div>
       <div className="col-6">
         <label htmlFor="Id_Categoria" className="form-label">
           Categoria
         </label>
         <select
           className="form-select"
           name="Id_Categoria"
           type="number"
           onChange={ModalData}
           value={dataModal.Id_Categoria}
         >
           <option defaultValue="Seleccione" hidden>
             Seleccionar
           </option>
           {listcategoria.map((item) => (
             <option key={item.Id_Categoria} value={item.Id_Categoria}>
               {item.Nombre_Categoria}
             </option>
           ))}
         </select>
       </div>
     </div>
 </Modal.Body>
 <Modal.Footer>
   <button className="btn btn-warning" onClick={handleClose}>
     Cerrar
   </button>
   <button type="submit" className=" btn btn-success nw-md">
     Actualizar
   </button>
 </Modal.Footer>
 </form>
</Modal>

      <div className="container mt-5">
        <h6 className="text-center">portal de productos</h6>
        <div className="row mt-5">
          <div className="col-4">
            <div className="container">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleAdd}>
                    <div className="row mb-3">
                      <div className="col">
                        <label htmlFor="Codigo_Producto" className="form-label">
                          Codigo
                        </label>
                        <input
                          type="text"
                          name="Codigo_Producto"
                          className="form-control"
                          onChange={handleDataProducto}
                          value={producto.Codigo_Producto}
                        />
                      </div>
                      <div className="col-6">
                        <label htmlFor="Precio_Producto" className="form-label">
                          precio
                        </label>
                        <input
                          type="number"
                          name="Precio_Producto"
                          className="form-control"
                          onChange={handleDataProducto}
                          value={producto.Precio_Producto}
                        />
                      </div>
                    </div>
                    <div className="col mb-2">
                      <label htmlFor="Nombre_Producto" className="form-label">
                        Nombre producto
                      </label>
                      <input
                        type="text"
                        name="Nombre_Producto"
                        className="form-control"
                        onChange={handleDataProducto}
                        value={producto.Nombre_Producto}
                      />
                    </div>

                    <div className="col-12">
                      <label
                        htmlFor="Descripcion_Producto"
                        className="form-label"
                      >
                        Descripcion
                      </label>
                      <textarea
                        type="text"
                        name="Descripcion_Producto"
                        className="form-control"
                        onChange={handleDataProducto}
                        value={producto.Descripcion_Producto}
                      />
                    </div>

                    <div className="row mb-3">
                      <div className="col-6">
                        <label htmlFor="Id_Estado" className="form-label">
                          Estado
                        </label>
                        <select
                          className="form-select"
                          name="Id_Estado"
                          type="number"
                          onChange={handleDataProducto}
                          value={producto.Id_Estado}
                        >
                          <option defaultValue="Seleccione" hidden>
                            Seleccionar
                          </option>
                          {listestado.map((item) => (
                            <option key={item.Id_Estado} value={item.Id_Estado}>
                              {item.Nombre_Estado}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6">
                        <label htmlFor="Id_Categoria" className="form-label">
                          Categoria
                        </label>
                        <select
                          className="form-select"
                          name="Id_Categoria"
                          type="number"
                          onChange={handleDataProducto}
                          value={producto.Id_Categoria}
                        >
                          <option defaultValue="Seleccione" hidden>
                            Seleccionar
                          </option>
                          {listcategoria.map((item) => (
                            <option
                              key={item.Id_Categoria}
                              value={item.Id_Categoria}
                            >
                              {item.Nombre_Categoria}
                            </option>
                          ))}
                        </select>
                      </div>
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
                <div className="card-title"> Lista de Porductos</div>
                <div
                  className="table-responsive text-center"
                  style={{ overflowx: "scroll", height: "350px" }}
                >
                  <table className="table">
                    <thead>
                      <tr className="table-dark">
                        <th scope="col">Numero</th>
                        <th scope="col">Codigo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Categoria</th>
                        <th colSpan={2}>Gestionar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listprodcutos.map((item, index) => (
                        <tr key={index}>
                          <th>{item.Id_Producto}</th>
                          <th>{item.Codigo_Producto}</th>
                          <td>{item.Nombre_Producto}</td>
                          <td>{item.Descripcion_Producto}</td>
                          <td>{"Q" + item.Precio_Producto}</td>
                          <td>{item.Nombre_Estado}</td>
                          <td>{item.Nombre_Categoria}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                               onClick={() =>
                                 handleDelete(item.Id_Producto)
                               }
                            >
                              <i className="bx bx-trash"></i>
                            </button>{" "}
                            </td>
                            <td>
                            <button
                              type="button"
                              className="btn btn-secondary"
                               onClick={() =>
                                handleUpdate(item)
                               }
                            >
                              <i className='bx bx-edit-alt' ></i>
                            </button> 
                            
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

export default Productos;
