

const languageController = require("../controllers/languageController")


module.exports = (router)=>{

    router.get('/api/languages', languageController.getLanguages)
    router.post('/api/add-language', languageController.addAddLanguage)

}
