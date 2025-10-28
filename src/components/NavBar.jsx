import React from 'react';

const Navbar = ({ activeView, onViewChange, tabs }) => {
    const getTabClasses = (viewKey) => {
        const base = "py-3 px-6 text-base font-semibold transition-all duration-200 cursor-pointer border-b-4 whitespace-nowrap";
        
        if (activeView === viewKey) {
            return `${base} text-sky-700 border-sky-500 bg-white`;
        } else {
            return `${base} text-gray-600 border-transparent hover:border-gray-300 hover:text-gray-800`;
        }
    };

    return (
        <div className="bg-gray-100 shadow-sm border-b sticky top-0 z-10">
            <div className="max-w-4xl mx-auto flex justify-center space-x-0 px-4 sm:px-6 lg:px-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={getTabClasses(tab.key)}
                        onClick={() => onViewChange(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Navbar;