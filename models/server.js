import express from 'express';
import cors from 'cors';

import userRouter from '../routes/user.js'; // Importa directamente el router
import authRouter from '../routes/auth.js'; // Importa directamente el router
import dbConection from '../database/config.js';

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usariosRoutePath = '/api/usuarios';
        this.authPath = '/api/auth';

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
        this.app.use(this.usariosRoutePath,userRouter);
        this.app.use(this.authPath, authRouter);
        
    }

    listen(){
        
    this.app.listen(this.port, ()=>{
        console.log('Servidor corriendo correctamente en el puerto', this.port);
    })
    }

}

export default Server;