import React,{useState} from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
function Login() {
  const router=useRouter()
    const [val, setval] = useState({email:'',password:''})
    const onchange=(e)=>{
        setval({...val,[e.target.name]:e.target.value})
    }
    const signin=async()=>{
      const body={
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:val.email,password:val.password})
      }
      const res=await fetch(`${process.env.ROUTE}/api/getuser`,body)
      const user=await res.json()
      if(user.myuser){
        toast.success('login sucessfully 👍', {
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
        toast.error(user.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
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
            <div className="row" id={styles.emaildiv}>
  <div className="col-md-10">
    <label htmlFor="inputEmail4" className="form-label">Email</label>
    <input type="email" className="form-control" onChange={onchange} name='email' id="inputEmail4" placeholder='Email'/>
  </div>
  <div className="col-md-10" style={{marginTop:20+'px'}}>
    <label htmlFor="inputPassword4" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onchange} name='password' id="inputPassword4" placeholder='Password'/>
  </div>
  <div className="col-12" style={{marginTop:20+'px'}}>
    <a href={'/forgot'} style={{textDecoration:'none'}}>Forgot Password!</a>
  </div>
  <div className="col-12" style={{marginTop:10+'px'}}>
    <p>New User! <a style={{textDecoration:'none'}} href={'/signup'}>Signup Here</a></p>
  </div>
  <div className='col-12' style={{marginTop:20+'px'}}>
    <button onClick={signin} type="submit" className="btn btn-sm">Sign in</button>
  </div>
</div>
            </div>
        </div>
    </div>
  )
}

export default Login