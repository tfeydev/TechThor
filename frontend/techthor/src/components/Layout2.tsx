import { ReactNode } from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from './LanguageSwitcher'; // Import wie in Layout.tsx
import { useTranslation } from "react-i18next";

const Layout2 = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full min-h-screen bg-white overflow-x-hidden">
      {/* Verblasstes Hintergrund-Banner */}
      <div className="absolute top-0 left-0 w-full h-[300px] opacity-25 z-0">
        <img
          src="/background.jpg"
          alt="Banner"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Inhaltsebene */}
      <div className="relative z-10">
        {/* Navbar */}
        <div className="sticky top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center items-center">
            <nav className="space-x-6 text-center">
              <Link to="/" className="text-black hover:text-blue-500">{t('nav.home')}</Link>

              <div className="inline-block group relative">
                <Link to="/tech" className="text-black hover:text-blue-500 cursor-pointer">{t('nav.tech')}</Link>
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white shadow-lg p-2 rounded-md z-50">
                  <Link to="/tech/mathematik" className="block px-4 py-2 hover:text-blue-500 whitespace-nowrap">{t('nav.math')}</Link>
                  <Link to="/tech/ml" className="block px-4 py-2 hover:text-blue-500 whitespace-nowrap">{t('nav.ml')}</Link>
                  <Link to="/tech/dl" className="block px-4 py-2 hover:text-blue-500 whitespace-nowrap">{t('nav.dl')}</Link>
                  <Link to="/tech/ai" className="block px-4 py-2 hover:text-blue-500 whitespace-nowrap">{t('nav.ai')}</Link>
                </div>
              </div>

              <div className="inline-block group relative">
                <span className="text-black hover:text-blue-500 cursor-pointer">{t('nav.dashboard')}</span>
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white shadow-lg p-2 rounded-md z-50">
                  <Link to="/dashboard/datafusionhub" className="block px-4 py-2 hover:text-blue-500">{t('nav.dfh')}</Link>
                </div>
              </div>

              <Link to="/contact" className="text-black hover:text-blue-500">{t('nav.contact')}</Link>
              <Link to="/about" className="text-black hover:text-blue-500">{t('nav.about')}</Link>

              <div className="inline-block group relative">
                <span className="text-black hover:text-blue-500 cursor-pointer whitespace-nowrap">{t('nav.legal')}</span>
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white shadow-lg p-2 rounded-md z-50">
                  <Link to="/legal/information" className="block px-4 py-2 hover:text-blue-500 whitespace-nowrap">{t('nav.legal_info')}</Link>
                  <Link to="/legal/notice" className="block px-4 py-2 hover:text-blue-500 whitespace-nowrap">{t('nav.legal_notice')}</Link>
                  <Link to="/legal/privacy" className="block px-4 py-2 hover:text-blue-500 whitespace-nowrap">{t('nav.privacy')}</Link>
                </div>
              </div>
            </nav>
            <LanguageSwitcher /> {/* Sprachwechsler wie in Layout.tsx */}
          </div>
        </div>

        {/* Hauptinhalt */}
        <main className="relative z-10 px-6 py-6">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4 mt-12 border-t border-gray-200 relative z-10">
        <p>© {new Date().getFullYear()} TechThor. {t('footer.copyright')}</p>
      </footer>
    </div>
  );
};

export default Layout2;