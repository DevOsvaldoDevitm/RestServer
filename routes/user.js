import { Router } from 'express';
import { usuariosDelete, 
        usuariosGet, 
        usuariosPatch, 
        usuariosPost, 
        usuariosPut 
        } from '../controllers/usuarios.js';
import { validarCampos } from '../middleware/validar-campos.js';
import { check } from 'express-validator';
import { emailExist, esRoleValido, existeUsuarioporID } from '../helpers/db-validators.js';


const router = Router(); // Instancia del enrutador

router.get('/', usuariosGet );

router.put('/:id',[
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioporID ),
        check('rol').custom( esRoleValido ),
        validarCampos
],
        usuariosPut);

router.post('/',
        [
                check('nombre', 'El nombre no es valido').not().isEmpty(),
                check('password', 'El password debe de ser de 6 letras').isLength( {min:6} ),
                check('correo', 'El correo no es valido').isEmail(),
                check('correo').custom(emailExist),
                // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
                check('rol').custom( esRoleValido ),
                validarCampos
        ] 
        ,usuariosPost )

router.delete('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioporID ),
        validarCampos
],
        usuariosDelete);

router.patch('/', usuariosPatch);

export { router }; // Exporta el enrutador
