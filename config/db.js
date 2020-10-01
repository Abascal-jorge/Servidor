/*const MongoClient = require ('mongodb'). MongoClient;
const uri = " mongodb + srv : // root : <contraseña> @ cluster0.u3kfd.mongodb.net / <dbname> ? retryWrites = true & w = mayoría ";
const client = new MongoClient (uri, {useNewUrlParser: true} );
client.connect (err => {
  const collection = client.db ("prueba"). collection ("dispositivos");
  // realizar acciones en el objeto de colección
  client.close ();
} );*/


//Connectando mongo db a app nodex express
const mongoose = require("mongoose");
require("dotenv").config({path: "variables.env"});


const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("DB Conectado");
    } catch (error) {
        console.log(error);
        process.exit(1); /// detener la app
    }
}

module.exports = conectarDB;