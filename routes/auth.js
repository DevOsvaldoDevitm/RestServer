import { Router } from 'express';
import { check } from 'express-validator';
import { login, googleSignIn } from '../controllers/auth.js';
import { validarCampos } from '../middleware/validar-campos.js';

const router = Router(); // Instancia del enrutador

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] , login);

router.post('/google',[
    check('id_token', 'Token de Google es necesario').not().isEmpty(),
    validarCampos
] , googleSignIn);





export default router;