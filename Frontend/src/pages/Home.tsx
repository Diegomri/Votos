function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Estado, Municipio..."
          className="px-4 bg-gray-100 py-2 mt-[25vh] rounded-md border-2 border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 mt-[25vh] rounded-md text-white font-semibold hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default Home;