import { Router } from "express";
import { methods as SucursalController } from "./../Controllers/sucursales.controller";

const routers = Router();

//Sucursal

routers.get("/listDepartamentos", SucursalController.getDepartamentos);
routers.get("/listMunicipios", SucursalController.getMunicipios);
routers.post("/addSucursal", SucursalController.addSucursal);
routers.get("/Sucursal", SucursalController.getSucursal);

//Porductos
routers.get("/listestado", SucursalController.getEstado);
routers.post("/addproducto", SucursalController.addProducto);
routers.get("/listproducto", SucursalController.getProdcuto);
routers.delete("/deleteproducto/:Id_Producto", SucursalController.deleteProducto); 
routers.put("/updateproducto/:Id_Producto", SucursalController.updateProducto); 

//Categoria
routers.get("/listcategoria", SucursalController.getCategoria);
routers.post("/addcategoria", SucursalController.addCategoria) //
routers.delete("/deletecategoria/:Id_Categoria", SucursalController.deleteCategoria); 

export default routers;
