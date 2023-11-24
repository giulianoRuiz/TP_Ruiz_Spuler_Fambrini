import React, { useContext } from 'react'
import { ContextLibros } from '../contextos/libro';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableRow, TableCell } from '@mui/material';
import { format } from "date-fns";
import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_LIBROS } from "./ListadoLibros.jsx";

const ELIMINAR_LIBRO = gql`
  mutation EliminarLibro($id: String!) {
    eliminarLibro(id: $id) {
      _id
      nombre
    }
  }
`;

export default function Libro({ libro }) {

    const { handlerActualizarLibro, dispatch } = useContext(ContextLibros);

    const [eliminarLibro] = useMutation(ELIMINAR_LIBRO);
    const { refetch } = useQuery(GET_LIBROS);

    const handleEliminarLibro = async (id) => {
        try {
            await eliminarLibro({ variables: { id } });
            // Luego de la eliminación en el servidor, actualiza localmente
            dispatch({ type: "eliminar", id });

            refetch();
        } catch (error) {
            console.error(error.message);
        }
    };

    function ejecutarElEliminar(id) {
        if (confirm("¿Está seguro de que desea eliminar esta Libro?")) {
            // Llama a la eliminación en el servidor
            handleEliminarLibro(id);
        }
    }

    //Le doy formato a la fecha para que se vea en formato dd/mm/aaaa
    //No lo hago directamente en el return porque hay que sumarle un dia para que se muestre correctamente, y en una linea queda un choclo.
    //Para que el formateo funcione, tire 'npm install date-fns' en la consola

    // Convierto a número
    const fechaEnMilisegundos = parseInt(libro.fecha_ingreso, 10);

    // Creo objeto Date
    const fechaIngreso = new Date(fechaEnMilisegundos);
    fechaIngreso.setDate(fechaIngreso.getDate() + 1);

    // Formateo la fecha
    const fechaFormateada = format(fechaIngreso, "dd/MM/yyyy");

    return (
        <TableRow key={libro._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">{libro.nombre}</TableCell>
            <TableCell align='right'>{libro.descripcion}</TableCell>
            <TableCell align='right'>{fechaFormateada}</TableCell>
            <TableCell align='right'>{libro.genero}</TableCell>
            <TableCell align='right' sx={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    size="small"
                    onClick={() => ejecutarElEliminar(libro._id)}
                >
                    Eliminar
                </Button>
            </TableCell>
        </TableRow>
    )
}