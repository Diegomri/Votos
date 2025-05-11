import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Buttons from './components/Buttons';

function App() {
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [parroquias, setParroquias] = useState([]);
  const [centros, setCentros] = useState([]);
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    fetchApi();
  }, []); 

  const fetchApi = async () => {
    try {
      const loadApi = await fetch('http://127.0.0.1:5000/leer_api');
      const getApi = await fetch('http://127.0.0.1:5000/get_api');
      const msgApi = await loadApi.json();
      console.log(msgApi);
      const data = await getApi.json();
      setEstados(data.estados);
      setMunicipios(data.municipios);
      setParroquias(data.parroquias);
      setCentros(data.centros);
      setMesas(data.mesas);
      console.log("x");
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-300 to-purple-200 text-white">

    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/estados" 
          element={
            <Buttons 
              lugares={estados}
              destinoBase="/municipios"
              nextParam="cod_edo"
            />
          } 
        />

        <Route 
          path="/municipios" 
          element={
            <Buttons 
              lugares={municipios}
              destinoBase="/parroquias"
              nextParam="id"
            />
          } 
        />

        <Route 
          path="/parroquias" 
          element={
            <Buttons 
              lugares={parroquias}
              destinoBase="/centros"
              nextParam="cod_par"
            />
          } 
        />
        <Route 
          path="/centros" 
          element={
            <Buttons 
              lugares={centros}
              destinoBase="/mesas"
              nextParam="name"
            />
          } 
        />
        
        <Route 
          path="/municipios/:cod_edo" 
          element={
            <Buttons 
              lugares={municipios}
              destinoBase="/parroquias"
              nextParam="id"
              currentParam="cod_edo"
            />
          } 
        />
        <Route 
          path="/parroquias/:mun_id" 
          element={
            <Buttons 
              lugares={parroquias}
              destinoBase="/centros"
              nextParam="cod_par"
              currentParam="mun_id"
            />
          } 
        />
      
        <Route 
          path="/centros/:cod_par" 
          element={
            <Buttons 
              lugares={centros}
              destinoBase="/mesas"
              nextParam="name"
              currentParam="cod_par"
            />
          } 
        />
        
        <Route 
          path="/mesas/:centro" 
          element={"x"
          } 
        />
      </Routes>
    </Router>
    </div>
  );
  
}

export default App;