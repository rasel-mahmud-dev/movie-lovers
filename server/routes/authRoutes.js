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


    router.post("/api/profile-update", auth, authController.profileUpdate)

    router.post("/api/send-mail", authController.sendMeMail)

    router.post("/api/user/toggle-favorite", auth, authController.toggleFavoriteMovie)
}
