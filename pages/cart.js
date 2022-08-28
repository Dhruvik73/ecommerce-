import React,{useEffect,useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartproduct } from '../actions'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
function Cart({id}){
  const state=useSelector(state=>state.getproducts)
  const dispatch=useDispatch()
  useEffect(() => {
    if(localStorage.getItem('products')){
    dispatch(cartproduct())
    }
  },[])
  const addcolor=(id,color)=>{
    const products=JSON.parse(localStorage.getItem('products'))
    for(let i of products){
      if(i.product===id){
        i.color=color
      }
    }
    localStorage.setItem('products',JSON.stringify(products))
  }
  return (
    <div className={styles.container}>
    <div className={styles.body}>
    {state.products.map((k)=>{
          return <div key={k._id} className={styles.product}>
          <img className={styles.image} src={k.image} alt="not load" />
        <div className={styles.details}>
          <div style={{display:'flex',flexDirection:'column'}}>
            <p>price : {k.price}</p>
            <p>description:- {k.description}</p>
            <div style={{display:'flex',marginLeft:9+'vw'}}>{k.color.map((c)=>{
              return(<p key={c} className={styles.color} onClick={()=>{addcolor(k._id,c)}} style={{backgroundColor:`${c}`,cursor:'pointer'}}></p>)
            })
            }</div>
            <p>Quentity : {k.__v}</p>
          </div>
        </div>
        </div>
        })}
    </div>
    {state.products.length>0&&<Link href={'/order'} passHref><button className={styles.button} style={{height:4+'vh',marginLeft:38+'vw'}}>Confirm</button></Link>}
    </div>
  )
}
export default Cart