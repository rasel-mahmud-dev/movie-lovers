const User = require("../models/User")
const Favorite = require("../models/Favorite")

const sendMail = require("../utilities/sendMail")
const getOTP = require("../utilities/getOTP")

const {createHash, hashCompare} = require("../hash")
const {createToken, getToken, parseToken} = require("../jwt")

const response = require("../utilities/response")
const Movie = require("../models/Movie")

exports.getUser = async (req, res) => {
    
   try{
    let user = await User.findOne({_id: req.params.id}).select("-password")
    if(user){
        return response(res, 200, {
            user: user,
        })
    } else {
        return response(res, 404, {
            user: null,
            message: "User not found "
        })
    }

   } catch(ex){
    response(res, 500, {
        message: "Internal error. Please try again",
    })
   }
}

exports.registration = async (req, res) => {
    const {firstName, lastName, email, gender } = req.body

   try{ 
    let user = await User.findOne({email})
    if(user){
        return response(res, 500, {
            auth: null,
            message: "User already registered"
        })
    }

    user = new User({
        firstName, 
        lastName, 
        email, 
        gender,
        verify: false,
        role: "customer"
    })
    user = await user.save();


    if(user){
     
        response(res, 201, {
            message: "account added"
        })
    
    }

   } catch(ex){
    response(res, 500, {
        message: "Internal error. Please try again",
    })
   }

    
}


exports.profileUpdate = async (req, res) => {
    const {firstName, lastName, gender, avatar, _id } = req.body

    try{

        let updateVal = {}
        if(lastName) updateVal["firstName"] = firstName 
        if(gender) updateVal["gender"] = gender 
        if(avatar) updateVal["avatar"] = avatar 

        let { fields, file }  = await fileUpload(req, "avatar")
    
        if(file){
            let meta = await uploadImage(file, "netflix/images")
            if(meta){
                newMovie.avatar = meta.secure_url
            }
        } 

        console.log(req.userId, _id);

        console.log(fields);

    



    } catch(ex){

        response(res, 500, {
            message: "Internal error. Please try again",
        })  

    }

}



exports.login = async (req, res) => {
   
    const { email, password } = req.body
    try{
        let user = await User.findOne({email: email})

    if(!user){
   
        return response(res, 404, {
            message: "User is not registered",
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
    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
    
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
        let info = await sendMail({
            from: email,
            subject: "Verify your email to create your account",
            html: `
            <div>
                <h1>Hi ${to}</h1>
                <p>Your OTP Code 
                    <h1>${code}</h1>
                </p>
            </div>
            `
        })

        if("info"){
            let haftHour = (1000 * 60) * 30

            let exp = new Date(Date.now() + haftHour)
  
            let doc = await User.findOneAndUpdate(
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
               
            } else {
                response(res, 404, {
                    message: "This user doesn't exists",
                })
            }
        }

    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}

exports.otpValidation = async (req, res) => {
    const { email, otp } = req.body
  
    try {
  
        let user = await User.findOne({email: email}).select("-password")
        
        if(!user){
            return response(res, 404, {
                message: "user not found",
            })
        }

        if(user.expiredAt < new Date()){
            return response(res, 409, {
                message: "OTP Code expired",
            })
        }
     
        if(user.OTPCode != otp){
            return response(res, 409, {
                message: "OTP does't match",
            })
        }    

        return response(res, 201, {
            message: "verification successfully",
            auth: user
        })
        

    } catch(ex){
        console.log(ex) 
    }
}


exports.resetPassword = async (req, res) => {

    const { email, password, otpCode } = req.body
  
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
     
        if(user.OTPCode != otpCode){
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


exports.toggleFavoriteMovie = async(req, res)=>{

    try {
        const {movieId} = req.body
        const {userId} = req

        let favorite = await Favorite.findOne({movieId: movieId})
        if(favorite){
            let doc = await Favorite.findByIdAndDelete({_id: favorite._id})
            if(doc){
                response(res, 201, {
                    isAdded: false,
                    _id: movieId,
                    message: "Movie sucessfully delete from favorite list"
                })
            }
        } else {
            let newItem = new Favorite({
                movieId: movieId,
                customerId: userId
            })
            newItem = await newItem.save()
            let movie = await Movie.findById({_id: movieId})
            response(res, 201, {
                isAdded: true,
                favorite: movie,
                message: "Movie sucessfully added to favorite list"
            })
        }

    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}


exports.sendMeMail = async(req, res)=>{
    const { subject, message, name, email } = req.body;
    try {
        let info = await sendMail({     
        from: email, 
        subject: subject, 
        html: `
            <h1>${name} ${email} send you a mail from netflix app</h1>
            <p>${message}</p>

        `})


        if(info && info.messageId){
            response(res, 201, {
                message: "your mail has been send"
            })
        } else {
            response(res, 500, {
                message: "your mail send fail. please try again"
            })
        }

    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}


exports.getFavoriteMovies = async(req, res)=>{
    try {

        let doc = await Favorite.find({customerId: req.params.id})
        .populate("movieId")
            response(res, 200, {
                favorites: doc
            })


    } catch(ex){
        console.log(ex);
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}