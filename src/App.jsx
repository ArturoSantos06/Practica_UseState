import { useState } from "react";

const App = () => {
  const [esLuzRoja, setEsLuzRoja] = useState(false);

  const lightBaseClasses = "w-16 h-16 rounded-full mx-auto mb-3 border-2 border-gray-900 shadow-xl transition-opacity duration-300";
  
  const colorOffClasses = "bg-gray-700 opacity-20";
  
  const redOnClasses = "bg-red-600 opacity-100 shadow-[0_0_35px_rgba(255,0,0,1)]";
  const yellowOnClasses = "bg-yellow-400 opacity-100 shadow-[0_0_35px_rgba(255,255,0,1)] animate-pulse"; 
  
  const buttonClasses = esLuzRoja
    ? "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-400"
    : "bg-red-600 hover:bg-red-700 focus:ring-red-400";

  return (                
    <div className="flex flex-col items-center p-8 min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-500">
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      
      <h1 className="text-3xl font-bold mb-6 text-center">
        Control Semáforo de Tren Ligero
      </h1>
      
      <p className="text-lg mb-8 font-medium">
        Estado Actual: <span className={`font-extrabold ${esLuzRoja ? 'text-red-500' : 'text-yellow-500'}`}>
          {esLuzRoja ? 'ROJO (ALTO)' : 'AMARILLO (PRECAUCIÓN)'}
        </span>
      </p>

      <button
        className={`flex items-center space-x-2 py-3 px-6 rounded-lg font-semibold mb-12 text-white shadow-lg transition duration-300 focus:outline-none focus:ring-4 ${buttonClasses}`}
        onClick={() => setEsLuzRoja(!esLuzRoja)}
        aria-label="Alternar entre luz roja de alto y luz amarilla de precaución"
      >
        {esLuzRoja 
            ? <i className="fa-solid fa-triangle-exclamation" />
            : <i className="fa-solid fa-stop" />}
        
        <span>
          {esLuzRoja 
              ? "Cambiar a Amarillo (Precaución)" 
              : "Cambiar a Rojo (Alto)"}
        </span>
      </button>

      <div className="bg-gray-700 p-3 rounded-3xl shadow-2xl border-4 border-gray-900 w-24">
        
        <div 
          className={`${lightBaseClasses} ${
            esLuzRoja ? redOnClasses : colorOffClasses
          }`}
        ></div>

        <div 
          className={`${lightBaseClasses} ${
            esLuzRoja ? colorOffClasses : yellowOnClasses
          }`}
        ></div>
        
      </div>
    </div>
  );
};

export default App;
