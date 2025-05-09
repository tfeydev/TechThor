// src/pages/Tech.tsx
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const Tech = () => {
  return (
    <Layout>
    <div className="w-full min-h-screen bg-white">
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Entdecke die Tech-Welt
        </h1>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
          {/* Card: Mathematik */}
          <Link to="/tech/mathematik" className="min-w-[250px] max-w-xs bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-600">Mathematik</h2>
              <p className="text-sm text-gray-600 mt-2">
                Die Grundlage jeder KI – verständlich und praxisnah erklärt.
              </p>
            </div>
          </Link>

          {/* Card: ML */}
          <Link to="/tech/ml" className="min-w-[250px] max-w-xs bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-600">Machine Learning</h2>
              <p className="text-sm text-gray-600 mt-2">
                Algorithmen, Modelle und Anwendungsbeispiele – verständlich aufbereitet.
              </p>
            </div>
          </Link>

          {/* Card: DL */}
          <Link to="/tech/dl" className="min-w-[250px] max-w-xs bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-600">Deep Learning</h2>
              <p className="text-sm text-gray-600 mt-2">
                Tiefe neuronale Netze für Bild-, Sprach- und Textverarbeitung.
              </p>
            </div>
          </Link>

          {/* Card: AI */}
          <Link to="/tech/ai" className="min-w-[250px] max-w-xs bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-600">Artificial Intelligence</h2>
              <p className="text-sm text-gray-600 mt-2">
                Überblick, Ethik & Innovation – Was macht KI heute und morgen?
              </p>
            </div>
          </Link>
          
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Tech;
