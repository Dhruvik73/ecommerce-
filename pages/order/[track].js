import React,{useState} from 'react'
import styles from '../../styles/Home.module.css'
import Order from '../../models/order'
import Product from '../../models/product'
import {FcPrevious,FcNext} from 'react-icons/fc'
import { ToastContainer, toast } from 'react-toastify';
function Track({products,track}) {
  const [count, setcount] = useState(0)
  const message=()=>{
    toast.success(`Your Order Has Reached To ${track[count]} 👍`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })
  }
  return (
    <div className={styles.container}>
         <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
      <div className='d-flex'>
        {count!==0&&<div style={{marginTop:40+'vh',cursor:'pointer'}} onClick={()=>{if(count!==0){setcount(count-1)}}}><FcPrevious/></div>}
        <div className={styles.body}>
            {products.length>0?products[count].map((k)=>{
              return <div key={k.product._id} className={styles.product}>
              <img className={styles.image} src={k.product.image} alt="not load" />
            <div className={styles.details}>
              <div style={{display:'flex',flexDirection:'column'}}>
                <p>price : {k.product.price}</p>
                <p>description:- {k.product.description}</p>
                <div style={{display:'flex',marginLeft:9+'vw'}}>Color :{k.color.map((c)=>{
                  return(<p key={c} className={styles.color}style={{backgroundColor:`${c}`}}></p>)
                })
                }</div>
                <p>Quentity : {k.quentity}</p>
              </div>
            </div>
            </div>
            }):""}
        </div>
        {products.length>0?count!==products.length-1&&<div style={{marginTop:40+'vh',cursor:'pointer'}} onClick={()=>{setcount(count+1)}}><FcNext/></div>:""}
        </div>
        {products.length>0&&<button className={styles.button} onClick={message} style={{height:4+'vh',marginLeft:38+'vw'}}>Track</button>}
    </div>
  )
}
export default Track
export async function getServerSideProps(context){
  const user=context.query.track
  const orders= await Order.find({user:user})
  const userproducts=[]
  const track=[]
  if(orders.length>0){
  for(let item of orders){
  const product=item.products
  track.push(item.track)
  const b=[]
  for(let i of product){
    let a=await Product.findById(i.id)
    b.push({product:a,quentity:i.quentity,color:i.color})
  }
  userproducts.push(b)
}
  }
  return{
    props:{products:JSON.parse(JSON.stringify(userproducts)),track:JSON.parse(JSON.stringify(track))}
  }
}
