const express = require("express");
const router = express.Router();
const tareacontrollers = require("../controllers/tareacontrollers");
const auth = require("../middleware/auth");
const { check } = require("express-validator");


//Crear una tarea
//Api/tareas

router.post("/",
    auth,
    [
        check("nombre", "El nombre de la tarea es obligatorio").not().isEmpty(),
        check("proyecto", "El proyecto es obligatorio").not().isEmpty()
    ],
    tareacontrollers.crearTarea
);

//LLamando obtener datos
router.get("/",
    auth,
    tareacontrollers.obtenerTarea
);

//Actualizando datos tareas
router.put("/:id",
    auth,
    tareacontrollers.actualizarTarea
);

//Eliminar Tarea 

router.delete("/:id",
    auth,
    tareacontrollers.eliminarTarea
);

module.exports = router;