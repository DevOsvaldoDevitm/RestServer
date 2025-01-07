import { response } from "express";
import mongoose, { Types } from "mongoose";
import {Producto, Usuario, Categoria} from "../models/index.js"
// Uso de ObjectId
const { ObjectId } = Types;


const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino = '', res = response)=>{
    const esMongoID = ObjectId.isValid ( termino );
    if (  esMongoID ){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }
    // Si no es un ID válido, manejar búsqueda por nombre o devolver error
    const regex = new RegExp(termino, 'i'); // Expresión regular para búsqueda insensible a mayúsculas/minúsculas
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    return res.json({
        results: usuarios
    });
}
const buscarCategorias = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        // Buscar por ID si es válido
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: categoria ? [categoria] : []
        });
    }

    // Buscar por nombre con expresión regular
    const regex = new RegExp(termino, 'i');
    const categorias = await Categoria.find({ nombre: regex, estado: true });

    return res.json({
        results: categorias
    });
};

const buscarProductos = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        // Buscar por ID si es válido
        const producto = await Producto.findById(termino)
            .populate('categoria', 'nombre');
        return res.json({
            results: producto ? [producto] : []
        });
    }

    // Buscar por nombre con expresión regular
    const regex = new RegExp(termino, 'i');
    const productos = await Producto.find({ nombre: regex, estado: true })
        .populate('categoria', 'nombre');

    return res.json({
        results: productos
    });
};


const buscar = (req,res= response)=>{
    const {coleccion, termino} = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        case 'categoria':
            buscarCategorias(termino, res)
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;
    
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer la busqueda'
            });
    }
}

export{
    buscar
}