import React, { useState, useEffect, useReducer, useContext } from 'react'
// import Libro from './Libro/Libro.jsx'
// import Listado from './Listado.jsx'
import ListadoLibros from './Libro/ListadoLibros.jsx';
import { librosReducer } from './reducers/libro/index.js';
import { ContextLibros } from './contextos/libro/index.js';
import FormLibro from './Libro/FormLibro.jsx';
import ListadoBiblioteca from './Biblioteca/ListadoBiblioteca.jsx';
import { bibliotecasReducer } from './reducers/biblioteca/index.js';
import { ContextBibliotecas } from './contextos/biblioteca/index.js';
import FormBiblioteca from './Biblioteca/FormBiblioteca.jsx';
import NavBar from './NavBar.jsx';

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Outlet,
    Routes,
    useNavigate
} from "react-router-dom";

const router = createBrowserRouter([
    { path: "/", Component: Layout, },
    { path: "*", Component: Root }
]);

export default function App() {
    return <RouterProvider router={router} />;
}

function Root() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="*" element={<NoExistePagina />} />
                <Route exact path="/libros" element={<LibrosApp />} />
                <Route exact path="/bibliotecas" element={<BibliotecasApp />} />
            </Route>
        </Routes>
    );
}

function NoExistePagina() {
    return (
        <h1>Error, la página no existe</h1>
    )
}

function LibrosApp() {

    return (
        <>
            <FormLibro />
            <ListadoLibros />
        </>
    )
}

function BibliotecasApp() {
    return (
        <>
            <FormBiblioteca />
            <ListadoBiblioteca />
        </>
    )
}


const initialLibros = JSON.parse(localStorage.getItem("libros")) || [];
const initialBibliotecas = JSON.parse(localStorage.getItem("bibliotecas")) || [];

function Layout(props) {
    const navigate = useNavigate();
    const sxApp = {
        display: "flex",
        justifyContent: "center"
    };

    const [libros, dispatchLibros] = useReducer(librosReducer, initialLibros);
    const [libroActualizar, setLibroActualizar] = useState();

    const [bibliotecas, dispatchBibliotecas] = useReducer(bibliotecasReducer, initialBibliotecas);
    const [bibliotecaActualizar, setBibliotecaActualizar] = useState();

    useEffect(() => {
        localStorage.setItem("libros", JSON.stringify(libros));
        navigate("/libros");
    }, [libros]);

    useEffect(() => {
        localStorage.setItem("bibliotecas", JSON.stringify(bibliotecas));
        navigate("/bibliotecas");
    }, [bibliotecas]);

    function handlerActualizarLibro(libroQueVoyActualizar) {
        setLibroActualizar(libroQueVoyActualizar);
    }

    function handlerActualizarBiblioteca(bibliotecaQueVoyActualizar) {
        setBibliotecaActualizar(bibliotecaQueVoyActualizar);
    }

    return (
        <>
            <NavBar />
            <div style={sxApp}>
                <ContextLibros.Provider
                    value={{
                        libroActualizar: libroActualizar,
                        handlerActualizarLibro: handlerActualizarLibro,
                        libros: libros,
                        dispatch: dispatchLibros
                    }}
                >
                    <ContextBibliotecas.Provider
                        value={{
                            bibliotecaActualizar: bibliotecaActualizar,
                            handlerActualizarBiblioteca: handlerActualizarBiblioteca,
                            bibliotecas: bibliotecas,
                            dispatch: dispatchBibliotecas
                        }}
                    >
                        <Outlet />
                    </ContextBibliotecas.Provider>
                </ContextLibros.Provider>
            </div>
        </>
    );
}
