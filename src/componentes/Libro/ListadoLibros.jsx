import React, { useContext } from "react";
import Libro from './Libro.jsx'
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";


import { useQuery, gql } from '@apollo/client';

export const GET_LIBROS = gql`
  query GetLibros {
    libros {
      _id
      nombre
      descripcion 
      fecha_ingreso
      genero
    }
  }
`;

export default function ListadoLibro({ render }) {

  const { loading, error, data } = useQuery(GET_LIBROS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const columnas = ["Nombre", "Descripcion", "Fecha", "Genero", "Acciones"];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ background: '#E1E0EC' }}>
          <TableRow>
            {columnas.map(columna => <TableCell key={columna}><strong>{columna}</strong></TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
        {data.libros.map(libro => (
            <Libro key={libro.id} libro={libro} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}