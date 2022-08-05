const mongoose =  require("mongoose");


const schema = {
  label: String
}

 const Quality = mongoose.model(
  "Quality",
  new mongoose.Schema(schema, { timestamps: true })
)

module.exports = Quality
