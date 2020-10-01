const express = require("express");
const conectarDB = require("./config/db");

//Crear el servidor 
const app= express();

//Conectar a la base de datos
conectarDB();

//puerto de la app
 const port = process.env.PORT || 4000;

 // arrancar la app
 app.listen(port, ()=>{
     console.log("el servidor esta funcionando en el puerto " + port);
 })