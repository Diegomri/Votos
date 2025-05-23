import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext'; 

function Header() {
    const navigate = useNavigate();
    const { token, logout } = useAuth();

    return (
      <header className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-lg">
        {/* Top Bar */}
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wide">
            Votos de Venezuela 2024
          </h1>
          
          {token ? (
            <div className="flex gap-4">
              <button 
                onClick={() => navigate("/profile")} 
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition cursor-pointer"
              >
                Perfil
              </button>
              <button 
                onClick={logout} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate("/login")} 
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition cursor-pointer"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
  
        {/* Nav Bar */}
        <nav className="bg-blue-700">
          <ul className="flex justify-center space-x-8 p-4 text-lg font-medium">
            <li>
              <a
                onClick={() => navigate("/")}
                className="hover:text-gray-300 transition duration-200 cursor-pointer"
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/estados")}
                className="hover:text-gray-300 transition duration-200 cursor-pointer"
              >
                Estados
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/municipios")}
                className="hover:text-gray-300 transition duration-200 cursor-pointer"
              >
                Municipios
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/parroquias")}
                className="hover:text-gray-300 transition duration-200 cursor-pointer"
              >
                Parroquias
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/centros")}
                className="hover:text-gray-300 transition duration-200 cursor-pointer"
              >
                Centros
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
  
  export default Header;