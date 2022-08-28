const mongoose=require('mongoose')
const {Schema}=mongoose
const orderschema=new Schema({
    user:{
        type:String,
        ref:'user',
        required:true
    },
    products:{
        type:Array,
        required:true
    },
    track:{
        type:String,
        default:'Packing in Process'
    }
})
mongoose.models={}
module.exports=mongoose.model('Order',orderschema)