
const Language = require("../models/Language")

exports.getLanguages = async (context) => {  
    try {
        let doc = await Language.find({})
        context.response.status = 200
        return context.body = {
            languages: doc
        }

    } catch(ex){
        context.response.status = 500
        return context.body = {
            message: "Internal error. Please try again",
        }
    }
}

exports.addAddLanguage = async (context) => {

    const { language } = context.request.body
    try {
  
        let doc = await Language.findOne({name: language})
        if(doc){
            context.response.status = 404
            return context.body = {
                message: "language already exists",
            }
        }
        
        let newLanguage = new Language({
            name: language
        })

        newLanguage = await newLanguage.save()
        if(newLanguage){
            context.response.status = 201
            return context.body = {
                message: "language added",
                language: newLanguage
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