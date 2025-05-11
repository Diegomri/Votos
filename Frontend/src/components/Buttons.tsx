import { useParams, useNavigate } from "react-router-dom";
import Votos from './Votos';

interface Lugar {
    [key: string]: string | number;
    name: string;
}

interface BotonesProps {
    lugares: Lugar[];
    destinoBase: string;
    nextParam: string;
    currentParam?: string;
}

function Botones({ 
    lugares, 
    destinoBase, 
    nextParam, 
    currentParam,
}: BotonesProps) {
    const navigate = useNavigate();
    const params = useParams();

    const paramValue = currentParam ? params[currentParam] : undefined;
    const filteredLugares = currentParam && paramValue
        ? lugares.filter(lugar => `${lugar[currentParam]}` === paramValue)
        : lugares;

    if (!lugares || lugares.length === 0) {
        return <p className="text-center text-lg text-white">No hay lugares disponibles.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-purple-200">
            <div className="mt-4">
                <Votos param = {paramValue} nextParam = {nextParam}/>
            </div>
            <div id="botones" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {filteredLugares.map(lugar => (
                    <button
                        key={lugar[nextParam]}
                        onClick={() => navigate(`${destinoBase}/${lugar[nextParam]}`)}
                        aria-label={`Ir a ${lugar.name}`}
                        className=" cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-300"
                    >
                        {lugar.name}
                    </button>
                ))}
            </div>
            
        </div>
    );
}

export default Botones;