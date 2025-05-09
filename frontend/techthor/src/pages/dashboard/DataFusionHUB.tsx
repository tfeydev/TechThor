import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const DataFusionHUB = () => {
  return (
    <Layout>
      <div className="w-full py-10 px-4 flex flex-col items-center text-center">
        {/* Titel & Beschreibung */}
        <h1 className="text-3xl font-bold text-blue-600 mb-4">DataFusionHUB</h1>
        <p className="text-gray-700 mb-10 max-w-2xl">
          Willkommen bei deinem zentralen Dashboard.
        </p>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full justify-items-center">
          {/* Card: Data Source Manager */}
          <Link
            to="/dashboard/datafusionhub/data-source-manager"
            className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 w-72"
          >
            <h4 className="text-xl font-semibold text-blue-600 mb-2">Data Source Manager</h4>
            <p className="text-gray-700">
              Verwalte und integriere verschiedene Datenquellen – zentral und effizient.
            </p>
          </Link>

          {/* Card: Data Source Customizing */}
          <Link
            to="/dashboard/datafusionhub/data-source-customizing"
            className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 w-72"
          >
            <h4 className="text-xl font-semibold text-blue-600 mb-2">Data Source Customizing</h4>
            <p className="text-gray-700">
              Normalisierung und Bereitstellung der eingestellten Datenquellen.
            </p>
          </Link>

          {/* Card: Analytics Hub */}
          <Link
            to="/dashboard/datafusionhub/analytics-hub"
            className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 w-72"
          >
            <h4 className="text-xl font-semibold text-blue-600 mb-2">Analytics Hub</h4>
            <p className="text-gray-700">
              Auswertungen, Dashboards und Visualisierungen auf einen Blick.
            </p>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default DataFusionHUB;
