import React, { useState } from 'react';
import ControlSemaforoTren from './components/ControlSemaforoTren';
import Registro from './components/Registro';
import Navbar from './components/NavBar';

const VISTAS = {
    REGISTRO: 'registro',
    SEMAFORO: 'semaforo',
};

const NAV_TABS = [
    { key: VISTAS.REGISTRO, label: 'Registro de Pasajeros' },
    { key: VISTAS.SEMAFORO, label: 'Control de Semáforo' },
];

function App() {
    const [activeView, setActiveView] = useState(VISTAS.REGISTRO);

    const renderView = () => {
        switch (activeView) {
            case VISTAS.REGISTRO:
                return <Registro />;
            case VISTAS.SEMAFORO:
                return (
                    <div className="flex justify-center items-center p-8 min-h-[80vh] text-white">
                        <ControlSemaforoTren />
                    </div>
                );
            default:
                return <Registro />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 font-sans flex flex-col">

            <Navbar
                activeView={activeView}
                onViewChange={setActiveView}
                tabs={NAV_TABS}
            />

            <main className="flex-1 max-w-6xl mx-auto w-full pb-10">
                {renderView()}
            </main>
        </div>
    );
}

export default App;