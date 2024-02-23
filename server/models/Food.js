const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({ 

id : Number ,
name : String ,
price : Number , 
totalPrice : Number , 
quantity : Number ,
image : String ,
rating : Number ,
userId : String ,


} , 
{timestamps : true}
)

const Food = mongoose.model('food', foodSchema)

module.exports = Food;
