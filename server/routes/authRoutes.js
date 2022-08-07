
const TempUser = require("../models/TempUser")
const User = require("../models/User")

const sendMail = require("../utilities/sendMail")
const getOTP = require("../utilities/getOTP")

const {createHash} = require("../hash")

const authController = require("../controllers/authController")

const {auth} =  require("../middlewares")


module.exports = (router)=>{

    router.get('/api/user/:id', authController.getUser)

    router.post('/api/registration', authController.registration)

    router.post('/api/login', authController.login)

    router.post('/api/auth/login-token', authController.loginWithToken)

    router.post('/api/auth/get-otp-code', authController.getOtpCode)

    router.post('/api/auth/validate-otp-code', authController.otpValidation)

    router.post('/api/auth/reset-password', authController.resetPassword)


    router.get("/api/user/favorite-movies/:id", auth, authController.getFavoriteMovies)


    router.post("/api/user/toggle-favorite", auth, authController.toggleFavoriteMovie)


}
