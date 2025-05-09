// src/pages/About.tsx
import Layout2 from "../components/Layout2";

const About = () => {
  return (
    <Layout2>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">Über mich</h1>
        
        <p className="mb-4">
          Ich bin ein IT-Experte mit langjähriger internationaler Erfahrung in den Bereichen technischer Support, IT-Beratung und Softwareentwicklung, In meiner Laufbahn habe ich mit zahlreichen Unternehmen zusammengearbeitet und dabei ein breites technisches Wissen aufgebaut – von komplexen Systemlandschaften bis hin zu effizientem Infrastrukturmanagement.
        </p>

        <p className="mb-4">
          Besonders vertraut bin ich mit Technologien wie Java, JavaScript, Python, SQL und SAP sowie mit den Betriebssystemen Linux und Windows. Neben der Entwicklung liegt mein Fokus auf der Analyse und Optimierung von Prozessen, um stabile und leistungsfähige Lösungen zu schaffen.
        </p>

        <p className="mb-4">
          Mich faszinieren die Themen, die auch auf dieser Plattform im Bereich <strong>Tech</strong> behandelt werden – etwa Mathematik, Machine Learning oder Künstliche Intelligenz. Gleichzeitig arbeite ich gerne auch an praktischen Aufgaben wie <em>Data Entry</em>, <em>Voice Recording</em> und <em>Übersetzungen</em>. 
        </p>

        <p className="mb-4">
          Aus dieser Vielseitigkeit heraus ist das Projekt <strong>DataFusionHUB</strong> entstanden: Eine Plattform, die zunächst statisch beginnt, aber perspektivisch das Ziel verfolgt, verschiedene Datenquellen intelligent zu verknüpfen, zu normalisieren und weiterzuverarbeiten.
        </p>

        <div className="text-center mt-6">
          <a
            href="https://www.linkedin.com/in/thorstenfey/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
          >
            Mein LinkedIn-Profil ansehen
          </a>
        </div>
      </div>
    </Layout2>
  );
};

export default About;
