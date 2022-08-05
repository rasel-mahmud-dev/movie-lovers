
const authRoutes = require("./authRoutes");
const genreRoutes = require("./genreRoutes");
const languageRoutes = require("./languageRoutes");
const qualityRoutes = require("./qualityRoutes");
const movieRoutes = require("./movieRoutes");

module.exports = function (router){
    authRoutes(router)
    genreRoutes(router)
    languageRoutes(router)
    qualityRoutes(router)
    movieRoutes(router)
}