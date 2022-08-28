export const cartproduct=()=>{
    return async dispatch =>{
    const prod=JSON.parse(localStorage.getItem('products'))
    const body={
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({prod:prod})
    }
    const res=await fetch(`${process.env.ROUTE}/api/cartproduct`,body)
    const products=await res.json()
    dispatch(getproducts(products.products))
}    
}
export function getproducts(products){
    return {
        type:"getproducts",
        payload:products
    }
}
