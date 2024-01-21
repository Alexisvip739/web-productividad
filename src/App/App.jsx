import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TaskProvider } from "../components/Context/TaskContext.jsx";
import Navbar from "../components/navbar/navbar.jsx";
import Home from "../components/Home/Home.jsx";
import History from "../components/History/History.jsx";
import Grafico from "../components/Grafic/Grafico.jsx";

/**
 * Componente App:
 * Este es el componente principal que sirve como punto de entrada para la aplicación.
 * 
 * @returns {JSX.Element} El elemento React renderizado.
 */
function App() {
  return (
    <TaskProvider>
      {/* Utiliza BrowserRouter para la navegación del lado del cliente */}
      <Router>
        <div>
          {/* Incluye un componente de barra de navegación */}
          <Navbar />

          {/* Define rutas utilizando el componente Routes */}
          <Routes>
            {/* Ruta para la página de inicio */}
            <Route path="/" element={<Home />} />

            {/* Ruta para la página de historial */}
            <Route path="/historial" element={<History />} />

            {/* Ruta para la página del gráfico de productividad */}
            <Route path="/grafico-productividad" element={<Grafico />} />
          </Routes>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
