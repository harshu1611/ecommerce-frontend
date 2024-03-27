import { useEffect } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Loading from './components/Loading'
import Header from './components/Header'
// import './styles/app.scss'
import './tailwind.css'
import { Toaster } from 'react-hot-toast'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { userExist, userNotExist } from './redux/reducer/userReducer'
import { getUser } from './redux/api/userApi'
import { getUserSelector } from './redux/store'
import ProtectedRoute from './components/ProtectedRoute'
import Checkout from './pages/Checkout'
import { User } from './types/types'

const Home = lazy(()=>import("./pages/Home"))
const Search = lazy(()=>import("./pages/Search"))
const Cart = lazy(()=>import("./pages/Cart"))   
const Shipping= lazy(()=>import("./pages/Shipping"))
const Login= lazy(()=>import("./pages/Login"))
const Orders= lazy(()=>import("./pages/Orders"))
 

//Admin Routes Import
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);

const App = () => {
  const dispatch= useDispatch()
useEffect(() => {
 onAuthStateChanged(auth,async(user)=>{
      if(user){
        const data= await getUser(user.uid)
        console.log("Logged in")
        dispatch(userExist(data.user))
      }
      else {
        dispatch(userNotExist())
        console.log("Not logged in")
      }
 })
}, [])

  const {user}= useSelector(getUserSelector)
  return   (
    <BrowserRouter>

    <Header user={user}/>
    <Suspense fallback={<Loading/>}>
    <Routes>
    <Route path='/login' element={
      <ProtectedRoute isAuthenticated={user ? false : true}>
        <Login/>
      </ProtectedRoute>
    } ></Route>

        <Route path='/' element={<Home/>} ></Route>
        <Route path='/search' element={<Search/>} ></Route>
        <Route path='/cart' element={ <ProtectedRoute isAuthenticated={user? true : false}>
          <Cart/>
          </ProtectedRoute>}>
       
        </Route>
        <Route path='/orders' element={
          <ProtectedRoute isAuthenticated={user? true : false}>
          <Orders/>
          </ProtectedRoute>
        }>
        
        </Route>
    
    <Route path='/shipping' element={
      <ProtectedRoute isAuthenticated={user? true : false}>
          <Shipping/>
          </ProtectedRoute>
    }>
        
        </Route>
        <Route path='/pay' element={
      <ProtectedRoute isAuthenticated={user? true : false}>
          <Checkout/>
          </ProtectedRoute>
    }>
        
        </Route>
      
       
  
   
      
   

        {/* Admin Routes */}
        <Route
  // element={
  //   <ProtectedRoute isAuthenticated={true} adminRoute={true} isAdmin={true} />
  // }
>
  <Route path="/admin/dashboard" element={<Dashboard />} />
  <Route path="/admin/product" element={<Products />} />
  <Route path="/admin/customer" element={<Customers />} />
  <Route path="/admin/transaction" element={<Transaction />} />
  {/* Charts */}
  <Route path="/admin/chart/bar" element={<Barcharts />} />
  <Route path="/admin/chart/pie" element={<Piecharts />} />
  <Route path="/admin/chart/line" element={<Linecharts />} />
  {/* Apps */}
  <Route path="/admin/app/coupon" element={<Coupon />} />
  <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
  <Route path="/admin/app/toss" element={<Toss />} />

  {/* Management */}
  <Route path="/admin/product/new" element={<NewProduct />} />

  <Route path="/admin/product/:id" element={<ProductManagement />} />

  <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
</Route>;
      </Routes>
    </Suspense>
      <Toaster position='bottom-center'/>
    </BrowserRouter>
  )
 
}

export default App