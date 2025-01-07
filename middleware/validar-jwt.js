import jwt from "jsonwebtoken";
import {Usuario} from "../models/index.js";


const validarJWT = async( req, res = response, next) =>{

    const token = req.header('x-token');
    
    // console.log( token );
    if (!token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById( uid );
        
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe'
            })
        }

        // Verificar si el uid tiene estado false
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado false'
            })
        }

        req.usuario = usuario;
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        }) 

    }
}


export {validarJWT}