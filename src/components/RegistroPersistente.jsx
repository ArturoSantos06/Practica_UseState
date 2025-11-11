import React, { useState, useEffect } from 'react';

const LS_KEY = 'registro_tren_persistente';

const Formulario = ({ encargado, setEncargado, codigo, setCodigo, pasajeros, setPasajeros, handleSubmit, buttonText, accentColor }) => (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end mb-6 p-4 border rounded-lg bg-gray-50">
        <label className="col-span-1">
            <span className="text-sm font-medium text-gray-700">Encargado/Conductor:</span>
            <input
                value={encargado}
                onChange={(e) => setEncargado(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 placeholder:text-slate-400 "
                required
            />
        </label>
        <label className="col-span-1">
            <span className="text-sm font-medium text-gray-700">Código de Tren:</span>
            <input
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ej. TL-105"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 placeholder:text-slate-400"
                required
            />
        </label>
        <label className="col-span-1">
            <span className="text-sm font-medium text-gray-700">Pasajeros:</span>
            <input
                type="number"
                value={pasajeros}
                onChange={(e) => setPasajeros(e.target.value)}
                placeholder="0"
                min="0"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 placeholder:text-slate-400"
                required
            />
        </label>
        <button
            type="submit"
            className={`col-span-1 px-4 py-2 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 ${accentColor}`}
        >
            {buttonText}
        </button>
    </form>
);

const ListaRegistros = ({ registros, title }) => (
    <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-semibold mb-3 text-white">{title} ({registros.length})</h3>
        {registros.length === 0 ? (
            <p className="text-gray-400">No hay registros aún.</p>
        ) : (
            <div className="max-h-80 overflow-y-auto space-y-2 p-2 bg-gray-50 rounded-lg border">
                {registros.map((r) => (
                    <div key={r.id} className="p-3 bg-white rounded-lg border shadow-sm flex flex-col md:flex-row justify-between text-sm">
                        <span className="font-bold text-slate-800">
                            {r.encargado}
                        </span>
                        <span className="text-gray-600 md:ml-4 flex-1">
                            Tren: <span className="font-mono text-indigo-600">{r.codigo}</span> | Pasajeros: <span className="font-semibold">{r.pasajeros}</span>
                        </span>
                        <span className="text-xs text-gray-400 mt-1 md:mt-0 md:ml-4">
                            Registro: {r.fecha_registro}
                        </span>
                    </div>
                ))}
            </div>
        )}
    </div>
);

const RegistroPersistente = () => {
    const [encargado, setEncargado] = useState('');
    const [codigo, setCodigo] = useState('');
    const [pasajeros, setPasajeros] = useState('');
    const [registros, setRegistros] = useState(() => {
        try {
            const raw = localStorage.getItem(LS_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (error) {
            console.error("Error al cargar localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(LS_KEY, JSON.stringify(registros));
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
        }
    }, [registros]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!encargado.trim() || !codigo.trim() || isNaN(parseInt(pasajeros))) {
            console.error("Campos incompletos o inválidos.");
            return;
        }

        const nuevoRegistro = {
            id: Date.now(),
            encargado: encargado.trim(),
            codigo: codigo.trim(),
            pasajeros: parseInt(pasajeros, 10),
            fecha_registro: new Date().toLocaleString('es-MX', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            }),
        };

        setRegistros(prev => [nuevoRegistro, ...prev]);

        setEncargado('');
        setCodigo('');
        setPasajeros('');
    };

    const limpiarLista = () => {
        setRegistros([]);
        localStorage.removeItem(LS_KEY);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-white border-b pb-2">
                Variante B: Registro de llegada Tren Ligero (localStorage)
            </h2>
            
            <Formulario
                encargado={encargado}
                setEncargado={setEncargado}
                codigo={codigo}
                setCodigo={setCodigo}
                pasajeros={pasajeros}
                setPasajeros={setPasajeros}
                handleSubmit={handleSubmit}
                buttonText="Registrar"
                accentColor="bg-slate-900 hover:bg-slate-700"
            />

            <ListaRegistros registros={registros} title="Registros Persistentes" />
                        <div className="mt-4 flex justify-end">
                <button
                    onClick={limpiarLista}
                    disabled={registros.length === 0}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50 transition-colors duration-200 shadow-md hover:bg-red-600"
                >
                    Limpiar lista ({registros.length})
                </button>
            </div>
            
        </div>
    );
};

export default RegistroPersistente;