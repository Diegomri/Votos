import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (pass: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(pass);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validatePassword(password)) {
            setError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await axios.post('http://localhost:5000/register', {
                email,
                password
            });
            navigate('/login');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message || 'Error al registrar usuario');
            } else {
                setError('Ocurrió un error inesperado');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-purple-200">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Registro</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-blue-900 font-semibold mb-1">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-blue-900 font-semibold mb-1">Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <small className="text-gray-500">Mínimo 8 caracteres con mayúscula, minúscula, número y carácter especial</small>
                    </div>
                    {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-300"
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
                <p className="mt-4 text-center text-blue-900">
                    ¿Ya tienes cuenta?{' '}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-purple-700 font-semibold cursor-pointer hover:underline"
                    >
                        Inicia sesión aquí
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;