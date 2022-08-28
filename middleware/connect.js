const mongoose=require('mongoose')
const connect=(handler)=>async(req,res)=>{
   if(mongoose.connections[0].readyState){
    return handler(req,res)
   }
   else{
   await mongoose.connect('mongodb://localhost:27017/ecommerce')
    return handler(req,res)
   }
}

module.exports=connect