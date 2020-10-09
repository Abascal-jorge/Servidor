//ruta para crear authetaficacion
const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/authcontrollers");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//INICIAR SESION
//api/auth
router.post("/",  
   authcontroller.autenticarUsuario
);

//obtiene el usuario autenticado
router.get("/",
   auth,
   authcontroller.usuarioAutenticado
);


module.exports = router;