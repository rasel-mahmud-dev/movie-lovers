

const qualityController = require("../controllers/qualityController")


module.exports = (router)=>{

    router.get('/api/qualities', qualityController.getQualities)
    router.post('/api/add-quality', qualityController.addAddQuality)

}
