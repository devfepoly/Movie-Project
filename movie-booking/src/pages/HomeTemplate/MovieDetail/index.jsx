import React from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetail() {
    const { id } = useParams();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Movie Detail</h1>
            <p className="text-gray-600">Movie ID: {id}</p>
            {/* Add your movie detail content here */}
        </div>
    );
}
