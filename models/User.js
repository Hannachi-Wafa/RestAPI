const mongoose= require('mongoose')

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true },
  lastname: String,
  age: Number
});
  
module.exports=mongoose.model('user', userSchema)