import React from 'react';

const Navbar = ({ activeView, onViewChange, tabs }) => {
    const getTabClasses = (viewKey) => {
        const base = "py-3 px-6 text-base font-semibold transition-all duration-200 cursor-pointer border-b-4 whitespace-nowrap";
        const borderColor = 'border-cyan-500';

        if (activeView === viewKey) {
            return `${base} text-slate-800 ${borderColor} bg-white rounded-t-lg shadow-inner`;
        } else {
            return `${base} text-slate-400 border-transparent hover:border-slate-600 hover:text-white`;
        }
    };

    return (
        <div className="bg-slate-900 border-b border-slate-700 sticky top-0 z-10 w-full">
            <div className="max-w-4xl mx-auto flex justify-center space-x-0">
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