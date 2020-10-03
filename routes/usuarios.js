//ruta para crear usuarios
const express = require("express");
const router = express.Router();
const usuariocontrollers = require("../controllers/usuarioscontrollers");
const {check} = require("express-validator");

//Crea un usuario
//api/usuarios
router.post("/",  
   [
       check("nombre", "El nombre es obligatorio").not().isEmpty(),
       check("email", "Ingrese un correo valido").isEmail(),
       check("password", "La contraseña debe tener 6 digitos minimos").isLength({min: 6})
   ],
    usuariocontrollers.crearUsuario
)

module.exports = router;