import express from 'express';
import cors from 'cors';

import userRouter from '../routes/user.js'; // Importa directamente el router
import authRouter from '../routes/auth.js'; // Importa directamente el router
import categoriasRouter from '../routes/categorias.js'; 
import productosRouter from '../routes/productos.js'
import dbConection from '../database/config.js';
import  buscarRouter from '../routes/buscar.js';

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios',
            productos:  '/api/productos'

        }

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
        this.app.use(this.paths.auth, authRouter);
        this.app.use(this.paths.categorias, categoriasRouter);
        this.app.use(this.paths.usuarios,userRouter);
        this.app.use(this.paths.productos,productosRouter);
        this.app.use(this.paths.buscar,buscarRouter);
        
    }

    listen(){
        
    this.app.listen(this.port, ()=>{
        console.log('Servidor corriendo correctamente en el puerto', this.port);
    })
    }

}

export default Server;