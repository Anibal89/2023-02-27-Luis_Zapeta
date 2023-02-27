import { getConnection } from "./../database/database"; 


const getDepartamentos = async(req, res) => {

   try {
       const connection = await getConnection();
       const result = await connection.query("Select Id_Departamento, Nombre_Departamento from departamento");
       res.json(result);
   } catch (error) {
       res.status(500);
       res.status(error.message);
   }

};

const getMunicipios = async(req, res) => {

   try {
       const connection = await getConnection();
       const result = await connection.query("SELECT a.Id_Municipio, a.Nombre_Municipio, b.Id_Departamento, b.Nombre_Departamento FROM municipio a INNER JOIN departamento b WHERE  b.Id_Departamento =  a.Id_Departamento");
       res.json(result);
   } catch (error) {
       res.status(500);
       res.status(error.message);
   }

};


const addSucursal = async(req, res) => {

    try {
        const {Id_Sucursal,Nombre_Sucursal, Direccion_Sucursal, Correo_Sucursal, Id_Departamento, Nombre_Municipio, Telefono_Sucursal} = req.body;
        if(Nombre_Sucursal == undefined || Direccion_Sucursal == undefined ||Correo_Sucursal == undefined || Id_Departamento == undefined || Nombre_Municipio == undefined || Telefono_Sucursal == undefined )
        {
            res.status(400).json({message: "Solicitud incorrecta. Por favor complete todos los campos" });
        }
        const Registros={Id_Sucursal,Nombre_Sucursal, Direccion_Sucursal, Correo_Sucursal, Id_Departamento, Nombre_Municipio, Telefono_Sucursal}
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO sucursal SET ?", Registros)
        res.json([{message: "Sucursal Insertada"},result]);
    } catch (error) {
        res.status(500);
        res.status(error.message);
    }

};

const getSucursal = async(req, res) => {

    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT s.Id_Sucursal, s.Nombre_Sucursal, s.Direccion_Sucursal, s.Correo_Sucursal, d.Nombre_Departamento, s.Nombre_Municipio, s.Telefono_Sucursal FROM sucursal s INNER JOIN departamento d WHERE d.Id_Departamento = s.Id_Departamento");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.status(error.message);
    }
 
 };

 const getCategoria = async(req, res) => {

    try {
        const connection = await getConnection();
        const result = await connection.query("select * from categoria");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.status(error.message);
    }
 
 };

 const getEstado = async(req, res) => {

    try {
        const connection = await getConnection();
        const result = await connection.query("select * from estado");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.status(error.message);
    }
 
 };


 const addProducto = async(req, res) => {

    try {
        const {Id_Producto, Codigo_Producto, Nombre_Producto, Descripcion_Producto, Precio_Producto, Id_Estado, Id_Categoria} = req.body;
        if(Codigo_Producto == undefined || Nombre_Producto == undefined ||Descripcion_Producto == undefined || Precio_Producto == undefined || Id_Estado == undefined || Id_Categoria == undefined )
        {
            res.status(400).json({message: "Solicitud incorrecta. Por favor complete todos los campos" });
        }
        const Registros={Id_Producto, Codigo_Producto, Nombre_Producto, Descripcion_Producto, Precio_Producto, Id_Estado, Id_Categoria}
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO producto SET ?", Registros)
        res.json([{message: "Prodcuto insertado"},result]);
    } catch (error) {
        res.status(500);
        res.status(error.message);
    }

};

const getProdcuto = async(req, res) => {

    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT p.Id_Producto, p.Codigo_Producto, p.Nombre_Producto, p.Descripcion_Producto, p.Precio_Producto, c.Nombre_Categoria, e.Nombre_Estado FROM producto p INNER JOIN categoria c ON c.Id_Categoria = p.Id_Categoria INNER JOIN estado e ON e.Id_estado = p.Id_Estado ");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.status(error.message);
    }
};


const deleteProducto = async(req, res) => {

    try {
        const{Id_Producto} = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM producto WHERE Id_Producto = ?", Id_Producto);
        res.json([{message: "Eliminado"},result]);
    } catch (error) {
        res.status(500);
        res.status(error.message);
    }
};

const updateProducto = async(req, res) => {

    try {
         const{ Id_Producto } = req.params;
        const {Codigo_Producto, Nombre_Producto, Descripcion_Producto, Precio_Producto, Id_Estado, Id_Categoria} = req.body;

        if(Codigo_Producto == undefined ||Nombre_Producto ==undefined || Descripcion_Producto == undefined || Precio_Producto == undefined || Id_Estado == undefined || Id_Categoria == undefined)
         {
            res.status(400).json({message: "Solicitud incorrecta. Por favor complete todos los campos" });
         }
        const prodcuto={Id_Producto, Codigo_Producto, Nombre_Producto, Descripcion_Producto, Precio_Producto, Id_Estado, Id_Categoria}
         const connection = await getConnection();
         const result = await connection.query("UPDATE producto SET ? WHERE Id_Producto = ?", [prodcuto, Id_Producto]);
        res.json(result);
     } catch (error) {
         res.status(500);
         res.status(error.message);
     }

}

const addCategoria = async(req, res) => {

    try {
        const {Id_Categoria, Nombre_Categoria, Descripcion_Categoria} = req.body;
        if(Nombre_Categoria == undefined || Descripcion_Categoria == undefined)
        {
            res.status(400).json({message: "Solicitud incorrecta. Por favor complete todos los campos" });
        }
        const categorias={Id_Categoria, Nombre_Categoria, Descripcion_Categoria}
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO categoria SET ?", categorias)
        res.json([{message: "Categoria ingresada Insertada"},result]);
    } catch (error) {
        res.status(500);
        res.status(error.message);
    }

};


const deleteCategoria = async(req, res) => {

    try {
        const{Id_Categoria} = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM categoria WHERE Id_Categoria = ?", Id_Categoria);
        res.json([{message: "Eliminado"},result]);
    } catch (error) {
        res.status(500);
        res.status(error.message);
    }
};


export const methods = {
   getDepartamentos,
   getMunicipios,
   addSucursal,
   getSucursal,
   getCategoria,
   getEstado,
   addProducto,
   getProdcuto,
   deleteProducto,
   updateProducto,
   addCategoria,
   deleteCategoria
};