// Nueva sintaxis con Imports y Exports >>>>>>>>>>>>> para utilizarlo en el package.json == "type": "module"
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv/config';

//dotenv.config();

console.log(process.env.DB_HOST);


const app = express();

// Código middleware = pequeños códigos que realizan acciones

// Conectar la base de datos:
db.authenticate()
  .then(() => { console.log(' Base de datos conectada') })
  .catch( error => console.log(error));

//Abrimos un puerto random con nodemopn, si no, por defecto el 4000
const port = process.env.PORT || 4000;

// Habilitar PUG >>>>> previa instalación npm i pug
app.set('view engine', 'pug');

// Obtener el año actual
app.use((request,response,next) => {
 
  const year = new Date(); // creamoa variable

  response.locals.actualYear = year.getFullYear(); // Pasamos variable hacia las vistas
  response.locals.nombreSitio = "Agencia de Viajes";

  return next(); // next() => Avanza hacia el siguiente middleware, RETURN  fuerza el avance.
  
});

//agregar Body Parser a Express para leer los datos del formulario
app.use(express.urlencoded({ extended: true}))

//Definir la carpeta pública para CSS e imágenes
app.use(express.static('public'));

//Importamos la página web desde router
app.use('/', router);


app.listen(port, () => {
  console.log(`El servidor está funcionando en el Puerto ${port}`);
});



//Definir Puerto: Instalamos nodemon (--save-dev) via npm para abrirnos un puerto y lo incluimos en los scripts del package.json

  // "scripts": { 
  //     "dev": "nodemon index.js"                
  // }, 



// Sintaxis en Commonjs >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const express = require('express');

// const app = express();

// //Definir Puerto;
// const port = process.env.PORT || 4000;


// app.listen(port, () => {
//   console.log(`El servidor está funcionando en el Puerto ${port}`);
// });



