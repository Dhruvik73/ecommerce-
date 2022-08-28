import React,{useEffect,useState} from 'react'
import styles from '../styles/Home.module.css'
import {AiOutlineShoppingCart,AiOutlineHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {RiProductHuntLine} from 'react-icons/ri'
import Link from 'next/link'
import { useRouter } from 'next/router'
function Body() {
    const router=useRouter()
    const page=router.pathname.slice(1)
    const [token, settoken] = useState()
    useEffect(() => {
    settoken(localStorage.getItem('token'))
    },[page])
    const logout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        router.push('/login')
    }
  return (
       <>{token&&<div className={styles.container}>
        <div className={styles.nav}>
                <div className={styles.navitem} style={{color:page===''?'blue':'black'}}>
                    <Link href={'/'} passHref><p><AiOutlineHome/></p></Link>
                </div>
                <div className={styles.navitem} id={styles.product} style={{color:page==='mugs'?'blue':page==='tshirts'?'blue':'black'}}>
                <RiProductHuntLine/>
                    <div className={styles.dropdown}>
                    <Link  href={'/tshirts'} passHref><p>tshirts</p></Link>
                    <Link href={'/mugs'} passHref><p>mugs</p></Link>
                    </div>
                </div>
                <div className={styles.navitem} style={{color:page==='cart'?'blue':'black'}}>
                <Link href={'/cart'} passHref><p><AiOutlineShoppingCart/></p></Link>
                </div>
                <div  style={{color:page==='cart'?'blue':'black'}}>
                <Link href={`/order/${localStorage.getItem('id')}`} passHref><button className={styles.button} id={styles.track}>Track Orders</button></Link>
                </div>
                <div className={styles.navitem}>
                <p onClick={logout}><FiLogOut/></p>
                </div>
            </div>
        </div>}
        </>
  )
}
export default Body