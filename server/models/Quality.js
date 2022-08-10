const mongoose =  require("mongoose");


const schema = {
  name: {type: String, index: true, unique: true}
}

const Quality = mongoose.model(
  "Quality",
  new mongoose.Schema(schema, { timestamps: true })
)

module.exports = Quality
