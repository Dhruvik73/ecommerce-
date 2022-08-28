let initialstate={
  products:[]
}
const getproducts=(state=initialstate,action)=>{
    switch (action.type) {
      case 'getproducts':return {...state,products:action.payload}
      default:return state
    }
}
export default getproducts