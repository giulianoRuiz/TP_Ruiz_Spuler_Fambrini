import React, { useContext } from "react";
import Biblioteca from './Biblioteca.jsx'
import { ContextBibliotecas } from "../contextos/biblioteca/index.js";
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

import { useQuery, gql } from '@apollo/client';

export const GET_BIBLIOTECAS = gql`
  query GetBibliotecas {
    bibliotecas {
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


export default function ListadoBiblioteca({ render }) {

    const { loading, error, data } = useQuery(GET_BIBLIOTECAS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  
    const columnas = ["Nombre", "Correo Electronico", "Domicilio", "Ciudad", "CP", "Direccion","Acciones"];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ background: '#E1E0EC' }}>
                    <TableRow>
                    {columnas.map(columna => <TableCell key={columna}><strong>{columna}</strong></TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.bibliotecas.map(biblioteca => (
                        <Biblioteca key={biblioteca._id} biblioteca={biblioteca} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}