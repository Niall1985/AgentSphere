import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="min-h-screen bg-charcoal-950 text-gray-200">
      
      {/* Navbar */}
      <header className="border-b border-white/10 backdrop-blur-md bg-charcoal-900/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-tight">
            AgentSphere
          </h1>
          <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition">
            Dashboard
          </button>
        </div>
      </header>

      {/* Router Content */}
      <main className="max-w-6xl mx-auto p-6">
        <AppRouter />
      </main>

    </div>
  );
}

export default App;