import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SearchResults() {
const location = useLocation();
const navigate = useNavigate();

const queryParams = new URLSearchParams(location.search);
const query = queryParams.get("q") || "";

const [estados, setEstados] = useState([]);
const [municipios, setMunicipios] = useState([]);
const [parroquias, setParroquias] = useState([]);

useEffect(() => {
    fetchBusqueda();
}, [query]);

const fetchBusqueda = async () => {
    try {
    const results = await fetch(`http://localhost:5000/search?q=${query}`);
    const data = await results.json();

    const estados = data.filter((item: any) => item.tabla === "Estado");
    const municipios = data.filter((item: any) => item.tabla === "Municipio");
    const parroquias = data.filter((item: any) => item.tabla === "Parroquia");

    setEstados(estados);
    setMunicipios(municipios);
    setParroquias(parroquias);
    } catch (error) {
    console.error("Error fetching search results:", error);
    }
};

return (
    <div className="h-screen bg-gradient-to-r from-blue-300 to-purple-200 text-white p-6">
    <h1 className="text-2xl font-bold text-center mb-4">Resultados de búsqueda</h1>
    <p className="text-center mb-6">
        Buscando: <span className="font-semibold">{query}</span>
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {estados.length > 0 && (
        <div>
            <h2 className="text-xl font-bold mb-4 text-center">Estados</h2>
            <ul className="list-none space-y-2">
            {estados.map((estado: any, index: number) => (
                <li
                key={index}
                className="cursor-pointer bg-blue-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-blue-700 transition"
                onClick={() => navigate(`/municipios/${estado.registro.cod_edo}`)}
                >
                {estado.registro.name}
                </li>
            ))}
            </ul>
        </div>
        )}

        {municipios.length > 0 && (
        <div>
            <h2 className="text-xl font-bold mb-4 text-center">Municipios</h2>
            <ul className="list-none space-y-2">
            {municipios.map((municipio: any, index: number) => (
                <li
                key={index}
                className="cursor-pointer bg-blue-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-blue-700 transition"
                onClick={() => navigate(`/parroquias/${municipio.registro.id}`)}
                >
                {municipio.registro.name} - {municipio.estado}
                </li>
            ))}
            </ul>
        </div>
        )}

        {parroquias.length > 0 && (
        <div>
            <h2 className="text-xl font-bold mb-4 text-center">Parroquias</h2>
            <ul className="list-none space-y-2">
            {parroquias.map((parroquia: any, index: number) => (
                <li
                key={index}
                className="cursor-pointer bg-blue-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-blue-700 transition"
                onClick={() => navigate(`/centros/${parroquia.registro.cod_par}`)}
                >
                {parroquia.registro.name} - {parroquia.municipio} - {parroquia.estado}
                </li>
            ))}
            </ul>
        </div>
        )}
    </div>

    {estados.length === 0 && municipios.length === 0 && parroquias.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
        No se encontraron resultados para la búsqueda.
        </p>
    )}
    </div>
);
}

export default SearchResults;