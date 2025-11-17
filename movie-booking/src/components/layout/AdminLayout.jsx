import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../../pages/AdminTemplate/_components/Footer';

export default function AdminLayout({ children }) {
    const location = useLocation();

    const menuItems = [
        { path: '/admin', label: 'Dashboard', icon: '📊' },
        { path: '/admin/add-user', label: 'Add User', icon: '👤' },
        { path: '/admin/movies', label: 'Movies', icon: '🎬' },
        { path: '/admin/bookings', label: 'Bookings', icon: '🎫' },
    ];

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
                    <nav>
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                            ? 'bg-blue-600 text-white'
                                            : 'hover:bg-gray-700'
                                            }`}
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="px-6 py-4 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Admin Dashboard
                        </h2>
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="text-gray-600 hover:text-gray-800"
                            >
                                ← Back to Home
                            </Link>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">Admin User</span>
                                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}
