import { useParams } from "react-router-dom";

interface Mesa {
    [key: string]: string | number;
}

interface MesasTablaProps {
    mesas: Mesa[];
    currentParam: string;
}

function Tables_Votos({ mesas, currentParam }: MesasTablaProps) {
    const COLUMN_ORDER = [
        'name',
        'centro',
        'votos_validos',
        'votos_nulos',
        'EG',
        'NM',
        'LM',
        'JABE',
        'JOBR',
        'AE',
        'CF',
        'DC',
        'EM',
        'BERA'
    ];

    const params = useParams();
    const paramValue = params[currentParam];

    const filteredMesas = paramValue
        ? mesas.filter(mesa => `${mesa.centro}` === paramValue)
        : [];

    if (!filteredMesas || filteredMesas.length === 0) {
        return (
            <div className="text-center text-lg text-white mt-4">
                <p>No hay mesas disponibles para el centro seleccionado.</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">
                Mesas del Centro: {paramValue}
            </h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <tr>
                            {COLUMN_ORDER.map(clave => (
                                <th
                                    key={clave}
                                    className="px-4 py-2 border border-gray-300 text-left"
                                >
                                    {clave.toUpperCase().replace('_', ' ')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMesas.map(mesa => (
                            <tr
                                key={mesa.name}
                                className="text-black odd:bg-white even:bg-gray-100 hover:bg-blue-100 transition duration-200"
                            >
                                {COLUMN_ORDER.map(clave => (
                                    <td
                                        key={clave}
                                        className="px-4 py-2 border border-gray-300"
                                    >
                                        {mesa[clave]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Tables_Votos;