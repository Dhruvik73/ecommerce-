import React,{useState,useEffect} from 'react'
import styles from '../../styles/Home.module.css'
import product from '../../models/product'
function Slug({product}){
    const [quentity,setquentity]=useState(0)
    useEffect(()=>{
   getquentity()
    },[quentity])
    const add=()=>{
        if(localStorage.getItem('products')){
            const myproduct=JSON.parse(localStorage.getItem('products'))
            if(myproduct?myproduct.some(value=>{return value.product===product._id}):false){
                for(let item of myproduct){
                    if(item.product===product._id){
                        item.quentity++;
                        setquentity(item.quentity)
                        break
                    }
                }
                localStorage.setItem('products',JSON.stringify(myproduct))
            }
        
            else{
                myproduct.push({quentity:1,product:product._id})
                localStorage.setItem('products',JSON.stringify(myproduct))
        }
    }
        else{
            const myproduct=[{
                quentity:1,
                product:product._id
            }]
            setquentity(1)
            localStorage.setItem('products',JSON.stringify(myproduct))
        }
    }
    const getquentity=()=>{
        const myproduct=JSON.parse(localStorage.getItem('products'))
        if(myproduct?myproduct.some(value=>{return value.product===product._id}):false){
        for(let i of myproduct){
         if(i.product===product._id){
            setquentity(i.quentity)
            if(i.quentity===0){
                localStorage.removeItem('products')
            }
         }
        }
        }
    }
    const decreasequentity=()=>{
        const myproduct=JSON.parse(localStorage.getItem('products'))
        if(myproduct.some(value=>{return value.product===product._id})){
        for(let i of myproduct){
         if(i.product===product._id){
            i.quentity--
            setquentity(i.quentity)
         }
        }
        localStorage.setItem('products',JSON.stringify(myproduct))
        }
    }
  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <div className={styles.card}>
                <img className={styles.cardimage} src={product.image}/>
                <div className={styles.carddetails}>
                {product.name}<p>Price : {product.price} Rs.</p>
                </div>
                {quentity===0?<button className={styles.button} onClick={add} style={{marginLeft:20+'vw'}}>Add To Cart</button>:<div><button style={{marginLeft:17+'vw',color:'black'}} className={styles.button} onClick={decreasequentity}>-</button>{quentity}<button style={{marginLeft:0+'vw',color:'black'}} className={styles.button} onClick={add}>+</button></div>}
            </div>
        </div>
    </div>
  )
}
export async function getServerSideProps(context){
    const slug=context.query.slug
    const myproduct=await product.findById(slug)
    return{
        props:{product:JSON.parse(JSON.stringify(myproduct))}
    }
}
export default Slug