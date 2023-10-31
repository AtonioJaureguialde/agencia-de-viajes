import { Opinion } from "../models/testimonials.js";

const guardarTestimonial = async (request, response) => {

    //Validamos el formulario antes de obtener la respuesta;
    const { nombre, correo, mensaje } = request.body;

    const errores = [];

    if (nombre.trim() === '') {
        //console.log('el nombre está vacío');
        errores.push({mensaje : 'El Nombre está vacío'})
    }
    if (correo.trim() === '') {
        //console.log('el correo está vacío');
        errores.push({mensaje : 'El Correo está vacío'})
    }
    if (mensaje.trim() === '') {
        //console.log('el mensaje está vacío');
        errores.push({mensaje : 'El Mensaje está vacío'})
    }
    if (errores.length > 0) {

        // Consultar Opiniones existentes
        const opinionesRenderizadas = await Opinion.findAll();

        //mostramos la vista con errores
        response.render('testimonials', {
            pagina: 'Opiniones',
            errores,
            nombre,
            correo,
            mensaje,
            opinionesRenderizadas
        
        });
    }else {
        // Almacenamos los datos en la base de datos
        try {

           await Opinion.create({
            nombre,
            correo,
            mensaje
           });

           response.redirect('/testimonials');
            
        } catch (error) {

            console.error(error);
            
        }
        
    }

    //console.log(request.body);
    //console.log(errores);
};

export {
    guardarTestimonial
};