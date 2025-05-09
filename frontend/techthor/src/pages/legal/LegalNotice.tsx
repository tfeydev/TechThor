// src/pages/legal/LegalNotice.tsx
import Layout2 from "../../components/Layout2";
const LegalNotice = () => (
  <Layout2>
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Impressum</h1>
      <p className="mb-4">Angaben gemäß § 5 TMG:</p>
      <p className="mb-4">
        Max Mustermann<br />
        Musterstraße 1<br />
        12345 Musterstadt
      </p>
      <p>E-Mail: info@beispiel.de</p>
    </div>
  </Layout2>
);

export default LegalNotice;
