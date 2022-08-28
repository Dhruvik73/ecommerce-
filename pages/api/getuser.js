import user from "../../models/user";
import connect from "../../middleware/connect";
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const handler=async(req,res)=>{
    if(req.method=="POST"){
      const myuser=await user.findOne({email:req.body.email})
      if(myuser){
      const verify=await bcrypt.compare(req.body.password,myuser.password)
      if(verify){
      const token=jwt.sign(JSON.stringify(myuser._id),process.env.JWT)
      res.status(200).json({myuser,token})
      }
      else{
        res.status(400).json({error:'incorrect details!'})
      }
    }
    else{
        res.status(400).json({error:'you need to signup!'})
    }
}
    else{
        res.status(400).json({error:'method not allowed'})
    }
}
export default connect(handler)