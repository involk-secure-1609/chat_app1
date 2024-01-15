import React from 'react';

const LogoutButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className="text-black hover:text-white border border-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2 dark:border-blue-400 dark:text-blue-400 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-900"
      onClick={onClick}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;