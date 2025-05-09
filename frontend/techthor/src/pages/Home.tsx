import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
        {/* Begrüßung / Intro */}
        <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Wissen bündeln. Daten verbinden. Zukunft gestalten.
        </h1>
        {/* <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Wissen bündeln. Daten verbinden. Zukunft gestalten.
          </h1>
        </div> */}

        {/* Highlights / Einstiegskarten */}
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Mathematik & KI */}
            <Link to="/tech" className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <h4 className="text-xl font-semibold text-blue-600 mb-2">Technologien verstehen</h4>
              <p className="text-gray-700">
                Von Mathematik über Machine Learning bis hin zu Artificial Intelligence – hier findest du fundiertes Wissen.
              </p>
            </Link>

            {/* DataFusionHUB */}
            <Link to="/dashboard/datafusionhub" className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <h4 className="text-xl font-semibold text-blue-600 mb-2">DataFusionHUB</h4>
              <p className="text-gray-700">
                Deine Zentrale zur Datenintegration. API-bereit, ideal zur Weiterverarbeitung von Informationen.
              </p>
            </Link>

            {/* Kontakt */}
            <Link to="/contact" className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <h4 className="text-xl font-semibold text-blue-600 mb-2">Kontakt</h4>
              <p className="text-gray-700">
                Du hast Fragen oder Feedback? Nimm direkt Kontakt mit uns auf – wir sind für dich da.
              </p>
            </Link>
          </div>
        </div>
        </div>
    </Layout>
  );
};

export default Home;
