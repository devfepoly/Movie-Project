import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminLayout from '../../components/layout/AdminLayout';

export default function AdminTemplate() {
    // Fix: Use correct state key 'auth' instead of 'authReducer'
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    // Check authentication and admin role
    if (!isAuthenticated || !user || user.maLoaiNguoiDung !== "QuanTri") {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    );
}
