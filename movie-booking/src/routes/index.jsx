import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Layouts
import HomeTemplate from '../pages/HomeTemplate';
import AdminTemplate from '../pages/AdminTemplate';

// Lazy load pages - Home Template
const Home = lazy(() => import('../pages/HomeTemplate/Home'));
const ListMovie = lazy(() => import('../pages/HomeTemplate/ListMovie'));
const MovieDetail = lazy(() => import('../pages/HomeTemplate/MovieDetail'));

// Lazy load pages - Admin Template
const Dashboard = lazy(() => import('../pages/AdminTemplate/Dashboard'));
const AddUser = lazy(() => import('../pages/AdminTemplate/AddUser'));

// Lazy load pages - Auth (Standalone)
const Auth = lazy(() => import('../pages/AdminTemplate/Auth'));

// Lazy load standalone pages
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeTemplate />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'list-movie',
                element: <ListMovie />
            },
            {
                path: 'movie-detail/:id',
                element: <MovieDetail />
            }
        ]
    },
    {
        path: '/auth',
        element: <Auth />
    },
    {
        path: '/auth/login',
        element: <Auth />
    },
    {
        path: '/auth/register',
        element: <Auth />
    },
    {
        path: '/admin',
        element: <AdminTemplate />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'add-user',
                element: <AddUser />
            }
        ]
    },
    {
        path: '*',
        element: <PageNotFound />
    }
]);

export default router;