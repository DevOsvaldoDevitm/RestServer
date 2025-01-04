import express from 'express';
import cors from 'cors';

import {router} from '../routes/user.js'
import dbConection from '../database/config.js';

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usariosRoutePath = '/api/usuarios';

        // Conectar a BD
        this.Database();
        
        // Middlewares
        this.middlewares();
        
        // Rutas de mi aplicacion
        this.routes();
        
        
    }
    
    async Database(){
        await dbConection();
    }

    middlewares(){
        // CORS
        this.app.use(cors())
    
        // Parseo y lectura del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use( express.static( 'public' ));
    
    }


    routes(){
        this.app.use(this.usariosRoutePath, router);
    }

    listen(){
        
    this.app.listen(this.port, ()=>{
        console.log('Servidor corriendo correctamente en el puerto', this.port);
    })
    }

}

export default Server;