import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from "./componentes/App.jsx" 

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
  });

// Borrar el contenido HTML existente
document.body.innerHTML = '<div id="app"></div>';

// Renderizar tu componente React en su lugar
const root = createRoot(document.getElementById('app'));
root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
);