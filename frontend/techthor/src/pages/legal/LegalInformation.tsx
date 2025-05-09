// src/pages/legal/LegalInformation.tsx
import Layout2 from "../../components/Layout2";
const LegalInformation = () => (
  <Layout2>
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Rechtliche Informationen</h1>
      <p className="mb-4">Hier finden Sie alle wichtigen rechtlichen Informationen zu unserer Website und unseren Dienstleistungen.</p>
      <ul className="list-disc list-inside">
        <li>Verantwortliche Stelle</li>
        <li>Kontaktinformationen</li>
        <li>Rechtliche Grundlagen</li>
      </ul>
    </div>
  </Layout2>
);

export default LegalInformation;
