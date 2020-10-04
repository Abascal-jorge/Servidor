const Proyecto = require ("../models/Proyecto");
const { validationResult } = require("express-validator");
 
exports.crearProyecto = async (req, res) =>{
    //Reviusa si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try {
        //Crear un nuevo proyecto
        const proyecto = Proyecto(req.body);
        //Guardar el creador via JWT
        proyecto.creador = req.usuario.id;
        //Guardamos el proyecto
        proyecto.save();
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}

//Trabajando en obtener proyectos con el metodo get de proyectos
exports.obtenerProyectos = async (req, res) => {
    try {
        //console.log(req.usuario);
        // Consultano la base de datos
        const proyectos = await Proyecto.find({creador: req.usuario.id }).sort({creado:-1});
        res.json({proyectos});
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

//Actualizando un proyecto con el metodo put

exports.actualizarProyecto = async (req, res) =>{
    //Reviusa si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //Extraer la informacion del proyecto
    const {nombre} = req.body;
    const nuevoproyecto = {}

    if(nombre){
        nuevoproyecto.nombre = nombre;
    }

    try {
        //console.log(req.params.id);
        //Revisar le ID
        let proyecto = await Proyecto.findById(req.params.id);
        //Si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({ msg: "Proyecto no encontrado"});
        }
        //Verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: "No autorizado"});
        }
        //Actualizar
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id}, { $set: nuevoproyecto}, {new: true});
        
        res.json({proyecto});
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en la actualizacion");
    }
}

//Eliminando un proyecto

exports.eliminarProyecto = async (req, res) => {
    try {
        //console.log(req.params.id);
        //Revisar le ID
        let proyecto = await Proyecto.findById(req.params.id);

        //Si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({ msg: "Proyecto no encontrado"});
        }

        //Verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: "No autorizado"});
        }

        //Elimar proyecto
        await Proyecto.findOneAndRemove({ _id: req.params.id});
        
        res.json( {msg: "proyecto eliminado"} );
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en la eliminacion");
    }
}