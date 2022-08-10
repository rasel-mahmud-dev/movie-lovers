
const Language = require("../models/Language")
const response = require("../utilities/response")


exports.getLanguages = async (req, res) => {  
    try {
        let doc = await Language.find({})
        response(res, 200, {
            message: "",
            languages: doc
        })

    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}

exports.addAddLanguage = async (req, res) => {

    const { name } = req.body
    try {
  
        let doc = await Language.findOne({name: name})
        if(doc){
            return response(res, 409, {
                message: "language already exists",
            })
        }
        
        let newLanguage = new Language({
            name: name
        })

        newLanguage = await newLanguage.save()
        if(newLanguage){
            response(res, 201, {
                message: "language added",
                language: newLanguage
            })
        } else {
            response(res, 500, {
                message: "Language adding fail"
            })
        }
    

    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}