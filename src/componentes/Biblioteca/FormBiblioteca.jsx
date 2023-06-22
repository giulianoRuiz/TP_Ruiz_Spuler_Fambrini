import React, { useState, useContext, useEffect } from "react";

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { ContextBibliotecas } from "../contextos/biblioteca";

export default function FormBiblioteca() {

    const sxFormBiblioteca = {
        marginBottom: 2
    }

    const { handlerActualizarBiblioteca, bibliotecaActualizar, dispatch } = useContext(ContextBibliotecas);

    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [actualizar, setActualizar] = useState(false);

    useEffect(() => {

        if (bibliotecaActualizar) {
            cargarForm();
            setActualizar(true);
        }

    }, [bibliotecaActualizar])

    function cargarForm() {

        setId(bibliotecaActualizar.id)
        setNombre(bibliotecaActualizar.nombre)
        setDireccion(bibliotecaActualizar.direccion)
    }

    const handlerNombre = event => {
        setNombre(event.target.value);
    }

    function handlerDireccion(event) {
        setDireccion(event.target.value);
    }

    function limpiarForm() {

        setId("");
        setNombre("");
        setDireccion("");

        if (actualizar) {
            setActualizar(false);
            handlerActualizarBiblioteca();
        }
    }

    const handlerSubmit = event => {

        event.preventDefault();

        //Creo funcion para generar IDs aleatorios con Javascript. Si es para actualizar, simplemente devuelve el ID
        function generarId() {
            if (id) {
                return bibliotecaActualizar.id; // Utilizo el ID existente de la persona que se está actualizando
            } else {
                const randomId = Math.floor(Math.random() * 1000000).toString();
                return randomId;
            }
        }

        const biblioteca = {
            id: generarId(),
            nombre: nombre,
            direccion: direccion
        }

        dispatch({ type: actualizar ? "actualizar" : "agregar", biblioteca: actualizar ? { ...biblioteca, id: bibliotecaActualizar.id } : biblioteca })

        limpiarForm();
    }

    return (
        <div style={{ width: 300, padding: 10 }}>
            <form id="formBiblioteca" onSubmit={handlerSubmit}>
                <h1>{actualizar ? "Edición Biblioteca" : "Nueva Biblioteca"}</h1>
                <FormControl fullWidth>
                    <TextField
                        id="nombre"
                        label="Nombre"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={nombre}
                        onChange={handlerNombre}
                        sx={sxFormBiblioteca}
                    />
                </FormControl>

                <FormControl fullWidth>
                <TextField
                        id="direccion"
                        label="Direccion"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={direccion}
                        onChange={handlerDireccion}
                        sx={sxFormBiblioteca}
                    />
                </FormControl>

                <Button
                    variant="contained"
                    color="success"
                    startIcon={<SaveIcon />}
                    size="small"
                    type="submit"
                >
                    {actualizar ? "Actualizar" : "Guardar"}
                </Button>
                &nbsp;
                {actualizar && (
                    <Button
                        variant="contained"
                        color="warning"
                        startIcon={<CancelIcon />}
                        size="small"
                        onClick={limpiarForm}
                    >
                        Cancelar
                    </Button>
                )}
            </form>
        </div>
    )
}