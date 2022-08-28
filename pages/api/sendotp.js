import { SMTPClient } from "emailjs";
const handler=async(req,res)=>{
    if(req.method==='POST'){
        const client=new SMTPClient({
         host:'smtp.gmail.com',
         user:'dhruvikkothiya732002@gmail.com',
         password:'matq veoj aihx xphm',
         ssl:true
        })
        try {
          await client.sendAsync({
            text:`Your otp is ${req.body.otp}`,
            from:'dhruvikkothiya732002@gmail.com',
            to:req.body.email,
            subject:'verification of ecommerce site'
           },(error,message)=>{res.status(400).json({error:error})})
           res.status(200).json({message:'otp sent'})
       } catch (error) {
            res.status(400).json({error})
        }
    }
}
export default handler