import Layout2 from "../components/Layout2";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <Layout2>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="bg-white shadow-lg rounded-2xl p-12 max-w-md w-full text-center border border-gray-200">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">{t('contact.title')}</h1>
          <p className="text-gray-700 mb-2">
            {t('contact.message')}
          </p>
          <p className="text-sm text-gray-500">{t('contact.email')}</p>
        </div>
      </div>
    </Layout2>
  );
};

export default Contact;