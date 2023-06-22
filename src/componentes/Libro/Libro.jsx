import React, { useContext } from 'react'
import { ContextLibros } from '../contextos/libro';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableRow, TableCell } from '@mui/material';
import { format } from "date-fns";

export default function Libro({ libro }) {

    const { handlerActualizarLibro, dispatch } = useContext(ContextLibros);

    function ejecutarElEliminar() {
        if (confirm("Esta seguro que desea eliminar este libro?")) {
            dispatch({ type: "eliminar", id: libro.id })
        }
    }

    //Le doy formato a la fecha para que se vea en formato dd/mm/aaaa
    //No lo hago directamente en el return porque hay que sumarle un dia para que se muestre correctamente, y en una linea queda un choclo.
    //Para que el formateo funcione, tire 'npm install date-fns' en la consola
    const fechaIngreso = new Date(libro.fecha_ingreso);
    fechaIngreso.setDate(fechaIngreso.getDate() + 1);

    const fechaFormateada = format(fechaIngreso, "dd/MM/yyyy");

    return (
        <TableRow key={libro.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">{libro.id}</TableCell>
            <TableCell align='right'>{libro.nombre}</TableCell>
            <TableCell align='right'>{libro.descripcion}</TableCell>
            <TableCell align='right'>{fechaFormateada}</TableCell>
            <TableCell align='right'>{libro.genero}</TableCell>
            <TableCell align='right' sx={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                    variant="contained"
                    color="info"
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={() => handlerActualizarLibro(libro)}
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