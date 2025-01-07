import { Usuario, Categoria, Producto } from "../models/index.js";
import Role from "../models/role.js";
// import  from "../models/usuario.js";

const esRoleValido = async( rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
            throw new Error(`El rol ${ rol} no esta en la BD`);
    }
}

const emailExist = async( correo = '')=>{
   // Verificar si el correo existe
    const emailExists = await Usuario.findOne({ correo });

    if (emailExists) {
        throw new Error (`El correo ${correo} ya esta registrado`)
    }
}
const existeUsuarioporID = async( id )=>{
   // Verificar si el correo existe
    const existeUsuario = await Usuario.findOne({ id });

    if ( existeUsuario) {
        throw new Error (`El id no existe ${ id }`)
    }
}

const existeCategoriaPorID = async( id )=>{
   // Verificar si el correo existe
    const existeCategoria = await Categoria.findById( id );

    if ( !existeCategoria) {
        throw new Error (`El id no existe ${ id }`)
    }
}
const existeProductoPorID = async( id )=>{
    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
 
     if ( !existeProducto) {
        throw new Error(`El ID ${id} no existe`);
     }
 }


export {
    esRoleValido,
    emailExist,
    existeUsuarioporID,
    existeCategoriaPorID,
    existeProductoPorID
}