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
        //console.log(existeproyecto);
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

//Actualizar tareas 

exports.actualizarTarea = async (req, res) => {

    try {
        //Extraer el proyecto y comprobar si existe
        const {proyecto, nombre, estado} = req.body;
        
         //Verificando si el la tarea existe 
        let existetarea = await Tarea.findById(req.params.id); 
         if(!existetarea){
            return res.status(404).json({msg: "tarea no encontrado"});
        }

        const existeProyecto = await Proyecto.findById(proyecto);
        //Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: "No autorizado"});
        }

        //Crear un objeto con la nueva informacion
        const nuevaTarea = {};

        if(nombre){
            nuevaTarea.nombre = nombre;
        }

        if(estado){
            nuevaTarea.estado = estado;
        }

        //Guardar la tarea
        existetarea = await Tarea.findOneAndUpdate({_id : req.params.id}, nuevaTarea, { new: true });
        res.json({ existetarea});
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: "Error en actualizacion"});
    }
}

//Eliminar tarea 
exports.eliminarTarea = async (req, res) => {

    try {
        //Extraer el proyecto y comprobar si existe
        const {proyecto} = req.body;
        
         //Verificando si el la tarea existe 
        let existetarea = await Tarea.findById(req.params.id); 
         if(!existetarea){
            return res.status(404).json({msg: "tarea no encontrado"});
        }

        const existeProyecto = await Proyecto.findById(proyecto);
        //Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: "No autorizado"});
        }

        //Eliminar Tarea
        await Tarea.findOneAndRemove({ _id : req.params.id});
        res.json({ mgs: "Tarea Eliminada"});
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: "Error en eliminacion de tarea"});
    }
}

