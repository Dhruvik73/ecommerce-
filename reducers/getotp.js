const intialstate={
    payload:''
}
export default function getotp(state=intialstate,action){
    switch(action.type){
        case 'sendmail':return{...intialstate,payload:action.payload}
        default:return state
    }
}