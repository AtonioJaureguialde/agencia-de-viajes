import express from "express";
import { 
    paginaInicio, 
    paginaNosotros, 
    paginaViajes,
    paginaOpiniones, 
    paginaDetalleViaje    
 } from "../controllers/paginaControllers.js";

 import { guardarTestimonial } from "../controllers/testimonialsController.js";

 

// Estamos utilizando la misma instancia de express desde el index.js principal = "const app = express();" extendemos su uso desde el archivo ppal.
const router = express.Router();



// request = loque tu envías, response = lo que expréss te envía
router.get('/', paginaInicio );


// En el archivo principal se hacía referencia a app. get(...), aquí ha de hacerse referencia a router.get(...)
router.get('/us', paginaNosotros );

router.get('/trips', paginaViajes );

// Muestra una página por su slug
router.get('/trips/:trip', paginaDetalleViaje );

router.get('/testimonials', paginaOpiniones );
router.post('/testimonials', guardarTestimonial );


// router.get('/contacto', (request, response) => {
//     response.send('Contacto');

// });


// Exportamos y enlazamos el archivo router hacia el archivo principal;
export default router;