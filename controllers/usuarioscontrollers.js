const Usuario = require("../models/Usuario");

exports.crearUsuario= async (req, res) =>{
    //Agregando usuariops a la base de datoss mongo db

    //se recomientda agregar un try por cualquier error
    try {
        let usuario;
         //Crea el nuevo usuario
         usuario = new Usuario(req.body);

         //Guarda usuario 
         await usuario.save();

         //mensaje de confirmacion
         res.send("Usuario creado correctamente");

    } catch (error) {
        
    }



    //Finalizando creacion de usuarios
}