
const TempUser = require("../models/TempUser")
const User = require("../models/User")

const sendMail = require("../utilities/sendMail")
const getOTP = require("../utilities/getOTP")

const {createHash, hashCompare} = require("../hash")
const {createToken, getToken, parseToken} = require("../jwt")



exports.registration = async (context) => {
    const {firstName, lastName, email, gender } = context.request.body

    let user = await User.findOne({email})
    if(user){
        return context.body = "User already registered"
    }

    user = await TempUser.findOne({email})
    if(user){
        context.response.status = 206
        return context.body = {
            auth: user,
            message: "Please verify your email",
        }
    }

    let tempUser = new TempUser({
        firstName, 
        lastName, 
        email, 
        gender,
        role: "customer"
    })
    user = await tempUser.save();
    context.body = "Welcomasdsade to my Koa.js Server"
}


exports.otpValidation = async (context) => {
    const { email, otp } = context.request.body
  
    try {
  
        let tempUser = await TempUser.findOne({email: email})
        
        if(!tempUser){
            let user = User.findOne({email}).select("-password")
            if(user){
                return context.body = {
                    message: "This user already verified",
                    auth: user
                } 
            } else {
                return context.body = {
                    message: "user not found",     
                }  
            }

        }

        if(tempUser.expiredAt < new Date()){
            context.response.status = 409
            return context.body = {
                message: "OTP Code expired",
            }
        }
     
        if(tempUser.OTPCode != otp){
            context.response.status = 409
            return context.body = {
                message: "OTP does't match",
            }
        }

        if(tempUser){
            let user = await User.findOne({email}).select("-password")
            if(user){
                return context.body = {
                    message: "This user already verified",
                    auth: user
                }  
            }

            let varifiedUser = new User({
                firstName: tempUser.firstName,
                lastName: tempUser.lastName,
                email: tempUser.email,
                createdAt: tempUser.createdAt,
                gender: tempUser.gender,
                role: tempUser.role
            })
            varifiedUser = await varifiedUser.save()

            try{
                await TempUser.deleteOne({email: email})
            } catch(ex){

            }

            context.response.status = 201
            return context.body = {
                message: "verification successfully",
                auth: varifiedUser
            }
        }

    } catch(ex){
        console.log(ex) 
    }
}


exports.login = async (context) => {
    const { email, password } = context.request.body


    let user = await User.findOne({email: email})

    if(!user){
        context.response.status = 404
        return context.body = {
            message: "user not registered",
        }
    }

    
    let isMatched = await hashCompare(password, user.password)
    if(!isMatched){
        context.response.status = 500
        return context.body = {
            message: "Wrong password",
        }
    }

    let {password: as, ...other} = user._doc;

    let token = createToken(user._id, user.email, user.role)
    context.response.status = 201
    context.body = {
        message: "Login success",
        auth: other,
        token: token
    }
}

exports.loginWithToken = async (context) => {
    const { email, password } = context.request.body

    let token = getToken(context.request)
    if(!token){
        context.response.status = 409
        context.body = {
            message: "Token Missing",
        }
    }


    try{

        let data = await parseToken(token)
        if(data){
            let user = await User.findOne({_id: data.id}).select("-password")
            context.response.status = 201
            return context.body =  {
                message: "",
                auth: user
            }
        }


    } catch(err){
        context.response.status = 500
        return context.body =  {
            message: "Please login first"
        }
    }

}


exports.getOtpCode = async (context) => {
    const { email } = context.request.body
    let to = process.env.APP_EMAIL;
    try {

        let code = getOTP(6)
        // let info = await sendMail({
        //     from: email,
        //     subject: "Verify your email to create your account",
        //     html: `
        //     <div>
        //         <h1>Hi ${to}</h1>
        //         <p>Your OTP Code 
        //             <h1>${code}</h1>
        //         </p>
        //     </div>
        //     `
        // })

        if("info"){
            let haftHour = (1000 * 60) * 30

            let exp = new Date(Date.now() + haftHour)
  
            let doc = await TempUser.findOneAndUpdate(
                {email},
                { $set: {
                    OTPCode: code,
                    expiredAt: exp
                }}
            )
            if(doc){          
                context.response.status = 201  
                context.body = {
                    message: "OTP Code has been send",
                    expiredAt: exp
                }
            }
        }

        // context.body = info

    } catch(ex){
        console.log(ex) 
    }
}


exports.resetPassword = async (context) => {

    const { email, password, otp } = context.request.body
  
    try {
  
        let user = await User.findOne({email: email})
        if(!user){
            context.response.status = 404
            return context.body = {
                message: "user not registered",
            }
        }

        if(user.expiredAt < new Date()){
            context.response.status = 409
            return context.body = {
                message: "OTP Code expired",
            }
        }
     
        if(user.OTPCode != otp){
            context.response.status = 409
            return context.body = {
                message: "OTP does't match",
            }
        }

        let {err, hash} = await createHash(password)
        if(err){
            context.response.status = 500
            return context.body = {
                message: "Internal error. Please try again",
            }
        }

        user.password = hash

        let doc = await user.save()

        let {password: removePass, ...other} = doc._doc

        context.response.status = 201
        return context.body = {
            message: "password changed",
            auth: other
        }
    

    } catch(ex){
        context.response.status = 500
        return context.body = {
            message: "Internal error. Please try again",
        }
    }
}