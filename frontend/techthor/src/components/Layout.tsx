// src/components/Layout.tsx
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <div className="sticky top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center items-center">
          <nav className="space-x-6 text-center">
            <Link to="/" className="text-black hover:text-blue-500">Home</Link>

            <div className="inline-block group relative">
              <Link to="/tech" className="text-black hover:text-blue-500 cursor-pointer">Tech</Link>
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white shadow-lg p-2 rounded-md z-50">
                <Link to="/tech/mathematik" className="block px-4 py-2 hover:text-blue-500 whitespace-nowrap">Mathematik</Link>
                <Link to="/tech/ml" className="block px-4 py-2 hover:text-blue-500 whitespace-nowrap">Machine Learning</Link>
                <Link to="/tech/dl" className="block px-4 py-2 hover:text-blue-500 whitespace-nowrap">Deep Learning</Link>
                <Link to="/tech/ai" className="block px-4 py-2 hover:text-blue-500 whitespace-nowrap">Artificial Intelligence</Link>
              </div>
            </div>

            <div className="inline-block group relative">
              <span className="text-black hover:text-blue-500 cursor-pointer">Dashboard</span>
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white shadow-lg p-2 rounded-md z-50">
                <Link to="/dashboard/datafusionhub" className="block px-4 py-2 hover:text-blue-500">DataFusionHUB</Link>
              </div>
            </div>

            <Link to="/contact" className="text-black hover:text-blue-500">Kontakt</Link>
            <Link to="/about" className="text-black hover:text-blue-500">Über mich</Link>

            <div className="inline-block group relative">
              <span className="text-black hover:text-blue-500 cursor-pointer whitespace-nowrap">Rechtliches</span>
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white shadow-lg p-2 rounded-md z-50">
                <Link to="/legal/information" className="block px-4 py-2 hover:text-blue-500 whitespace-nowrap">Information</Link>
                <Link to="/legal/notice" className="block px-4 py-2 hover:text-blue-500 whitespace-nowrap">Impressum</Link>
                <Link to="/legal/privacy" className="block px-4 py-2 hover:text-blue-500 whitespace-nowrap">Datenschutz</Link>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Banner auf Hauptseiten */}
      {["/", "/tech", "/dashboard/datafusionhub", "/contact"].includes(window.location.pathname) && (
        <div className="w-full">
          <img
            src="/background.jpg"
            alt="Banner"
            className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover object-[center_30%]"
          />
        </div>
      )}

      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4 mt-12 border-t border-gray-200 relative z-10">
        <p>&copy; {new Date().getFullYear()} TechThor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
