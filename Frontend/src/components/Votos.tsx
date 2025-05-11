import { useState, useEffect } from 'react';

interface VotosProps {
    param: any;
    nextParam: string;
}

function Votos({ param, nextParam }: VotosProps) {
    const [votos_totales, setVotos_totales] = useState(0);
    const [votos_nulos, setVotos_nulos] = useState(0);
    const [EG, setEG] = useState(0);
    const [NM, setNM] = useState(0);
    const [LM, setLM] = useState(0);
    const [JABE, setJABE] = useState(0);
    const [JOBR, setJOBR] = useState(0);
    const [AE, setAE] = useState(0);
    const [CF, setCF] = useState(0);
    const [DC, setDC] = useState(0);
    const [EM, setEM] = useState(0);
    const [BERA, setBERA] = useState(0);

    useEffect(() => {
        fetchVotos();
    }, [param, nextParam]);

    const fetchVotos = async () => {
        let url = "http://127.0.0.1:5000/get_votos";
        let x = "";
        switch (nextParam) {
            case "id":
                x = "E";
                break;
            case "cod_par":
                x = "";
                break;
            case "name":
                x = "P";
                break;
            default:
                x = "C";
                break;
        }
        url = param ? `${url}/${x}${param}` : url;
        console.log(url);
        const getResponse = await fetch(url);
        const data = await getResponse.json();
        setVotos_totales(data.votos_totales);
        setVotos_nulos(data.votos_nulos);
        setEG(data.EG);
        setNM(data.NM);
        setLM(data.LM);
        setJABE(data.JABE);
        setJOBR(data.JOBR);
        setAE(data.AE);
        setCF(data.CF);
        setDC(data.DC);
        setEM(data.EM);
        setBERA(data.BERA);
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-white mb-4">Resultados de Votos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                    <p className="font-semibold">Votos Totales</p>
                    <p>{votos_totales}</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                    <p className="font-semibold">Votos Nulos</p>
                    <p>{votos_nulos}</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                    <p className="font-semibold">EG</p>
                    <p>{EG}</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                    <p className="font-semibold">NM</p>
                    <p>{NM}</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                    <p className="font-semibold">LM</p>
                    <p>{LM}</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                    <p className="font-semibold">JABE</p>
                    <p>{JABE}</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                    <p className="font-semibold">JOBR</p>
                    <p>{JOBR}</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                    <p className="font-semibold">AE</p>
                    <p>{AE}</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                    <p className="font-semibold">CF</p>
                    <p>{CF}</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                    <p className="font-semibold">DC</p>
                    <p>{DC}</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                    <p className="font-semibold">EM</p>
                    <p>{EM}</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg shadow-md">
                    <p className="font-semibold">BERA</p>
                    <p>{BERA}</p>
                </div>
            </div>
        </div>
    );
}

export default Votos;