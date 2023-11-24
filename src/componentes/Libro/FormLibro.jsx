import React, { useState, useContext, useEffect } from "react";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { useQuery, gql, useMutation } from '@apollo/client';
import { GET_LIBROS } from "./ListadoLibros.jsx";

const AGREGAR_LIBRO = gql`
  mutation agregarLibro($input: LibroInput) {
    agregarLibro(input: $input) {
        _id
        nombre
        descripcion 
        fecha_ingreso
        genero
    }
  }
`;

export default function FormLibro() {

    const [agregarLibro, { data }] = useMutation(AGREGAR_LIBRO, {
        refetchQueries: [
          GET_LIBROS, // DocumentNode object parsed with gql
          'GetLibros' // Query name
        ],
      });

    const sxFormLibro = {
        marginBottom: 2
    }

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fecha_ingreso, setFechaIngreso] = useState("");
    const [genero, setGenero] = useState("Terror");

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
    }

    const handlerSubmit = event => {

        event.preventDefault();

        const libro = {
            nombre: nombre,
            descripcion: descripcion,
            fecha_ingreso: fecha_ingreso,
            genero: genero
        }

        agregarLibro({ variables: { input: libro } })
        .then(()=> limpiarForm())
        .catch(e => console.error(e))  
    }

    return (
        <div style={{ width: 300, padding: 10 }}>
            <form id="formLibro" onSubmit={handlerSubmit}>
            <h1>Nuevo Libro</h1>

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
                   Guardar
                </Button>
                &nbsp;
                {/* {actualizar && (
                    <Button
                        variant="contained"
                        color="warning"
                        startIcon={<CancelIcon />}
                        size="small"
                        onClick={limpiarForm}
                    >
                        Cancelar
                    </Button>
                )} */}
            </form>
        </div>
    )
}