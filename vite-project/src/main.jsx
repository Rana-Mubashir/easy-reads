import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import App from './App'
import LandingPage from './pages/landingPage/Index'
import BlogDetailPage from './pages/BlogDetailPage'
import AddNewBlog from './pages/AddNewBlog'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import UpdateBlogPage from './pages/UpdateBlog'
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<LandingPage />} />
        <Route path="/blogdetailpage/:postId" element={<BlogDetailPage />} />
        <Route path="/addnewblog" element={<AddNewBlog />} />
        <Route path="/update/:postId" element={<UpdateBlogPage />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
)
