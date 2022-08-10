
const Quality = require("../models/Quality")
const response = require("../utilities/response")


exports.getQualities = async (req, res) => {  
    try {
        let doc = await Quality.find({})

        response(res, 200, {
            qualities: doc
        })

    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}

exports.addAddQuality = async (req, res) => {

    const { name } = req.body
    try {
  
        let doc = await Quality.findOne({name: name})
        if(doc){
            response(res, 404, {
                message: "quality already exists",
            })
            return;
        } 
        
        let newQuality = new Quality({
            name: name
        })

        newQuality = await newQuality.save()
        if(newQuality){
            response(res, 201, {
                message: "quality added",
                quality: newQuality
            })
        } else{
            response(res, 500, {
                message: "Quality adding fail"
            })
        }
    

    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}