import Head from 'next/head'
import {useEffect,useState} from 'react'
import Products from '../component/products'
import { useRouter } from 'next/router'
const jwt =require('jsonwebtoken')
export default function Home({products}) {
  const [Loading,setLoading]=useState(false)
  const router=useRouter()
  useEffect(() => {
    validate()
  }, [])
  useEffect(() => {
    if(products){
      setLoading(false)
    }
    else{
      setLoading(true)
    }
  }, [products])
  
  const validate =async()=>{
    const id=localStorage.getItem('id')
    if(localStorage.getItem('token')){
    const myid=jwt.verify(localStorage.getItem('token'),process.env.JWT)
    if(id!==JSON.parse(myid)){
     router.push('/signup')
    }
  }
  else{
    router.push('/login')
  }
  }
  return (
  <div>
      <Head>
        <title>ecommerce</title>
        <meta name="description" content="site when you buy your choosen accesories" />
      </Head>
      <Products products={products} loading={Loading}/>
      </div>
  )
}
export async function getServerSideProps(context){
   const body={
     method:'POST',
     headers:{'Content-Type':'application/json'},
   }
   const res=await fetch(`${process.env.ROUTE}/api/getproducts`,body)
   const products=await res.json()
    return {
      props:{products:JSON.parse(JSON.stringify(products.products))}
    }
}