import { Router } from 'express';
import { check } from 'express-validator';
// import { login, googleSignIn } from '../controllers/auth.js';
import { validarCampos, validarArchivoSubido } from '../middleware/index.js';
import { actualizarImagen, actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from '../controllers/uploads.js';
import { coleccionesPermitidas } from '../helpers/db-validators.js';

const router = Router(); // Instancia del enrutador

router.post('/',validarArchivoSubido, cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubido,
    check('id', 'El id debe de ser de mongoDB').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary)
// ], actualizarImagen)

router.get('/:coleccion/:id',[
    check('id', 'El id debe de ser de mongoDB').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)


export default router;