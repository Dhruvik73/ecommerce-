import user from "../../models/user";
import connect from '../../middleware/connect'
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const handler=async(req,res)=>{
      if(req.method=='POST'){
        try {
            const pass=await user.findOne({'email':req.body.email})
            if(!pass){
            const salt=await bcrypt.genSalt(10)
            const secpass=await bcrypt.hash(req.body.password,salt)
            const myuser=await user.create({
                username:req.body.username,
                email:req.body.email,
                password:secpass
            })
            const token=jwt.sign(JSON.stringify(myuser._id),process.env.JWT) 
            res.status(200).json({myuser:myuser,token:token})
          }
          else{
            res.status(400).json({error:'user already exist'})
          }
        } catch (error) {
            res.status(500).json({error})
        }
      }
      else{
        res.status(400).json({'error':'method not allowed'})
      }
}
export default connect(handler)