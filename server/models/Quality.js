const mongoose =  require("mongoose");


const schema = {
  name: String
}

 const Quality = mongoose.model(
  "Quality",
  new mongoose.Schema(schema, { timestamps: true })
)

module.exports = Quality
