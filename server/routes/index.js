
const authRoutes = require("./authRoutes");
const genreRoutes = require("./genreRoutes");

module.exports = function (router){
    authRoutes(router)
    genreRoutes(router)
}