import { response } from "express";

const usuariosGet = (req, res = response) => {

    const {q, nombre = 'No name', apikey} = req.query;

    res.json({
        msg: 'get API',
        q,
        nombre,
        apikey
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API'
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params.id;
    res.json({
        msg: 'put API',
        id
    });
}

const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        msg: 'post API',
        nombre,
        edad
    });
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    });
}

export {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut,
}