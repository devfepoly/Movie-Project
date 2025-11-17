import { lazy } from 'react';
import { createBrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import HomeTemplate from '../pages/HomeTemplate';
import AdminTemplate from '../pages/AdminTemplate';

// Lazy load pages - Home Template
const Home = lazy(() => import('../pages/HomeTemplate/Home'));
const About = lazy(() => import('../pages/HomeTemplate/About'));
const ListMovie = lazy(() => import('../pages/HomeTemplate/ListMovie'));
const MovieDetail = lazy(() => import('../pages/HomeTemplate/MovieDetail'));

// Lazy load pages - Admin Template
const Dashboard = lazy(() => import('../pages/AdminTemplate/Dashboard'));
const AddUser = lazy(() => import('../pages/AdminTemplate/AddUser'));

// Lazy load standalone pages
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const HooksIndex = lazy(() => import('../pages/HomeTemplate/Hooks'));

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
                path: 'about',
                element: <About />
            },
            {
                path: 'list-movie',
                element: <ListMovie />
            },
            {
                path: 'movie/:id',
                element: <MovieDetail />
            },
            {
                path: 'hooks',
                element: <HooksIndex />
            }
        ]
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

const renderRoutes = () => {

    return Routes.map((route) => {
        if (route.children) {
            return (
                <Route key={route.path} path={route.path} element={route.element}>
                    {route.children.map((childRoute) => {
                        return (
                            <Route key={childRoute.path || 'index'} path={childRoute.path} index={childRoute.index} element={childRoute.element} />
                        )
                    })}
                </Route>
            )
        } else {
            return (
                <Route key={route.path} path={route.path} element={route.element} />
            )
        }
    })
}
export default renderRoutes;

const renderHook = () => {
    return Routes.map((route) => {
        if (route.path === '/hooks') {
            return (
                <Route key={route.path} path={route.path} element={route.element} />
            )
        }else{
            return null;
        }
    })
}
export { renderHook };