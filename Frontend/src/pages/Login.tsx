

function Login() {
return (
<div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-200 text-white flex items-center justify-center">
    <div className="bg-white text-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
    <form className="space-y-4">
        <div>
        <label htmlFor="email" className="block text-sm font-medium">
            Correo Electrónico
        </label>
        <input
            type="email"
            id="email"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Ingresa tu correo"
        />
        </div>
        <div>
        <label htmlFor="password" className="block text-sm font-medium">
            Contraseña
        </label>
        <input
            type="password"
            id="password"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Ingresa tu contraseña"
        />
        </div>
        <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
        Iniciar Sesión
        </button>
    </form>
    <p className="mt-4 text-center text-sm">
        ¿No tienes una cuenta?{' '}
        <a href="/register" className="text-blue-600 hover:underline">
        Regístrate
        </a>
    </p>
    </div>
</div>
);
}

export default Login;