export function sendotp(email,otp){
    return async dispatch => {
             const body={
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email:email,otp:otp})
             }
             const res=await fetch(`${process.env.ROUTE}/api/sendotp`,body)
             const response=await res.json()
             dispatch(sendmail(response))
    }
}
export function sendmail(response){
    return{
        type:'sendmail',
        payload:response
    }
}