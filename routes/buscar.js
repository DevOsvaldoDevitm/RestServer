import { Router } from 'express';
import { check } from 'express-validator';
import { login, googleSignIn } from '../controllers/auth.js';
import { validarCampos } from '../middleware/validar-campos.js';
import { buscar } from '../controllers/buscar.js';

const router = Router(); // Instancia del enrutador

router.get('/:coleccion/:termino', buscar)

export default router;