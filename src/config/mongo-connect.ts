import { environment } from "src/environments/environment";

const { MongoClient } = require('mongodb')
const nameBD = environment.nameBD;
const MONGO_URI = 'mongodb://localhost/' + nameBD;
var connection: any;

//patron singlenton para que solo se cree una isntancia y no sature o cree erores al futuro
function connect() {
    if (!connection) {
        let client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        connection = new Promise((resolve, reject) => {
            // si existe devuelva el error como reject
            client.connect(function (err: any) { !err ? resolve(client.db(nameBD.toString())) : reject(err) })
            console.log('Base de datos Conectada');
        })
    }
    // si no existe la intancia entonces la creeo si escxiste no la creeo
    return connection
}

export const connectionDb = connect();
