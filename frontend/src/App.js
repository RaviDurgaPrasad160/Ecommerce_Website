import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logoutUser } from './store/slices/userSlice';
import { useEffect } from 'react';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryTime = localStorage.getItem('expiryTime');
    const currentTime = Date.now();

    if (token && expiryTime && currentTime >= expiryTime) {
      // Token expired, logout the user
      dispatch(logoutUser());
    }
  }, [dispatch]);

  return (
    <>
    
      <ToastContainer />
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
      
    </>
  );
}

export default App;
