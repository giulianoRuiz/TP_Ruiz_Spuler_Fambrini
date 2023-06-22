import React, { useContext } from "react";
import Libro from './Libro.jsx'
import { ContextLibros } from "../contextos/libro/index.js";
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

export default function ListadoLibro({ render }) {

  const { libros } = useContext(ContextLibros);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ background: '#E1E0EC' }}>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">Nombre</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">Descripcion</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">Fecha de Ingreso</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">Genero</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {libros.map(libro => (
            <Libro key={libro.id} libro={libro} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}