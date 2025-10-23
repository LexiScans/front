import React, { useState } from "react";
import "./DetallesContrato.css";

interface Parte {
    nombre: string;
}

const tiposContrato = [
    "Empleo",
    "Servicios",
    "Arrendamiento",
    "Confidencialidad",
    "Ventas",
    "Licencia",
    "Préstamo",
];

const DetallesContrato: React.FC = () => {
    const [titulo, setTitulo] = useState("");
    const [tipo, setTipo] = useState("");
    const [partes, setPartes] = useState<Parte[]>([{ nombre: "" }]);
    const [fechaFirma, setFechaFirma] = useState("");
    const [vencimiento, setVencimiento] = useState("");
    const [notas, setNotas] = useState("");

    const agregarParte = () => setPartes([...partes, { nombre: "" }]);

    const actualizarParte = (index: number, valor: string) => {
        const nuevasPartes = [...partes];
        nuevasPartes[index].nombre = valor;
        setPartes(nuevasPartes);
    };

    return (
        <div className="contrato-container">
            <h2 className="contrato-title">Detalles del Contrato</h2>
            <p className="contrato-subtitle">Paso 1 de 3</p>
            <div className="contrato-progress">
                <div className="contrato-progress-bar"></div>
            </div>

            <p className="contrato-description">
                Completa la información clave de tu contrato para una mejor organización.
            </p>

            {/* Título */}
            <label className="contrato-label">Título del Contrato</label>
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej. Contrato de Arrendamiento"
                className="contrato-input"
            />

            {/* Tipo */}
            <label className="contrato-label">Tipo de Contrato</label>
            <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="contrato-input"
            >
                <option value="">Selecciona el tipo de contrato</option>
                {tiposContrato.map((t, i) => (
                    <option key={i} value={t}>
                        {t}
                    </option>
                ))}
            </select>

            {/* Partes involucradas */}
            <label className="contrato-label">Partes Involucradas</label>
            {partes.map((parte, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    value={parte.nombre}
                    onChange={(e) => actualizarParte(index, e.target.value)}
                    className="contrato-input"
                />
            ))}
            <button type="button" onClick={agregarParte} className="contrato-link">
                + Añadir otra parte
            </button>

            {/* Fechas */}
            <div className="contrato-fechas">
                <div>
                    <label className="contrato-label">Fecha de Firma</label>
                    <input
                        type="date"
                        value={fechaFirma}
                        onChange={(e) => setFechaFirma(e.target.value)}
                        className="contrato-input"
                    />
                </div>
                <div>
                    <label className="contrato-label">Vencimiento</label>
                    <input
                        type="date"
                        value={vencimiento}
                        onChange={(e) => setVencimiento(e.target.value)}
                        className="contrato-input"
                    />
                </div>
            </div>

            {/* Notas */}
            <label className="contrato-label">Notas</label>
            <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Añade comentarios o detalles importantes aquí..."
                className="contrato-textarea"
            ></textarea>

            {/* Botones */}
            <button className="contrato-boton">Siguiente: Subir Archivo</button>
            <button className="contrato-cancelar">Cancelar</button>
        </div>
    );
};

export default DetallesContrato;
