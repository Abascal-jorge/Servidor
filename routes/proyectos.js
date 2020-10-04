const express = require("express");
const router = express.Router();
const proyectocontrollers = require("../controllers/proyectoscontrollers");
const auth = require("../middleware/auth");
const {check} = require("express-validator");

//crea proyectos
//api/proyectos
router.post("/",
    auth,  
    [
        check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()
    ],
    proyectocontrollers.crearProyecto
);

//Obtener todos los proyectos
router.get("/",
    auth,
    proyectocontrollers.obtenerProyectos
);

//Actualizar proyecto via ID
router.put("/:id",
    auth,
    [
        check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()
    ],
    proyectocontrollers.actualizarProyecto
);

//Eliminar proyecto via id
router.delete("/:id",
    auth,
    proyectocontrollers.eliminarProyecto
);

/*
//eliminar proyecto via ID
router.delete("/:id",
    auth,
    proyectocontrollers.elimarProyecto
);

*/

module.exports = router;