const mongoose =  require("mongoose");

const schema = {
  firstName: String,
  lastName: String,
  email: {type: String, index: true, unique: true},
  phone: {type: String, index: true, unique: true},
  gender: String,
  OTPCode: String,
  expiredAt: Date,
  avatar: String,
  role: {
    type: String,
    required: true,
    enum: ["customer", "admin"]
  }
}

module.exports = mongoose.model("TempUser", new mongoose.Schema(schema, { timestamps: true }))