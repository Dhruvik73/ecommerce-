import order from "../../models/order";
import connect from '../../middleware/connect'

const handler=async(req,res)=>{
      if(req.method=='POST'){
        try {
             const mycart=await order.create({
                 user:req.body.id,
                 products:req.body.products
             }) 
            res.status(200).json({order:mycart})
        } catch (error) {
            res.status(500).json({error})
        }
      }
      else{
        res.status(400).json({'error':'method not allowed'})
      }
}
export default connect(handler)