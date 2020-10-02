//ruta para crear usuarios
const express = require("express");
const router = express.Router();
const usuariocontrollers = require("../controllers/usuarioscontrollers");

//Crea un usuario
//api/usuarios
router.post("/", 
    usuariocontrollers.crearUsuario
)

module.exports = router;