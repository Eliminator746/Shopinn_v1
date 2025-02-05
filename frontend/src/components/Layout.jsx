import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <>
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
            <ToastContainer />
        </>
    )
}

export default Layout