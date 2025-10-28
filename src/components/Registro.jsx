import { useState } from "react";
import React from "react";

function Modal({
  title = "Envío realizado",
  message = "Este es un envío simulado (solo Front-End).",
  onClose,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        <button
          className="mt-4 w-full rounded-lg bg-slate-900 py-2 text-white hover:bg-slate-800"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [genero, setGenero] = useState("no especificado");
  const [edadPasajero, setEdadPasajero] = useState("");
  const [alimentosSolicitados, setAlimentosSolicitados] = useState([]);
  const [comentarios, setComentarios] = useState("");
  const [recibirPromociones, setRecibirPromociones] = useState(false);

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const opcionesAlimentos = ["Ninguno", "Desayuno completo", "Snacks", "Agua", "Refresco"];
  const opcionesGenero = ["hombre", "mujer", "no especificado"];

  const toggleAlimento = (valor) => {
    setAlimentosSolicitados((prev) =>
      prev.includes(valor) ? prev.filter((i) => i !== valor) : [...prev, valor]
    );
  };

  const validate = () => {
    const e = {};
    if (!nombre.trim()) e.nombre = "Ingresa el nombre del pasajero.";
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Correo inválido.";
    
    if (comentarios.length > 200) e.comentarios = "Máximo 200 caracteres.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    
    console.log("PAYLOAD - REGISTRO TREN", {
      nombre,
      email,
      genero,
      edadPasajero,
      alimentosSolicitados,
      comentarios,
      recibirPromociones,
    });
    setShowModal(true);
  };


  const handleClearComments = () => {
    setComentarios("");
    if (errors.comentarios) {
        setErrors(prev => ({ ...prev, comentarios: undefined }));
    }
  };

  const charCountColor = comentarios.length >= 200 ? "text-rose-600 font-semibold" : "text-slate-500";
  
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 p-6 lg:grid-cols-2 lg:p-10">
      <h1 className="lg:col-span-2 text-2xl font-bold text-center text-slate-900 mb-4">
        Registro de Pasajeros para Abordaje 
      </h1>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Datos de Pasajero
        </h2>

        <label
          htmlFor="nombre"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Nombre del Pasajero
        </label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={`mb-2 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 text-black focus:text-black ${
            errors.nombre
              ? "border-rose-400 ring-rose-200"
              : "border-slate-300 focus:ring-sky-200"
          }`}
          placeholder="Tu nombre completo"
          aria-invalid={!!errors.nombre}
        />
        {errors.nombre && (
          <p className="mb-2 text-sm text-rose-600">{errors.nombre}</p>
        )}

        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mb-2 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 text-black focus:text-black ${
            errors.email
              ? "border-rose-400 ring-rose-200"
              : "border-slate-300 focus:ring-sky-200"
          }`}
          placeholder="tucorreo@dominio.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="mb-2 text-sm text-rose-600">{errors.email}</p>
        )}

        <fieldset className="mb-2">
          <legend className="mb-1 text-sm font-medium text-slate-700">
            Género
          </legend>
          <div className="flex gap-4">
            {opcionesGenero.map((t) => (
              <label
                key={t}
                className="inline-flex items-center gap-2 text-slate-700"
              >
                <input
                  type="radio"
                  name="genero"
                  value={t}
                  checked={genero === t}
                  onChange={(e) => setGenero(e.target.value)}
                />
                <span className="capitalize">{t}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label
          htmlFor="edadPasajero"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Edad (en años o meses)
        </label>
        <input
          id="edadPasajero"
          type="number"
          min="0"
          max="150"
          value={edadPasajero}
          onChange={(e) => setEdadPasajero(e.target.value)}
          className="mb-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-200 text-black focus:text-black"
        />

        <fieldset className="mb-2">
          <legend className="mb-1 text-sm font-medium text-slate-700">
            Alimentos Solicitados
          </legend>
          <div className="flex flex-wrap gap-3">
            {opcionesAlimentos.map(
              (it) => (
                <label
                  key={it}
                  className="inline-flex items-center gap-2 text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={alimentosSolicitados.includes(it)}
                    onChange={() => toggleAlimento(it)}
                  />
                  <span>{it}</span>
                </label>
              )
            )}
          </div>
        </fieldset>

        <label
          htmlFor="comentarios"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Observaciones (máx. 200)
        </label>
        <textarea
          id="comentarios"
          rows={3}
          maxLength={200}
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
          className={`mb-2 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 text-black focus:text-black ${
            errors.comentarios
              ? "border-rose-400 ring-rose-200"
              : "border-slate-300 focus:ring-sky-200"
          }`}
          placeholder="Notas de requerimientos especiales o alergias"
          aria-invalid={!!errors.comentarios}
        />
        
        <div className="flex justify-between items-center mb-2">
            <span className={`text-sm ${charCountColor}`}>
                {comentarios.length}/200
            </span>
            <button
                type="button"
                onClick={handleClearComments}
                className="text-xs font-medium text-sky-600 hover:text-sky-800 transition duration-150"
            >
                Limpiar comentarios
            </button>
        </div>

        {errors.comentarios && (
          <p className="mb-2 text-sm text-rose-600">{errors.comentarios}</p>
        )}

        <div className="mt-2">
          <label className="inline-flex items-center gap-2 text-slate-700">
            <input
              type="checkbox"
              checked={recibirPromociones}
              onChange={(e) => setRecibirPromociones(e.target.checked)}
            />
            Deseo recibir promociones y ofertas especiales
          </label>
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-slate-900 py-2 text-white transition hover:bg-slate-800"
        >
          Registrar Pasajero
        </button>
      </form>

      <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">
          Resumen en Vivo
        </h3>
        <ul className="space-y-1 text-sm text-slate-700">
          <li>
            <b>Nombre:</b> {nombre || "—"}
          </li>
          <li>
            <b>Email:</b> {email || "—"}
          </li>
          <li className="capitalize">
            <b>Género:</b> {genero}
          </li>
          <li className="capitalize">
            <b>Edad:</b> {edadPasajero ? `${edadPasajero} años/meses` : "—"}
          </li>
          <li>
            <b>Alimentos:</b> {alimentosSolicitados.length ? alimentosSolicitados.join(", ") : "Ninguno"}
          </li>
          <li>
            <b>Observaciones:</b> {comentarios ? comentarios : "—"}
          </li>
          <li>
            <b>Recibir Promos:</b> {recibirPromociones ? "Sí" : "No"}
          </li>
        </ul>
        <p className="mt-4 text-xs text-slate-500">* Este panel refleja automáticamente los valores de tu formulario cuando usted escribe.</p>
      </aside>

      {showModal && (
        <Modal
          title="¡Registro Exitoso!"
          message="Los datos del pasajero han sido registrados para el abordaje."
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}