// src/pages/Tech.tsx
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useTranslation } from "react-i18next";

const Tech = () => {

  const { t } = useTranslation();

  return (
    <Layout>
    <div className="w-full min-h-screen bg-white">
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          {t("tech.title")}
        </h1>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-200">
          {/* Card: Mathematik */}
          <Link to="/tech/mathematik" className="min-w-[250px] max-w-xs bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-600">{t("tech.mathematics.title")}</h2>
              <p className="text-sm text-gray-600 mt-2">
                {t("tech.mathematics.description")}
              </p>
            </div>
          </Link>

          {/* Card: ML */}
          <Link to="/tech/ml" className="min-w-[250px] max-w-xs bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-600">{t("tech.machineLearning.title")}</h2>
              <p className="text-sm text-gray-600 mt-2">
                {t("tech.machineLearning.description")}
              </p>
            </div>
          </Link>

          {/* Card: DL */}
          <Link to="/tech/dl" className="min-w-[250px] max-w-xs bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-600">{t("tech.deepLearning.title")}</h2>
              <p className="text-sm text-gray-600 mt-2">
                {t("tech.deepLearning.description")}
              </p>
            </div>
          </Link>

          {/* Card: AI */}
          <Link to="/tech/ai" className="min-w-[250px] max-w-xs bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-600">{t("tech.artificialIntelligence.title")}</h2>
              <p className="text-sm text-gray-600 mt-2">
                {t("tech.artificialIntelligence.description")}
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
