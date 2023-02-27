import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Productos from "./pages/Productos";
import Sucursales from "./pages/Sucursales";
import Agregarsucursal from "./components/sucursales/Agregarsucursal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Nav from "./components/Nav";
import Categoria from "./pages/Categoria";

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/*Rutas de Accesso*/}
        <Nav/>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos  />} />
          <Route path="/categoria" element={<Categoria/>} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/agregarsucursal" element={<Agregarsucursal />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
