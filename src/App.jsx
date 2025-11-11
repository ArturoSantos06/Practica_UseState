import React, { useState } from 'react';
import ControlSemaforoTren from './components/ControlSemaforoTren';
import Registro from './components/Registro';
import Navbar from './components/NavBar';
import RegistroMemoria from './components/RegistroMemoria';
import RegistroPersistente from './components/RegistroPersistente';

const VISTAS = {
    REGISTRO: 'registro',
    MEMORIA: 'memoria',
    PERSISTENTE: 'persistente',
    SEMAFORO: 'semaforo',
};

const NAV_TABS = [
    { key: VISTAS.REGISTRO, label: 'Registro de Pasajeros' },
    { key: VISTAS.SEMAFORO, label: 'Control de Semáforo' },
    { key: VISTAS.MEMORIA, label: 'Registro Llegada (A)' },
    { key: VISTAS.PERSISTENTE, label: 'Registro Llegada (B)' },

];

function App() {
    const [activeView, setActiveView] = useState(VISTAS.REGISTRO);

    const renderView = () => {
        const baseClasses = "p-6 rounded-xl shadow-2xl transition-all duration-300 transform";

        switch (activeView) {
            case VISTAS.REGISTRO:
                return (
                    <div>
                        <Registro />
                    </div>
                );
            case VISTAS.MEMORIA:
                return (
                    <div>
                        <RegistroMemoria />
                    </div>
                );
            case VISTAS.PERSISTENTE:
                return (
                    <div>
                        <RegistroPersistente />
                    </div>
                );
            case VISTAS.SEMAFORO:
                return (
                    <div className="flex justify-center items-center p-8 min-h-[80vh] text-white">
                        <ControlSemaforoTren />
                    </div>
                );
            default:
                return (
                    <div className={`bg-white ${baseClasses} hover:shadow-cyan-400/50`}>
                        <Registro />
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
            
            <header className="w-full max-w-6xl mx-auto text-white text-center pt-8 mb-4">
                <h1 className="text-4xl font-extrabold text-cyan-300 mb-2">
                    <i className="fas fa-train mr-3"></i>Sistema Tren Ligero
                </h1>
            </header>

            <Navbar
                activeView={activeView}
                onViewChange={setActiveView}
                tabs={NAV_TABS}
            />

            <main className="flex-1 max-w-6xl mx-auto w-full pb-10 p-4 sm:p-8 pt-6">
                {renderView()}
            </main>
        </div>
    );
}

export default App;