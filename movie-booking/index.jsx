import React, { useEffect } from 'react'
import { useState } from 'react';

export default function Hooks() {
    const [count, setCount] = useState(0);
    console.log("Hook rendered")

    const getListData = () => {
        console.log("request server");
    };

    useEffect(() => {
        getListData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8">
                <h1 className="text-4xl font-bold text-white mb-4">Hook Demo</h1>
                <h2 className="text-2xl text-pink-500 mb-4">Count: {count}</h2>
                <button
                    onClick={() => setCount(count + 1)}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                    Click to Increment
                </button>
            </div>
        </div>
    )
}
