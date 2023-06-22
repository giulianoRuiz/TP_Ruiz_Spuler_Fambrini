export function bibliotecasReducer(bibliotecas, action) {

    switch(action.type) {
        case "agregar" : return [...bibliotecas, action.biblioteca];
        case "actualizar" : return bibliotecas.map(biblioteca => {

            if(biblioteca.id === action.biblioteca.id) {

                return action.biblioteca;
            }

            return biblioteca;
        })
        case "eliminar" : return bibliotecas.filter(biblioteca => biblioteca.id !== action.id);
        default : throw Error("Esta acción no esta contemplada");
    }
}
