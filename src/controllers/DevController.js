const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections} = require('../websocket');
const {sendMessage} = require('../websocket');


module.exports = {

    async index (request,response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store (request,response) {
        const {github_username, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({github_username});

        if(!dev){
            const res = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const {name=login, avatar_url, bio} = res.data;
        
            const techArrays = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url, 
                bio, 
                techs: techArrays,        
                location
            });

            //filtrar conexões que estão há no máximo 10 km de distância e que o 
            //novo deve tenha pelo menos umas das techs filtradas
            
            const sendSocketMessageTo = findConnections (
                {latitude, longitude},
                techArrays,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        
        }        
    
        return response.json(dev);
    },
    
    async update(request,response){
        const {github_username,techs, latitude, longitude} = request.body;
        const techArrays = parseStringAsArray(techs);
        
        let dev = {
            github_username,
            techs : techArrays,
            latitude, 
            longitude
        };
            
        dev = await Dev.findOneAndUpdate(request.params.id, dev, {new : true});

        return response.json(dev);
    },

    async destroy(request,response){
        const dev = await Dev.findOneAndRemove(request.params.id);
        return response.send();
    },
}