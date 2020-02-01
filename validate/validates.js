//@hapi/joi
const Joi = require('@hapi/joi');

//validate関数化
let validates = function validate(bodyname){
    const schema = Joi.object({
        name: Joi.string().min(3).max(10).required()
    })
    //'name'で入ったvalidateで引数を検査してリターン
    return schema.validate({name:bodyname});
}

module.exports = validates;