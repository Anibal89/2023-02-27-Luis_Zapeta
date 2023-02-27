create schema sucursal;
use sucursal;

/*
	Base de datos DBA - Luis Zapeta
*/

# creacion de tablas

CREATE TABLE categoria (
 Id_Categoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
 Nombre_Categoria VARCHAR(50) NOT NULL,
 Descripcion_Categoria VARCHAR(50) NOT NULL
);

CREATE TABLE estado (
 Id_Estado INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
 Nombre_Estado VARCHAR(50) NOT NULL
);

CREATE TABLE producto (
 Id_Producto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
 Codigo_Prodcuto INT NOT NULL,
 Nombre_Producto VARCHAR(50) NOT NULL,
 Descripcion_Producto VARCHAR(50) NOT NULL,
 Precio_Producto DOUBLE NOT NULL,
 Id_Estado INT NOT NULL,
 Id_Categoria INT NOT NULL,
 CONSTRAINT Fk_Id_Estado FOREIGN KEY (Id_Estado) REFERENCES estado(Id_Estado),
 CONSTRAINT Fk_Id_Categoria FOREIGN KEY (Id_Categoria) REFERENCES categoria(Id_Categoria)
);

CREATE TABLE departamento(
	Id_Departamento INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	Nombre_Departamento VARCHAR(50) NOT NULL
);

CREATE TABLE municipio(
	Id_Municipio INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    Nombre_Municipio VARCHAR(50) NOT NULL,
	Id_Departamento INT NOT NULL,
	CONSTRAINT Fk_Id_Departamento_municipio FOREIGN KEY (Id_Departamento) REFERENCES departamento(Id_Departamento)
);

CREATE TABLE sucursal(
	Id_Sucursal INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	Nombre_Sucursal VARCHAR(50) NOT NULL,
    Direccion_Sucursal VARCHAR(50) NOT NULL,
	Correo_Sucursal VARCHAR(50) NOT NULL,
    Id_Departamento INT NOT NULL,
    Nombre_Municipio VARCHAR(50) NOT NULL,
    Telefono_Sucursal VARCHAR(50) NOT NULL,
	CONSTRAINT Fk_Id_Departamento_sucursal FOREIGN KEY (Id_Departamento) REFERENCES departamento(Id_Departamento)
);

CREATE TABLE inventario_productos(
	Id_Inventario_Productos INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	Fecha_creacion DATE,
    Id_Sucursal INT NOT NULL,
    Total_Inventario INT NOT NULL,
	CONSTRAINT Fk_Id_Sucursal FOREIGN KEY (Id_Sucursal) REFERENCES sucursal(Id_Sucursal)
);

CREATE TABLE detalle_Inventario(
	Id_Detalle_Inventario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	Id_Producto INT NOT NULL,
    cantida_producto INT NOT NULL,
    Stock_Producto INT NOT NULL,
    Fecha_Creacion date,
    Id_Inventario_Productos INT NOT NULL,
    CONSTRAINT Fk_Id_Producto FOREIGN KEY (Id_Producto) REFERENCES producto(Id_Producto),
    CONSTRAINT Fk_Id_Inventario_Productos FOREIGN KEY (Id_Inventario_Productos) REFERENCES inventario_productos(Id_Inventario_Productos)
);

/*
	Insert de Datos
*/

INSERT INTO categoria(Nombre_Categoria,Descripcion_Categoria) 
VALUES 
('bebidas','Producto liquido'),
('lacteos','Producto derivados de la leche'),
('sabritas','risitos de todo tipo');

INSERT INTO estado(Nombre_Estado) 
VALUES 
('activo'),
('inactivo');

INSERT INTO producto(Codigo_Producto, Nombre_Producto, Descripcion_Producto, Precio_Producto, Id_Estado, Id_Categoria) 
VALUES 
('A001','leche','producto marca nido','15.00',1,1),
('A002','fanta','producto marca Coca-Cola ','5.00',1,2),
('A003','crujitos','producto marca Frito lays ','5.00',2,3);

INSERT INTO departamento(Nombre_Departamento) 
VALUES 
('Guatemala'),
('Izabal'),
('peten');

INSERT INTO municipio(Nombre_Municipio,Id_Departamento) 
VALUES 
('Mixco',1),
('Villa Nueva',1),
('Santa Catarina Pinula',1),
('Fraijanes',1),
('El Estor',2),
('morales',2),
('livingston',2),
('Los Amates',2),
('San Luis',3),
('dolores',3),
('San Andrés',3),
('Sayaxché',3);

INSERT INTO sucursal(Nombre_Sucursal, Direccion_Sucursal, Correo_Sucursal, Id_Departamento, Nombre_Municipio, Telefono_Sucursal) 
VALUES 
('pais sancristobal',' bulevar principal sancristobal','sacrispais@gmail.com',1,'mixco','5158-5822'),
('Pais villanueva',' bulevar principal villanueva','paisvillanueva@gmail.com',2,'puerto barrios','5158-5922');



