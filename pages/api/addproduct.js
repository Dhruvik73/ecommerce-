import product from "../../models/product";
import connect from "../../middleware/connect";
const handler=async(req,res)=>{ 
        if(req.method==='POST'){
            const productarray=req.body.products  
            try {
                for(let i of productarray){
                    await product.create({
                        name:i.name,
                        category:i.category,
                        price:i.price,
                        color:i.color,
                        description:i.description,
                        image:i.image
                    })
                }  
                res.status(200).json({message:'products added successfully'})
            } catch (error) {
                res.status(500).json({error})
            }
        }
        else{
        res.status(500).json({'error':'internel server error'})
        }
}
export default connect(handler)
