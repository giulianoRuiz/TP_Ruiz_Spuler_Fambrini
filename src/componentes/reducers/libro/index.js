export function librosReducer(libros, action) {

    switch(action.type) {
        case "agregar" : return [...libros, action.libro];
        case "actualizar" : return libros.map(libro => {

            //Pregunto si es el mismo ID
            if(libro.id === action.libro.id) {

                return action.libro;
            }

            return libro;
        })
        case "eliminar" : return libros.filter(libro => libro.id !== action.id);
        default : throw Error("Esta acción no esta contemplada");
    }
}
