import React,{useEffect} from 'react'
import styles from '../styles/Home.module.css'
import { useSelector,useDispatch } from 'react-redux'
import {cartproduct, getproducts} from '../actions/index'
import { ToastContainer, toast } from 'react-toastify';
function Order() {
  let a=0
  const mystate=useSelector((state)=>state.getproducts)
  const dispatch=useDispatch()
  useEffect(() => {
    if(localStorage.getItem('products')){
    dispatch(cartproduct())
    }
  }, [])
  const placeorder=async()=>{
    const id=localStorage.getItem('id')
    const products=[]
    for(let i of mystate.products){
      products.push({id:i._id,color:i.color,quentity:i.__v})
    }
    const body={
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id:id,products:products})
    }
    const res=await fetch(`${process.env.ROUTE}/api/addcart`,body)
    const order=await res.json()
    toast.success('order placed sucessfully 👍', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })
    localStorage.removeItem('products')
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
        <div className={styles.body}>
        <div className={styles.formbody}>
           {mystate.products.map((k)=>{
            a=a+(k.price*k.__v)
            return <div key={k._id} className={styles.order} >
                    <div>{k.name}  Price : {k.price}  Quentity : {k.__v}  Total : {k.price * k.__v}  Color : {k.color}</div>
                   </div>
            
           })}
           <div className={styles.order}>Total Amount Of Your Order Is  {a}</div>
           <button className={styles.button} onClick={placeorder} style={{marginTop:20+'px'}}>Place Order</button>
           </div>
        </div>
    </div>
  )
}

export default Order