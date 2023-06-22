import React, { useContext } from "react";
import Biblioteca from './Biblioteca.jsx'
import { ContextBibliotecas } from "../contextos/biblioteca/index.js";
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

export default function ListadoBiblioteca({ render }) {

    const { bibliotecas } = useContext(ContextBibliotecas);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ background: '#E1E0EC' }}>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="right">Nombre</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="right">Direccion</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bibliotecas.map(biblioteca => (
                        <Biblioteca key={biblioteca.id} biblioteca={biblioteca} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}