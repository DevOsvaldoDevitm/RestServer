import { Router } from 'express';
import { usuariosDelete, 
        usuariosGet, 
        usuariosPatch, 
        usuariosPost, 
        usuariosPut 
        } from '../controllers/usuarios.js';

const router = Router(); // Instancia del enrutador

router.get('/', usuariosGet );

router.put('/:id', usuariosPut);

router.post('/', usuariosPost )

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

export { router }; // Exporta el enrutador
