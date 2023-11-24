const mongoose = require('mongoose');
const { Schema } = mongoose;

const bibliotecaSchema = new Schema({
    nombre : String,
    correo : String ,
    domicilio : String,
    ciudad : String,
    cp : String,
    direccion : String
})

const Biblioteca = mongoose.model('Biblioteca', bibliotecaSchema);

module.exports = Biblioteca;