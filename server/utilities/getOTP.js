function getOTP(digit = 4){
    let otp = ""
    const numbers = "0123456789"

    let i = 0;
    while(i < digit){
        let index = Math.round(Math.random() * 9)
        let item =  numbers.split("")[index]
        otp += item    
        i++
    }
    return otp
}


module.exports = getOTP