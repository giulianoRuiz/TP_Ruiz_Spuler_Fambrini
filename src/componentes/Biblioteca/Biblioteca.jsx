import React, { useContext } from 'react'
import { ContextBibliotecas } from '../contextos/biblioteca';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableRow, TableCell } from '@mui/material';

export default function Biblioteca({ biblioteca }) {

    const { handlerActualizarBiblioteca, dispatch } = useContext(ContextBibliotecas);

    function ejecutarElEliminar() {
        if (confirm("Esta seguro que desea eliminar esta Biblioteca?")) {
            dispatch({ type: "eliminar", id: biblioteca.id })
        }
    }

    return (
        <TableRow key={biblioteca.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell  component="th" scope="row">{biblioteca.id}</TableCell>
            <TableCell align='right'>{biblioteca.nombre}</TableCell>
            <TableCell align='right'>{biblioteca.direccion}</TableCell>
            <TableCell align='right' sx={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                    variant="contained"
                    color="info"
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={() => handlerActualizarBiblioteca(biblioteca)}
                >
                    Editar
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    size="small"
                    onClick={ejecutarElEliminar}
                >
                    Eliminar
                </Button>
            </TableCell>
        </TableRow>
    )
}