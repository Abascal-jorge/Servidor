const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

//Crear una nueva tarea
exports.crearTarea = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req.body);
    if( !errores.isEmpty() ){
        return res.status(400).json({errores: errores.array() });
    }

    //extraer el proyecto y comprobar si existe 
    try {
        const {proyecto} = req.body;
        const existeproyecto = await Proyecto.findById(proyecto);
        if(!existeproyecto){
            return res.status(404).json({msg: "Proyecto no encontrado"});
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeproyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: "No Autorizado"});
        }

        //creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json(  {tarea} );
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en tareas");
    }
}

//Obtener Lista de las tareas por id de proyecto 
exports.obtenerTarea = async (req, res) => {
    try {

        const {proyecto} = req.body;
        const existeproyecto = await Proyecto.findById(proyecto);
        if(!existeproyecto){
            return res.status(404).json({msg: "Proyecto no encontrado"});
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeproyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: "No Autorizado"});
        }



        // Consultano la base de datos
        const tareas = await Tarea.find({ proyecto }).sort({creado:-1});
        res.json({tareas});
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

