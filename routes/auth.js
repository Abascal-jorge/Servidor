//ruta para crear authetaficacion
const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/authcontrollers");
const { check } = require("express-validator");

//Crea validacion de usuario
//api/auth
router.post("/",  
   [
       check("email", "Ingrese un correo valido").isEmail(),
       check("password", "La contraseña debe tener 6 digitos minimos").isLength({min: 6})
   ],
   authcontroller.autenticarUsuario
);

module.exports = router;