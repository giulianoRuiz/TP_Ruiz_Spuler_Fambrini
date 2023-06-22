import React, { useState, useContext, useEffect } from "react";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { ContextLibros } from "../contextos/libro";

export default function FormLibro() {

    const sxFormLibro = {
        marginBottom: 2
    }

    const { handlerActualizarLibro, libroActualizar, dispatch } = useContext(ContextLibros);

    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fecha_ingreso, setFechaIngreso] = useState("");
    const [genero, setGenero] = useState("Terror");
    const [actualizar, setActualizar] = useState(false);

    useEffect(() => {

        if (libroActualizar) {
            cargarForm();
            setActualizar(true);
        }

    }, [libroActualizar])

    function cargarForm() {

        setId(libroActualizar.id)
        setNombre(libroActualizar.nombre)
        setDescripcion(libroActualizar.descripcion)
        setFechaIngreso(libroActualizar.fecha_ingreso)
        setGenero(libroActualizar.genero)
    }

    const handlerNombre = event => {
        setNombre(event.target.value);
    }

    function handlerDescripcion(event) {
        setDescripcion(event.target.value);
    }

    function handlerFechaIngreso(event) {
        setFechaIngreso(event.target.value);
    }

    function handlerGenero(event) {
        setGenero(event.target.value);
    }

    function limpiarForm() {

        setId("");
        setNombre("");
        setDescripcion("");
        setFechaIngreso("");
        setGenero("Terror");

        if (actualizar) {
            setActualizar(false);
            handlerActualizarLibro();
        }
    }

    const handlerSubmit = event => {

        event.preventDefault();

        function generarId() {
            if (id) {
                return libroActualizar.id; // Utilizo el ID existente de la persona que se actualiza
            } else {
                const randomId = Math.floor(Math.random() * 1000000).toString();
                return randomId;
            }
        }

        const libro = {
            id: generarId(),
            nombre: nombre,
            descripcion: descripcion,
            fecha_ingreso: fecha_ingreso,
            genero: genero
        }

        dispatch({ type: actualizar ? "actualizar" : "agregar", libro: actualizar ? { ...libro, id: libroActualizar.id } : libro })

        limpiarForm();
    }

    return (
        <div style={{ width: 300, padding: 10 }}>
            <form id="formLibro" onSubmit={handlerSubmit}>
            <h1>{actualizar ? "Edición Libro" : "Nuevo Libro"}</h1>

                <FormControl fullWidth>
                    <TextField
                        id="nombre"
                        label="Nombre"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={nombre}
                        onChange={handlerNombre}
                        sx={sxFormLibro}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        id="descripcion"
                        label="Descripción"
                        variant="outlined"
                        size="small"
                        fullWidth
                        multiline
                        value={descripcion}
                        onChange={handlerDescripcion}
                        sx={sxFormLibro}
                        rows={6}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        type="date"
                        id="fecha_ingreso"
                        label="Fecha de Ingreso"
                        variant="outlined"
                        size="small"
                        value={fecha_ingreso}
                        onChange={handlerFechaIngreso}
                        sx={sxFormLibro}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="labelGenero">Genero</InputLabel>
                    <Select
                        labelId="labelGenero"
                        id="genero"
                        value={genero}
                        onChange={handlerGenero}
                        sx={sxFormLibro}
                    >
                        <MenuItem value={"Terror"}>Terror</MenuItem>
                        <MenuItem value={"Fantasia"}>Fantasia</MenuItem>
                        <MenuItem value={"Comedia"}>Comedia</MenuItem>
                    </Select>
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