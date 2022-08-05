
const TempUser = require("../models/TempUser")
const User = require("../models/User")

const sendMail = require("../utilities/sendMail")
const getOTP = require("../utilities/getOTP")

const {createHash} = require("../hash")

const authController = require("../controllers/authController")


module.exports = (router)=>{

    router.post('', '/api/registration', authController.registration)

    router.post('', '/api/login', authController.login)

    router.post('', '/api/login-token', authController.loginWithToken)

    router.post('', '/api/auth/get-otp-code', authController.getOtpCode)

    router.post('', '/api/auth/validate-otp-code', authController.otpValidation)

    router.post('', '/api/auth/reset-password', authController.resetPassword)


}
