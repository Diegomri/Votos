import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const { logout, changePassword } = useAuth();
    const [current, setCurrent] = useState('');
    const [newPass, setNewPass] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await changePassword(current, newPass);
        alert('Contraseña actualizada');
        navigate('/'); 
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-purple-200">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Perfil</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-blue-900 font-semibold mb-1">Contraseña actual:</label>
                        <input
                            type="password"
                            placeholder="Contraseña actual"
                            value={current}
                            onChange={(e) => setCurrent(e.target.value)}
                            required
                            className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-blue-900 font-semibold mb-1">Nueva contraseña:</label>
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            required
                            className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <small className="text-gray-500">Mínimo 8 caracteres con mayúscula, minúscula, número y carácter especial</small>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-300"
                    >
                        Cambiar contraseña
                    </button>
                </form>
                <button
                    onClick={logout}
                    className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Profile;