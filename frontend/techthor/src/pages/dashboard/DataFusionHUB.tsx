import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useTranslation } from "react-i18next";

const DataFusionHUB = () => {

  const { t } = useTranslation();

  return (
    <Layout>
      <div className="w-full py-10 px-4 flex flex-col items-center text-center">
        {/* Titel & Beschreibung */}
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{t("datafusionhub.title")}</h1>
        <p className="text-gray-700 mb-10 max-w-2xl">
          {t("datafusionhub.description")}
        </p>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full justify-items-center">
          {/* Card: Data Source Manager */}
          <Link
            to="/dashboard/datafusionhub/data-source-manager"
            className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 w-72"
          >
            <h4 className="text-xl font-semibold text-blue-600 mb-2">{t("datafusionhub.dataSourceManager.title")}</h4>
            <p className="text-gray-700">
              {t("datafusionhub.dataSourceManager.description")}
            </p>
          </Link>

          {/* Card: Data Source Customizing */}
          <Link
            to="/dashboard/datafusionhub/data-source-customizing"
            className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 w-72"
          >
            <h4 className="text-xl font-semibold text-blue-600 mb-2">{t("datafusionhub.dataSourceCustomizing.title")}</h4>
            <p className="text-gray-700">
              {t("datafusionhub.dataSourceCustomizing.description")}
            </p>
          </Link>

          {/* Card: Analytics Hub */}
          <Link
            to="/dashboard/datafusionhub/analytics-hub"
            className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 w-72"
          >
            <h4 className="text-xl font-semibold text-blue-600 mb-2">{t("datafusionhub.analyticsHub.title")}</h4>
            <p className="text-gray-700">
              {t("datafusionhub.analyticsHub.description")}
            </p>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default DataFusionHUB;
