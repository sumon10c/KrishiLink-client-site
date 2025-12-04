import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
       <div>
        
         <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 px-6 text-center">
            
        <img
          src="https://i.ibb.co.com/CKdcQ8m5/download-38.jpg"
          alt="Farmer 404"
          className="mt-2 w-80 md:w-96"
        />
        <h1 className="text-9xl font-extrabold text-green-700 mb-6">404</h1>
        <h2 className="text-3xl font-bold text-green-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-green-700 mb-8">
          Oops! The page you are looking for does not exist. <br />
          It might have been removed or you typed the wrong URL.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-green-700 text-white font-bold rounded hover:bg-green-800 transition"
        >
          Go Back Home
        </Link>
       
      </div>
       </div>
    );
};

export default ErrorPage;