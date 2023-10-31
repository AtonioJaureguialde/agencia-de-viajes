import { viajeData } from "../models/Viaje.js"
import { Opinion } from "../models/testimonials.js";

const paginaInicio = async (request, response) => {

    //Consultar 3 viajes del modelo Viajes
    //Consultar 3 testimoniales del modelo testimoniales

    const promiseDB = [];

    promiseDB.push(viajeData.findAll({limit: 3}));
    promiseDB.push(Opinion.findAll({limit: 3}));


    try {
        
        const resultado = await Promise.all(promiseDB);

        
        response.render('inicio', { 
            pagina: 'Inicio',  // creamos variables;
            clase: 'home',
            viajes: resultado[0],
            opiniones: resultado[1]
        });


    } catch (error) {
        console.error(error);
        
    } 
};

const paginaNosotros = (request, response) => {

    response.render('us', {
        pagina: 'Nosotros'    })

};

const paginaViajes = async (request, response) => {

    // 1º - Consulta a la base de datos
    const viajes = await viajeData.findAll();

    response.render('trips', {
        pagina: 'Próximos Viajes',
        viajes
    });

};

const paginaOpiniones = async (request, response) => {

    try {
        const opiniones = await Opinion.findAll();
        response.render('testimonials', {
            pagina: 'Opiniones',
            opiniones
         });
        
    } catch (error) {
        console.error(error);
    }

};

// Muestra un viaje por su slug
const paginaDetalleViaje = async (request, response) => {

    const { trip } = request.params;

    try {

        const resultado = await viajeData.findOne({ where: { slug: trip } });

        response.render ( 'tripInfo', {
            pagina: 'Información Viaje',
            resultado
        })
        
    } catch (error) {

        console.error(error);
        
    }

    //console.log(request.params.trip);

};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaOpiniones,
    paginaDetalleViaje
}