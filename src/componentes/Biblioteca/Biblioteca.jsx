import React, { useContext } from 'react'
import { ContextBibliotecas } from '../contextos/biblioteca';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { TableRow, TableCell } from '@mui/material';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_BIBLIOTECAS } from "./ListadoBiblioteca.jsx";



const ELIMINAR_BIBLIOTECA = gql`
  mutation EliminarBiblioteca($id: String!) {
    eliminarBiblioteca(id: $id) {
      _id
      nombre
    }
  }
`;

export default function Biblioteca({ biblioteca }) {

    const { handlerActualizarBiblioteca, dispatch } = useContext(ContextBibliotecas);
    const [eliminarBiblioteca] = useMutation(ELIMINAR_BIBLIOTECA);
    const { refetch } = useQuery(GET_BIBLIOTECAS);

    const handleEliminarBiblioteca = async (id) => {
        try {
            await eliminarBiblioteca({ variables: { id } });
            // Luego de la eliminación en el servidor, actualiza localmente
            dispatch({ type: "eliminar", id });

            refetch();
        } catch (error) {
            console.error(error.message);
        }
    };

    function ejecutarElEliminar(id) {
        if (confirm("¿Está seguro de que desea eliminar esta Biblioteca?")) {
            // Llama a la eliminación en el servidor
            handleEliminarBiblioteca(id);
        }
    }


    return (
        <TableRow key={biblioteca._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">{biblioteca.nombre}</TableCell>
            <TableCell align="left">{biblioteca.correo}</TableCell>
            <TableCell align="left">{biblioteca.domicilio}</TableCell>
            <TableCell align="left">{biblioteca.ciudad}</TableCell>
            <TableCell align="left">{biblioteca.cp}</TableCell>
            <TableCell align="left">{biblioteca.direccion}</TableCell>
            <TableCell align='right' sx={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    size="small"
                    onClick={() => ejecutarElEliminar(biblioteca._id)}
                >
                    Eliminar
                </Button>
            </TableCell>
        </TableRow>
    )
}