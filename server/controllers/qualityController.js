
const Quality = require("../models/Quality")

exports.getQualities = async (context) => {  
    try {
        let doc = await Quality.find({})
        context.response.status = 200
        return context.body = {
            qualities: doc
        }

    } catch(ex){
        context.response.status = 500
        return context.body = {
            message: "Internal error. Please try again",
        }
    }
}

exports.addAddQuality = async (context) => {

    const { name } = context.request.body
    try {
  
        let doc = await Quality.findOne({name: name})
        if(doc){
            context.response.status = 404
            return context.body = {
                message: "quality already exists",
            }
        }
        
        let newQuality = new Quality({
            name: name
        })

        newQuality = await newQuality.save()
        if(newQuality){
            context.response.status = 201
            return context.body = {
                message: "quality added",
                quality: newQuality
            }
        }
    

    } catch(ex){
        context.response.status = 500
        console.log(ex);
        return context.body = {
            message: "Internal error. Please try again",
        }
    }
}