import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
        </div>
    );
};

export default LoadingSpinner;