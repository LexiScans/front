import { useState } from "react";

export interface Parte {
  nombre: string;
}

export enum Type {
  EMPLEO = "EMPLEO",
  SERVICIOS = "SERVICIOS",
  ARRENDAMIENTO = "ARRENDAMIENTO",
  CONFIDENCIALIDAD = "CONFIDENCIALIDAD",
  VENTAS = "VENTAS",
  LICENCIA = "LICENCIA",
}

export const useContractForm = () => {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState<Type | "">("");
  const [partes, setPartes] = useState<Parte[]>([{ nombre: "" }]);
  const [fechaFirma, setFechaFirma] = useState<Date | null>(null);
  const [vencimiento, setVencimiento] = useState<Date | null>(null);
  const [notas, setNotas] = useState("");

  const [mostrarFirmaPicker, setMostrarFirmaPicker] = useState(false);
  const [mostrarVencimientoPicker, setMostrarVencimientoPicker] =
    useState(false);

  const tiposContrato = [
    { label: "Empleo", value: Type.EMPLEO },
    { label: "Servicios", value: Type.SERVICIOS },
    { label: "Arrendamiento", value: Type.ARRENDAMIENTO },
    { label: "Confidencialidad", value: Type.CONFIDENCIALIDAD },
    { label: "Ventas", value: Type.VENTAS },
    { label: "Licencia", value: Type.LICENCIA },
  ];

  const agregarParte = () => setPartes([...partes, { nombre: "" }]);

  const actualizarParte = (index: number, valor: string) => {
    const nuevasPartes = [...partes];
    nuevasPartes[index].nombre = valor;
    setPartes(nuevasPartes);
  };

  const formatearFecha = (fecha: Date | null) => {
    if (!fecha) return "";
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const day = fecha.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    titulo,
    setTitulo,
    tipo,
    setTipo,
    partes,
    agregarParte,
    actualizarParte,
    fechaFirma,
    setFechaFirma,
    vencimiento,
    setVencimiento,
    notas,
    setNotas,
    mostrarFirmaPicker,
    setMostrarFirmaPicker,
    mostrarVencimientoPicker,
    setMostrarVencimientoPicker,
    tiposContrato,
    formatearFecha,
  };
};
