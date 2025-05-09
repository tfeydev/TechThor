import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout2 from "../../components/Layout2";
import { Eye, Pencil, Trash } from "lucide-react";
import SourceDialog from "./SourceDialog/SourceDialog";
import { SourceData } from "./types";

const DataSourceManager = () => {
  const [sources, setSources] = useState<SourceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editSource, setEditSource] = useState<SourceData | null>(null);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/sources");
        if (!response.ok) throw new Error("Fehler beim Laden der Datenquellen");
        const data = await response.json();
        setSources(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchSources();
  }, []);

  const handleEdit = (source: SourceData) => {
    setEditSource(source);
    setOpenEditDialog(true);
  };

  const handleDelete = async (source: SourceData) => {
    if (!confirm(`Datenquelle "${source.name}" wirklich löschen?`)) return;

    try {
      const response = await fetch(`http://localhost:8080/api/sources/${source.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Fehler beim Löschen");

      setSources((prev) => prev.filter((s) => s.id !== source.id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDialogClose = async (data: SourceData | null) => {
    if (data) {
      try {
        const method = editSource ? "PUT" : "POST";
        const url = editSource
          ? `http://localhost:8080/api/sources/${encodeURIComponent(editSource.name)}`
          : "http://localhost:8080/api/sources";
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Fehler beim Speichern der Datenquelle");
        const updated = await response.json();
        setSources((prev) =>
          editSource ? prev.map((s) => (s.name === editSource.name ? updated : s)) : [...prev, updated]
        );
      } catch (err) {
        setError((err as Error).message);
      }
    }
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setEditSource(null);
  };

  return (
    <Layout2>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-blue-600">Source Management Dashboard</h2>
          <div className="space-x-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setOpenAddDialog(true)}
            >
              + Add Source
            </button>
            <Link
              to="/dashboard/datafusionhub/data-source-customizing"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 inline-block"
            >
              Customizing
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          {loading ? (
            <p className="text-gray-500">Lade Datenquellen...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : sources.length === 0 ? (
            <p className="text-gray-500">Keine Datenquellen vorhanden.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-t border-gray-200">
                <thead>
                  <tr className="text-sm text-gray-600">
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Typ</th>
                    <th className="py-2 px-4 border-b">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {sources.map((source) => (
                    <tr key={source.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{source.name}</td>
                      <td className="py-2 px-4 border-b">{source.type}</td>
                      <td className="py-2 px-4 border-b space-x-2">
                        <Link
                          to={`/data-preview/${encodeURIComponent(source.id)}`}
                          className="text-blue-600 hover:underline"
                          title="Vorschau"
                        >
                          <Eye className="inline-block w-4 h-4" />
                        </Link>
                        <button onClick={() => handleEdit(source)} title="Bearbeiten">
                          <Pencil className="inline-block w-4 h-4 text-blue-600 hover:scale-110 transition" />
                        </button>
                        <button onClick={() => handleDelete(source)} title="Löschen">
                          <Trash className="inline-block w-4 h-4 text-red-600 hover:scale-110 transition" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <SourceDialog open={openAddDialog} onClose={handleDialogClose} />
      <SourceDialog
        open={openEditDialog}
        onClose={handleDialogClose}
        initialData={editSource ?? { id: 0, name: "", type: "", connectionDetails: "" }}
        isEdit
      />
    </Layout2>
  );
};

export default DataSourceManager;