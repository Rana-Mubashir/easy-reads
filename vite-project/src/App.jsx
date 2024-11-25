import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);  // null until you check
  const location = useLocation();
  const navigate=useNavigate()

  useEffect(() => {
    const data = localStorage.getItem('isUser');
    if (data === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLocation()
  }, []);

  function setLocation() {
    console.log("isloggedin",isLoggedIn)
    // Don't render anything until you know the login state
    if (isLoggedIn === null) {
      return null;  // Or you can return a loading spinner or placeholder
    }

    // If the user is not logged in, redirect them to login/signup
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/login')
    }

    // If logged in and on /login or /signup, redirect to home
    if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/')
    }
  }



  return (
    <div className='bg-gray-900'>
      {/* Show Navbar and Footer only if the user is logged in */}
      {isLoggedIn && <Navbar />}
      <Outlet />
      {isLoggedIn && <Footer />}
    </div>
  );
}

export default App;
