import product from "../../models/product";
import connect from "../../middleware/connect";
const handler=async(req,res)=>{
    if(req.method=="POST"){
       const products=[]
       for(let i of req.body.prod){
        let a=await product.findById(i.product)
        a.__v=i.quentity
        if(i.color){
        a.color=i.color
        }
        products.push(a)
       }
       res.status(200).json({products})
      }
      else{
          res.status(400).json({error:'method not allowed'})
      }
  }
  export default connect(handler)