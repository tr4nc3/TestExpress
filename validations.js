const joi = require('joi');
module.exports = {
    body: {
        age: joi.number().required(),
        name: joi.required()
    }   
}