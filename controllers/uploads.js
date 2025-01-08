import { response, request } from "express";

import * as dotenv from "dotenv";
dotenv.config();

import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import * as Cloudinary from 'cloudinary';
// console.log('CLOUDINARY_URL:', process.env.CLOUDINARY_URL);
Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});


import {Usuario, Producto} from "../models/index.js"

import { subirArchivo } from "../helpers/index.js";


const cargarArchivo = async (req, res = response) =>{

 // eslint-disable-line

try {
    // const nombre = await subirArchivo (req.files, ['txt', 'md'], 'textos');
    const nombre = await subirArchivo (req.files, undefined, 'imgs');
    res.json({
        nombre
    })
} catch (error) {
    res.status(400).json({ msg });
}

}

const actualizarImagen = async (req, res = response)=>{
    const {id, coleccion} = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})
            break;
    }

    // Limpiar imagenes previas
    if( modelo.img){
        // Borrar la img del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if( fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo (req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();

    res.json(modelo);
}

const actualizarImagenCloudinary = async (req, res = response)=>{
    const {id, coleccion} = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})
            break;
    }

    // Limpiar imagenes previas
    if( modelo.img){
        const nombreArr = modelo.ioymg.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        Cloudinary.uploader.destr(public_id);
    }
    console.log(req.files.archivo)
    const {tempFilePath} = req.files.archivo
    const {secure_url} = await Cloudinary.uploader.upload( tempFilePath);
    modelo.img = secure_url;
    await modelo.save();

    res.json(modelo);
}
const mostrarImagen = async(req, res = response) =>{
const {id, coleccion} = req.params;
let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})
            break;
    }

    // Limpiar imagenes previas
    if( modelo.img){
        // Borrar la img del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if( fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen)
        }
    }

   // Comprobar si el modelo tiene una imagen asociada
   if (modelo.img) {
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen); // Enviar la imagen existente
    }
}

// Enviar una imagen por defecto si no se encuentra la imagen asociada
const placeholderPath = path.join(__dirname, '../assets/no-image.jpg'); // Ruta al "placeholder"
if (fs.existsSync(placeholderPath)) {
    return res.sendFile(placeholderPath); // Enviar la imagen por defecto
}

// En caso de que no exista el "placeholder"
res.status(404).json({
    msg: 'No se encontró la imagen ni el placeholder'
});
}
export{
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}