import Body from '../component/body'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import store from '../store'
import {Provider} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }) {
  return(
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <script src="https://smtpjs.com/v3/smtp.js"></script>
    <Body/>
    <Provider store={store}>
  <Component {...pageProps} />
  </Provider>
  </div>
  )
}

export default MyApp
