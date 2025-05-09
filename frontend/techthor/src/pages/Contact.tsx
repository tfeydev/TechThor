import Layout2 from "../components/Layout2";

const Contact = () => {
  return (
    <Layout2>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="bg-white shadow-lg rounded-2xl p-12 max-w-md w-full text-center border border-gray-200">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Kontakt</h1>
          <p className="text-gray-700 mb-2">
            Kontaktiere uns gerne für weitere Informationen oder Kooperationen.
          </p>
          <p className="text-sm text-gray-500">E-Mail: contact@techthor.com.br</p>
        </div>
      </div>
    </Layout2>
  );
};

export default Contact;
