import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const AdminRoute = () => {

    const { userInfo } = useSelector(state => state.auth)
    console.log('userInfo : ', userInfo);
    return (
        <div>
            {userInfo && userInfo.data.user.isAdmin ? <Outlet /> : <Navigate to="/login" replace />}
        </div>
    )
}
export default AdminRoute;