// src/components/WelcomeCard.js
import React from 'react';

const WelcomeCard = () => {
  return (
    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Symox Dashboard</h2>
      <h3 className="text-lg font-semibold mb-4">Welcome Back, Peter Kelsey!</h3>
      <p className="mb-6">
        Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien libero tincidunt.
      </p>
      <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
        View Profile →
      </button>
    </div>
  );
};

export default WelcomeCard;