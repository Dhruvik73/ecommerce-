import React,{useState,useEffect} from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { sendotp } from '../actions/sendemail'
import { ToastContainer, toast } from 'react-toastify';
function Signup() {
    const state=useSelector(state=>state.getotp)
    const dispatch=useDispatch()
    const [verify,setverify]=useState(false)
    const router=useRouter()
    const[otp,setotp]=useState(0)
    const [val, setval] = useState({email:'',password:'',username:'',cpassword:'',otp:''})
    const [loading,setloading]=useState(false)
    const [error,seterror]=useState(false)
    useEffect(() => {
      setotp(Math.floor(Math.random()*100000)+99999)
    }, [])
    
    const onchange=(e)=>{
        setval({...val,[e.target.name]:e.target.value})
    }
    const submit=async()=>{
      if(val.otp===otp.toString()){
      setloading(true)
      const body={
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({username:val.username,email:val.email,password:val.password})
      }
      const res=await fetch(`${process.env.ROUTE}/api/adduser`,body)
      const user=await res.json()
      setloading(false)
      if(user.myuser){
        toast.success('user created sucessfully 👍', {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
})
        localStorage.setItem('id',user.myuser._id)
        localStorage.setItem('token',user.token)
        router.push('/')
      }
      else{
        alert('try again')
      }
    }
    else{
      alert('invalid otp')
    }
    }
    const Sendotp=async()=>{
    if(val.email.replace(/\s/g,'')!==''&&val.password.replace(/\s/g,'')!==''&&val.cpassword.replace(/\s/g,'')!==''&&val.username.replace(/\s/g,'')!==''){
      if(val.password===val.cpassword){
      try{
      setloading(true)
      const body={
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:val.email})
      }
      const res=await fetch(`${process.env.ROUTE}/api/getuser`,body)
      const user=await res.json()
      if(user.error){
      dispatch(sendotp(val.email,otp))
      setloading(false)
      setverify(true)
      }
      else{
        seterror(true)
        setloading(false)
      }
    }catch(error){
      seterror(true)
      setloading(false)
    }
      }
    }
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
            {!verify?<div className="row" id={styles.emaildiv} style={{marginTop:1+'vh',padding:1+'vh'}}>
            <div className="col-md-10">
    <label htmlFor="username" className="form-label">UserName</label>
    <input type="text" name='username' onChange={onchange} className="form-control" id="username" placeholder='UserName'/>
  </div>
  <div className="col-md-10">
    <label htmlFor="inputEmail4" className="form-label" style={{marginTop:20+'px'}}>Email</label>
    <input type="email" name='email' onChange={onchange} className="form-control" id="inputEmail4" placeholder='Email'/>
    {error&&<label htmlFor="inputEmail4" className="form-label" style={{color:'red'}}>User Already Exist!</label>}
  </div>
  <div className="col-md-10" style={{marginTop:10+'px'}}>
    <label htmlFor="inputPassword4" className="form-label">Password</label>
    <input type="password" name='password' onChange={onchange} className="form-control" id="inputPassword4" placeholder='Password'/>
  </div>
  <div className="col-md-10" style={{marginTop:10+'px'}}>
    <label htmlFor="cinputPassword4" className="form-label">Confirm-Password</label>
    <input type="password" name='cpassword' onChange={onchange} className="form-control" id="cinputPassword4" placeholder='Password'/>
  </div>
  <div className="col-12" style={{marginTop:10+'px'}}>
    <p> Already Have An Account! <a style={{textDecoration:'none'}} href={'/login'}>Login Here</a></p>
  </div>
  <div className='col-12'>
    {!loading?<button onClick={Sendotp} className="btn btn-sm">Sign Up</button>
    :<Image src={'/loading.gif'} height={80} width={80}/>}
  </div>
</div>:<div><div className="col-md-10" style={{marginTop:10+'vh',marginLeft:2.5+'vw'}}>
    <label htmlFor="otp" className="form-label">OTP</label>
    <input type="text" name='otp' onChange={onchange} className="form-control" id="otp" placeholder='Enter Your Otp'/>
    <button onClick={submit} className="btn btn-sm" style={{marginTop:10+'px'}}>submit</button>
  </div>
  </div>}
            </div>
        </div>
    </div>
  )
}
export default Signup