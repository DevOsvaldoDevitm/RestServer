import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos, validarJWT, adminRole } from '../middleware/index.js';
import { 
    actualizarProducto, 
    crearProducto, 
    eliminarProducto, 
    obtenerProducto, 
    obtenerProductos} from '../controllers/productos.js';

import { existeCategoriaPorID, existeProductoPorID } from '../helpers/db-validators.js';

const router = Router(); // Instancia del enrutador

    // Obtener categorias publicas
    router.get('/', obtenerProductos);

    // Obtener una categoria por id - publico
    router.get('/:id',[
        check('id', 'No es un ID').isMongoId(),
        check('id').custom( existeProductoPorID),
        validarCampos
    ], obtenerProducto);
    
    // Crear producto - privado - cualquier persona con un token valido
    router.post('/', [validarJWT,
        check('nombre', 'El nombre es obligario').not().isEmpty(),
        check('categoria', 'No es un ID').isMongoId(),
        check('categoria').custom( existeCategoriaPorID),
        validarCampos
    ],crearProducto );
    
    
    // Actualizar - privado - cualquiera con un token valido
    router.put('/:id',[
        validarJWT,
        // check('categoria', 'No es un ID').isMongoId(),
        check('id').custom( existeProductoPorID),
        validarCampos
    ],actualizarProducto
    
);

// Borrar una categoria admin
router.delete('/:id',[
    validarJWT,
    adminRole,
    check('id', 'No es un ID').isMongoId(),
    check('id').custom( existeProductoPorID),
    validarCampos
],eliminarProducto);
    


export default router;