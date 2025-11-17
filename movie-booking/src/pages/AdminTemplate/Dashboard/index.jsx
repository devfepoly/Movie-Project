import React from 'react'

export default function Dashboard() {
    const stats = [
        { label: 'Total Users', value: '1,234', icon: '👥', color: 'bg-blue-500' },
        { label: 'Total Movies', value: '156', icon: '🎬', color: 'bg-green-500' },
        { label: 'Total Bookings', value: '3,456', icon: '🎫', color: 'bg-purple-500' },
        { label: 'Revenue', value: '$45,678', icon: '💰', color: 'bg-yellow-500' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} text-white text-3xl p-4 rounded-lg`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                        <span className="text-2xl">🎬</span>
                        <div>
                            <p className="font-semibold">New movie added: Avengers Endgame</p>
                            <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                        <span className="text-2xl">👤</span>
                        <div>
                            <p className="font-semibold">New user registered: John Doe</p>
                            <p className="text-sm text-gray-500">5 hours ago</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                        <span className="text-2xl">🎫</span>
                        <div>
                            <p className="font-semibold">100 tickets sold today</p>
                            <p className="text-sm text-gray-500">8 hours ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
