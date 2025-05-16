import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useTranslation } from "react-i18next";

const Home = () => {

  const { t } = useTranslation();

  return (
    <Layout>
        {/* Begrüßung / Intro */}
        <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        {t("home.title")}
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
              <h4 className="text-xl font-semibold text-blue-600 mb-2">{t("home.tech.title")}</h4>
              <p className="text-gray-700">
                {t("home.tech.description")}
              </p>
            </Link>

            {/* DataFusionHUB */}
            <Link to="/dashboard/datafusionhub" className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <h4 className="text-xl font-semibold text-blue-600 mb-2">{t("home.datafusionhub.title")}</h4>
              <p className="text-gray-700">
                {t("home.datafusionhub.description")}
              </p>
            </Link>

            {/* Kontakt */}
            <Link to="/contact" className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <h4 className="text-xl font-semibold text-blue-600 mb-2">{t("home.contact.title")}</h4>
              <p className="text-gray-700">
                {t("home.contact.description")}
              </p>
            </Link>
          </div>
        </div>
        </div>
    </Layout>
  );
};

export default Home;
