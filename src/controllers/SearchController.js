const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        const{latitude, longitude, techs} = request.query;

        const techsArray = parseStringAsArray(techs);        
        // BUscar todos os devs num raio de 10 km
        // Filtrar por tecnologia

        const devs = await Dev.find({
            techs:{
                $in: techsArray,
            },
            location: {
                $near:{
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude], // a ordem é importante para o mongo
                    },
                    $maxDistance: 10000, //distância em metros
                },
            },
        });

        return response.json(devs);

    }
}