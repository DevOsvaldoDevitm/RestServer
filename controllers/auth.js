import { json, response } from "express";

import {Usuario}  from "../models/index.js";

import bcryptjs from "bcryptjs";
import generarJWT from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";



const login = async(req, res = response)=>{

    const {correo, password} = req.body;

    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no es correcto'
            })
        }
        // Verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no es correcto - estado:false'
            })
        }

        // Verificar la scontraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no es correcto - password: false'
            })
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario, 
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el Administrador'
        })
    }

}

const googleSignIn = async(req, res = response)=>{
    const {id_token} = req.body;
    try {
        const {nombre, img, correo}  = await googleVerify(id_token); 
        console.log({ nombre, img, correo }); // Depuración
        
        let usuario = await Usuario.findOne({ correo});

        if(!usuario){
            const data = {
                nombre,
                rol: "USER_ROLE",
                correo,
                password: ':p',
                img,
                google: true
            }
            usuario = new Usuario (data);
            console.log(usuario)
            await usuario.save();
        }

        if( !usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        const token = await generarJWT(usuario.id);
            
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.error('Error en googleVerify:', error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verficar'
        })
    }

}

export {
    login,
    googleSignIn
};