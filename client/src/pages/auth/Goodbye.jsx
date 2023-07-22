import React from 'react';
import cakeImg from '../../assets/cakeImage.jpg'; // replace with your image path

const Goodbye = () => {
  return (
    <div className="py-11 min-h-screen flex items-start justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <img className="mx-auto w-11/12" src={cakeImg} alt="Cake" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Goodbye!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Thanks for visiting Wustl Bakes.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
            onClick={() => window.location.href="/login"} // redirect to home page or wherever you want
          >
            Return to Log In Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Goodbye;