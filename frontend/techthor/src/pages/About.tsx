import Layout2 from "../components/Layout2";
import { useTranslation, Trans } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <Layout2>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
          {t("about.title")}
        </h1>

        <p className="mb-4">{t("about.description1")}</p>

        <p className="mb-4">{t("about.description2")}</p>

        <p className="mb-4">
          <Trans
            i18nKey="about.description3"
            components={{
              strong: <strong />,
              em: <em />
            }}
          />
        </p>

        <p className="mb-4">
          <Trans
            i18nKey="about.description4"
            components={{ strong: <strong /> }}
          />
        </p>

        <div className="text-center mt-6">
          <a
            href="https://www.linkedin.com/in/thorstenfey/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
          >
            {t("about.linkedinButton")}
          </a>
        </div>
      </div>
    </Layout2>
  );
};

export default About;
