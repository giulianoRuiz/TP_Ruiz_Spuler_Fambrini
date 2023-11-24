const express = require("express");
const path = require("path");
const app = express();
const puerto = 3000;
const mongoose = require('mongoose');
const Libro = require("./modulos/Libro.js")
const Biblioteca = require("./modulos/Biblioteca.js")
const { ApolloServer, gql } = require('apollo-server-express');

const uri = "mongodb://admin:123456@127.0.0.1:27017/test";

// Agregamos el middleware para que podamos hacer uso
// de archivos estaticos que se encuentran en el directorio public
app.use(express.static('public', { index : false }));

// Agregamos el middleware para que revise las request
// y si vienen con parametros en formato json las pueda procesar
app.use(express.json());

// Agregamos el middleware para que revise las request
// y si vienen con parametros en formato x-www-form-data-urlencoded las pueda procesar
app.use(express.urlencoded());

app.get("/*", (req, res, next) => {

  if(req.url === "/graphql") {
    return next();
  }

  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    libros : [Libro]
  }

  type Libro {
    _id : String
    nombre : String
    descripcion : String 
    fecha_ingreso : String
    genero : String
  }

  input LibroInput {
    nombre : String
    descripcion : String 
    fecha_ingreso : String
    genero : String
  }

  type Query {
    bibliotecas : [Biblioteca]
  }

  type Biblioteca {
    _id : String
    nombre : String
    correo : String 
    domicilio : String
    ciudad : String
    cp : String
    direccion : String
  }

  type Mutation {
    agregarBiblioteca(input : BibliotecaInput) : Biblioteca
    agregarLibro(input : LibroInput) : Libro
    eliminarLibro(id: String!): Libro
    eliminarBiblioteca(id: String!): Biblioteca
  }

  input BibliotecaInput {
    nombre : String
    correo : String 
    domicilio : String
    ciudad : String
    cp : String
    direccion : String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    libros : async () => {
        return await Libro.find();
    },
    bibliotecas : async () => {
        return await Biblioteca.find();
    }
  },
  Mutation: {
    agregarLibro : async (_, { input }, contextValue, info) =>{

        const nuevoLibro = new Libro(input);
        await nuevoLibro.save();
        return nuevoLibro;
    },
    agregarBiblioteca : async (_, { input }, contextValue, info) =>{

        const nuevoBiblioteca = new Biblioteca(input);
        await nuevoBiblioteca.save();
        return nuevoBiblioteca;
    },
    eliminarLibro: async (_, { id }, contextValue, info) => {
      return await Libro.findByIdAndDelete(id);
    },
    eliminarBiblioteca: async (_, { id }, contextValue, info) => {
      return await Biblioteca.findByIdAndDelete(id);
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
    
    server.applyMiddleware({ app });
    app.listen(puerto, async () => {
        console.info(`El servidor Express ya esta escuchando en http://localhost:${puerto}`);
        
        mongoose.connect(uri)
        .then(() => console.info("Conexión a MongoDB establecida"))
        .catch(err => console.error("Ocurrió un error al conectarnos: ", err));
    });
})