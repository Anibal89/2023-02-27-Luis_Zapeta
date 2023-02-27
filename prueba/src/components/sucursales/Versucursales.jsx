
const Versucursales = ({ datoingreso}) => {
 
  return (
    <>
       <div className="card">
        <div className="card-body">
          <div className="card-title">{"Numero de sucursal: " + datoingreso.Id_Sucursal}</div>
          <h6>{"Nombre: " + datoingreso.Nombre_Sucursal}</h6>
          <h6>{"Direccion: " + datoingreso.Direccion_Sucursal}</h6>
          <h6>{"Email: " + datoingreso.Correo_Sucursal}</h6>
          <h6>{"Departamento: " + datoingreso.Nombre_Departamento}</h6>
          <h6>{"Municipio: " + datoingreso.Nombre_Municipio}</h6>
          <h6>{"Telefono: " + datoingreso.Telefono_Sucursal}</h6>

          <div className=" container d-flex justify-content-end gap-3">
            <button
              type="button"
              className="btn btn-warning w-md"
            >
             <i className='bx bx-edit-alt' ></i> Actualizar
            </button>
            <button
              type="button"
              className="btn btn-dark w-md"
            >
              <i className='bx bx-memory-card'></i> inventario
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Versucursales;
