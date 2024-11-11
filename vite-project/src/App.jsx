import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import BlogCard from './components/BlogCard'

function App() {
  
  return (
    <div>
      <Navbar />
      <Outlet/>
      {/* <Footer /> */}
    </div>
  )
}

export default App
