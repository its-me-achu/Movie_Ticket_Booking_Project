import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import ProtectedRoute from './components/protectedRoute'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile/Profile'
import Admin from './pages/Admin/Admin'
import MoviesList from './pages/Admin/MoviesList'
import TheatresForMovie from './pages/TheatresForMovie/TheatresForMovie'
import BookShow from './pages/BookShow/BookShow'





function App() {
const {loading} = useSelector((state)=> state.loaders);

  return (
   
    <>
     {loading && (
      <div className='loader-parent'>
      <div className='loader'></div>
      </div>)}
   <BrowserRouter>
   
   <Routes>
    <Route path ="/" element = {<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path ="/movies/:id" element = {<ProtectedRoute><TheatresForMovie/></ProtectedRoute>}/> 
     <Route path ="/book-show/:id" element = {<ProtectedRoute><BookShow/></ProtectedRoute>}/>
    <Route path ="/profile" element = {<ProtectedRoute><Profile/></ProtectedRoute>}/>
    <Route path ="/admin" element = {<ProtectedRoute><Admin/></ProtectedRoute>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
   </Routes>
  
   </BrowserRouter>
    </>
  )
}
 export default App

