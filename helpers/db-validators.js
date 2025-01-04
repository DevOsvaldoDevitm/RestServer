import Role from "../models/role.js";
import Usuario from "../models/usuario.js";

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

export {
    esRoleValido,
    emailExist,
    existeUsuarioporID
}