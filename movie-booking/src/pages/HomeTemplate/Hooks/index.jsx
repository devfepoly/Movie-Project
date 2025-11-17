import React, { useState, useEffect } from 'react'

export default function Hooks() {
    const [count, setCount] = useState(0)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Fetch data example
        const controller = new AbortController()

        const fetchData = async () => {
            setLoading(true)
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))
                setData({ message: 'Dynamic Hooks Component' })
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Fetch error:', error)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        return () => controller.abort()
    }, [])

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">React Hooks Demo</h1>

            <div className="bg-gray-100 p-4 rounded mb-4">
                <h2 className="text-xl font-semibold mb-2">useState Example</h2>
                <p className="mb-4">Count: <span className="font-bold text-lg">{count}</span></p>
                <button
                    onClick={() => setCount(count + 1)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Increment
                </button>
                <button
                    onClick={() => setCount(count - 1)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-2"
                >
                    Decrement
                </button>
            </div>

            <div className="bg-gray-100 p-4 rounded">
                <h2 className="text-xl font-semibold mb-2">useEffect Example</h2>
                {loading ? (
                    <p className="text-gray-600">Loading...</p>
                ) : data ? (
                    <p className="text-green-600 font-semibold">{data.message}</p>
                ) : null}
            </div>
        </div>
    )
}
