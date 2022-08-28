import product from "../../models/product";
import connect from "../../middleware/connect";
const handler=async(req,res)=>{
    if(req.method=="POST"){
      const products=await product.find(req.body.category?{category:req.body.category}:{})
      res.status(200).json({products})
    }
    else{
        res.status(400).json({error:'method not allowed'})
    }
}
export default connect(handler)