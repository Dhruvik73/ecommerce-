import React from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
function Products({products,loading}) {
  return (
    <div className={styles.container}>
      {loading&&<div className={styles.loading}><Image src={'/loading.gif'} height={150} width={150}/></div>}
    {!loading&&<div className={styles.body}>
        {products.map((k)=>{
          return (<div key={k._id} className={styles.product}>
          <Link href={`/product/${k._id}`}><img style={{cursor:'pointer'}} className={styles.image} src={k.image} alt="not load" /></Link>
        <div className={styles.details}>
          <div style={{display:'flex',flexDirection:'column'}}>
            <p>{k.name}</p>
            <p>price : {k.price}</p>
            <p>description:- {k.description}</p>
            <div style={{display:'flex',marginLeft:9+'vw'}}>{k.color.map((k)=>{
              return(<p key={k} className={styles.color} style={{backgroundColor:`${k}`}}></p>)
            })
            }</div>
           <Link href={`/product/${k._id}`}><button className={styles.button}>Buy</button></Link>
          </div>
        </div>
        </div>
        )})}
      </div>}
    </div>
  )
}
export default Products
