import React, { useState, useContext, useEffect } from "react";

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { ContextBibliotecas } from "../contextos/biblioteca";

import { gql, useMutation } from '@apollo/client';
import { GET_BIBLIOTECAS } from "./ListadoBiblioteca.jsx";

const AGREGAR_BIBLIOTECA = gql`
  mutation agregarBiblioteca($input: BibliotecaInput) {
    agregarBiblioteca(input: $input) {
        _id
        nombre
        correo 
        domicilio
        ciudad
        cp
        direccion
    }
  }
`;

export default function FormBiblioteca() {

    const [agregarBiblioteca, { data }] = useMutation(AGREGAR_BIBLIOTECA, {
        refetchQueries: [
            GET_BIBLIOTECAS, // DocumentNode object parsed with gql
            'GetBibliotecas' // Query name
        ],
    });


    const sxFormBiblioteca = {
        marginBottom: 2
    }

    const { handlerActualizarBiblioteca, bibliotecaActualizar, dispatch } = useContext(ContextBibliotecas);

    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [domicilio, setDomicilio] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [cp, setCp] = useState("");
    const [direccion, setDireccion] = useState("");
    
    const handlerNombre = event => {
        setNombre(event.target.value);
    };
    
    const handlerCorreo = event => {
        setCorreo(event.target.value);
    };
    
    const handlerDomicilio = event => {
        setDomicilio(event.target.value);
    };
    
    const handlerCiudad = event => {
        setCiudad(event.target.value);
    };
    
    const handlerCp = event => {
        setCp(event.target.value);
    };
    
    function handlerDireccion(event) {
        setDireccion(event.target.value);
    }
    
    function limpiarForm() {
        setId("");
        setNombre("");
        setCorreo("");
        setDomicilio("");
        setCiudad("");
        setCp("");
        setDireccion("");
    }
    
    const handlerSubmit = event => {

        event.preventDefault();

        const biblioteca = {
            nombre : nombre,
            correo : correo,
            domicilio : domicilio,
            ciudad : ciudad,
            cp : cp,
            direccion : direccion
        }

        agregarBiblioteca({ variables: { input: biblioteca } })
        .then(()=> limpiarForm())
        .catch(e => console.error(e)) 
    }

    return (
        <div style={{ width: 300, padding: 10 }}>
        <form id="formBiblioteca" onSubmit={handlerSubmit}>
            <h1>Nueva Biblioteca</h1>
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
                    id="correo"
                    label="Correo"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={correo}
                    onChange={handlerCorreo}
                    sx={sxFormBiblioteca}
                />
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    id="domicilio"
                    label="Domicilio"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={domicilio}
                    onChange={handlerDomicilio}
                    sx={sxFormBiblioteca}
                />
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    id="ciudad"
                    label="Ciudad"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={ciudad}
                    onChange={handlerCiudad}
                    sx={sxFormBiblioteca}
                />
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    id="cp"
                    label="CP"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={cp}
                    onChange={handlerCp}
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
            )}*/}
        </form>
    </div>
    )
}