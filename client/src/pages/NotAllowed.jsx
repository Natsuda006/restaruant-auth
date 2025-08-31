import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotAllowed = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
  <span className="text-5xl font-extrabold text-red-500 mb-6">403</span>
        <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
        <p className="text-gray-700 mb-6 text-center">You are not allowed to access this page</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotAllowed;
