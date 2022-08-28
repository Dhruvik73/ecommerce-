import React,{useState,useEffect} from 'react'
import Products from '../component/products'

function Tshirt({products}) {
  const [Loading,setLoading]=useState(false)
  useEffect(() => {
    if(products){
      setLoading(false)
    }
    else{
      setLoading(true)
    }
  }, [products])
  return (
    <div>
        <Products products={products} loading={Loading}/>
    </div>
  )
}
export async function getServerSideProps(context){
    const body={
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({category:'tshirt'})
    }
    const res=await fetch(`${process.env.ROUTE}/api/getproducts`,body)
    const products=await res.json()
    return {
      props:{products:JSON.parse(JSON.stringify(products.products))}
    }
  }
export default Tshirt