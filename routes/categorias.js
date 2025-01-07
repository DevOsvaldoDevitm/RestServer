import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos, validarJWT, adminRole } from '../middleware/index.js';
import { 
    actualizarCategoria, 
    crearCategoria, 
    eliminarCategoria, 
    obtenerCategoria, 
    obtenerCategorias } from '../controllers/categorias.js';
import { existeCategoriaPorID } from '../helpers/db-validators.js';

const router = Router(); // Instancia del enrutador

    // Obtener categorias publicas
    router.get('/', obtenerCategorias);

    // Obtener una categoria por id - publico
    router.get('/:id',[
        check('id', 'No es un ID').isMongoId(),
        check('id').custom( existeCategoriaPorID),
        validarCampos
    ], obtenerCategoria);
    
    // Crear categoria - privado - cualquier persona con un token valido
    router.post('/', [validarJWT,
        check('nombre', 'El nombre es obligario').not().isEmpty(),
        validarCampos
    ],crearCategoria );
    
    
    // Actualizar - privado - cualquiera con un token valido
    router.put('/:id',[
        validarJWT,
        check('nombre', 'El nombre es obligario').not().isEmpty(),
        check('id').custom( existeCategoriaPorID),
        validarCampos
    ],actualizarCategoria
    
);

// Borrar una categoria admin
router.delete('/:id',[
    validarJWT,
    adminRole,
    check('id', 'No es un ID').isMongoId(),
    check('id').custom( existeCategoriaPorID),
    validarCampos
],eliminarCategoria 
    );
    


export default router;