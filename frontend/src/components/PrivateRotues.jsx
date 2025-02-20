import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRotues = () => {

    const { userInfo } = useSelector(state => state.auth)
    // console.log('userInfo : ', userInfo);

    return userInfo ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRotues