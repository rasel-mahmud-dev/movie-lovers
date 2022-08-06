
const TempUser = require("../models/TempUser")
const User = require("../models/User")

const sendMail = require("../utilities/sendMail")
const getOTP = require("../utilities/getOTP")

const {createHash, hashCompare} = require("../hash")
const {createToken, getToken, parseToken} = require("../jwt")

const response = require("../utilities/response")

exports.registration = async (req, res) => {
    const {firstName, lastName, email, gender } = req.body

    let user = await User.findOne({email})
    if(user){
        return response(res, 500, {
            auth: null,
            message: "User already registered"
        })
    }

    user = await TempUser.findOne({email})
    if(user){
        return response(res, 206, {
            auth: null,
            message: "Please verify your email",
        })
    }

    let tempUser = new TempUser({
        firstName, 
        lastName, 
        email, 
        gender,
        role: "customer"
    })
    user = await tempUser.save();
    


}


exports.otpValidation = async (req, res) => {
    const { email, otp } = req.body
  
    try {
  
        let tempUser = await TempUser.findOne({email: email})
        
        if(!tempUser){
            let user = User.findOne({email}).select("-password")
            if(user){
                return response(res, 200, {
                    message: "This user already verified",
                    auth: user
                })
                
            } else {
                return response(res, 404, {
                    message: "user not found",
                })
            }

        }

        if(tempUser.expiredAt < new Date()){
            return response(res, 409, {
                message: "OTP Code expired",
            })
        }
     
        if(tempUser.OTPCode != otp){
            return response(res, 409, {
                message: "OTP does't match",
            })
        }

        if(tempUser){
            let user = await User.findOne({email}).select("-password")

            if(user){
                return response(res, 409, {
                    message: "This user already verified",
                })
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
            return response(res, 201, {
                message: "verification successfully",
                auth: varifiedUser
            })
        }

    } catch(ex){
        console.log(ex) 
    }
}


exports.login = async (req, res) => {
   
    const { email, password } = req.body
    let user = await User.findOne({email: email})

    if(!user){
   
        return response(res, 404, {
            message: "user not registered",
        })
    }

    
    let isMatched = await hashCompare(password, user.password)
    if(!isMatched){
        return response(res, 500, {
            message: "Wrong password",
        })
    }

    let {password: as, ...other} = user._doc;

    let token = createToken(user._id, user.email, user.role)
  
    response(res, 201, {
        message: "Login success",
        auth: other,
        token: token
    })
    
}

exports.loginWithToken = async (req, res) => {

    let token = getToken(req)
    if(!token){
        return response(res, 409, {
            message: "Token Missing",
        })
    }


    try{

        let data = await parseToken(token)
        if(data){
            let user = await User.findOne({_id: data.id}).select("-password")
            response(res, 201, {
                message: "",
                auth: user
            })
        }

    } catch(err){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }

}


exports.getOtpCode = async (req, res) => {
    const { email } = req.body
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
                
                response(res, 201, {
                    message: "OTP Code has been send",
                    expiredAt: exp
                })
               
            }
        }

        // context.body = info

    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}


exports.resetPassword = async (req, res) => {

    const { email, password, otp } = req.body
  
    try {
  
        let user = await User.findOne({email: email})
        if(!user){
            return response(res, 404, {
                message: "user not registered",
            })
        }

        if(user.expiredAt < new Date()){
            return response(res, 409, {
                    message: "OTP Code expired"
            })
        }
     
        if(user.OTPCode != otp){
             return response(res, 409, {
                message: "OTP does't match",  
            })
        }

        let {err, hash} = await createHash(password)
        if(err){
            return response(res, 500, {
                message: "Internal error. Please try again",
            })
        }

        user.password = hash

        let doc = await user.save()

        let {password: removePass, ...other} = doc._doc

    
        response(res, 201, {
            message: "password changed",
            auth: other
        })
    

    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}