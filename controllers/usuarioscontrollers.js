const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario= async (req, res) =>{

     //Aplicando el express-validation que realizamos en el routes
     const validacion = validationResult(req);
     if(!validacion.isEmpty()){
         return res.status(400).json({validacion: validacion.array()})
     }

    //Aplicando destructuring al objeto req para extraer el correo y contraseña ingresada
    const {email, password} = req.body;

    //Agregando usuariops a la base de datoss mongo db

    //se recomientda agregar un try por cualquier error
    try {

        let usuario= await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: "El usuario ya existe"});
        }
         //Crea el nuevo usuario
         usuario = new Usuario(req.body);

         //Hashear el password
         const salt = await bcryptjs.genSalt(10);
         usuario.password = await bcryptjs.hash(password, salt);

         //Guarda usuario 
         await usuario.save();

         //Crear y firmar el jwt
         const payload = {
             usuario: {
                 id: usuario.id
             }
         }

         //Firmar el jwt
         jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 3600000
         } ,(error, token) => {
            if(error)throw error;
            res.json({token});
         });

         //mensaje de confirmacion
        // res.json({msg: "El usuario se creo con exito"});

    } catch (error) {
        console.log(error);
        res.status(400).send("hubo un error");
    }



    //Finalizando creacion de usuarios
}