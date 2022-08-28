const mongoose=require('mongoose')
const {Schema}=mongoose

const productschema=new Schema({
       name:{
        type:String,
        required:true
       },
       category:{
        type:String,
        required:true
       },
       description:{
        type:String
       },
       price:{
        type:String,
        required:true
       },
       color:{
        type:Array
       },
       image:{
        type:String,
        required:true
       }
})
mongoose.models={}
export default mongoose.model('product',productschema)
