const mongoose =  require("mongoose");

const schema = {
  firstName: String,
  lastName: String,
  email: {type: String, index: true, unique: true},
  password: String,
  gender: String,
  avatar: String,
  OTPCode: String, // for login with otp
  expiredAt: Date,
  createdAt: Date,
  role: {
    type: String,
    required: true,
    enum: ["customer", "admin"]
  }
}

module.exports = mongoose.model("User", new mongoose.Schema(schema, { timestamps: true }))