import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
}
  from 'react-router-dom'
  import App from './App'
  import LandingPage from './pages/landingPage/Index'
import BlogDetailPage from './pages/BlogDetailPage'
import AddNewBlog from './pages/AddNewBlog'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<LandingPage />} />
      <Route path='/blogdetailpage' element={<BlogDetailPage />} />
      <Route path='/addnewblog' element={<AddNewBlog />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
