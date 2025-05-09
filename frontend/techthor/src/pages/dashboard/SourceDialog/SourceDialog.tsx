import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { typeOptions, fileSourceTypeOptions, SourceData } from "../types";

interface SourceDialogProps {
  open: boolean;
  onClose: (data: SourceData | null) => void;
  initialData?: SourceData;
  isEdit?: boolean;
}

const SourceDialog: React.FC<SourceDialogProps> = ({
  open,
  onClose,
  initialData,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<SourceData>({
    id: 0,
    name: "",
    type: "",
    connectionDetails: {},
  });

  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setError(null);
      setSnackbarOpen(false);

      if (initialData) {
        setFormData({
          id: initialData.id || 0,
          name: initialData.name || "",
          type: initialData.type || "",
          ...initialData.connectionDetails,
        });
      } else {
        setFormData({
          id: 0,
          name: "",
          type: "",
          connectionDetails: {},
        });
      }
    }
  }, [open, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let normalizedValue = value;
    
    // Normalisiere file_path: Entferne WSL-Präfix und ersetze Backslashes
    if (name === "file_path") {
      // Entferne WSL-Präfix wie //wsl.localhost/Ubuntu/
      normalizedValue = normalizedValue.replace(/^\/\/wsl\.localhost\/[^/]+\//, "/");
      // Ersetze Backslashes durch Forward-Slashes
      normalizedValue = normalizedValue.replace(/\\/g, "/");
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "port"
          ? value === ""
            ? undefined
            : Number(value)
          : normalizedValue,
    }));
  };

  const handleJsonField =
    (name: "headers" | "params") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const parsed = JSON.parse(e.target.value);
        setFormData((prev) => ({ ...prev, [name]: parsed }));
      } catch {
        setError(`Feld "${name}" enthält kein gültiges JSON.`);
        setSnackbarOpen(true);
      }
    };

  const handleArrayField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((t) => t.trim()),
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.type) {
      setError("Name und Typ sind erforderlich.");
      setSnackbarOpen(true);
      return;
    }

    // Validierung der Dateiendung für CSV, JSON und Excel
    if (["CSV", "JSON", "EXCEL"].includes(formData.type.toUpperCase())) {
      const filePath = formData.file_path;
      if (!filePath) {
        setError("Dateipfad ist erforderlich.");
        setSnackbarOpen(true);
        return;
      }
      let expectedExtension;
      switch (formData.type.toUpperCase()) {
        case "CSV":
          expectedExtension = ".csv";
          break;
        case "JSON":
          expectedExtension = ".json";
          break;
        case "EXCEL":
          expectedExtension = [".xlsx", ".xls"];
          break;
        default:
          break;
      }
      if (Array.isArray(expectedExtension)) {
        const hasCorrectExtension = expectedExtension.some((ext) =>
          filePath.toLowerCase().endsWith(ext.toLowerCase())
        );
        if (!hasCorrectExtension) {
          setError(`Dateipfad muss mit ${expectedExtension.join(" oder ")} enden.`);
          setSnackbarOpen(true);
          return;
        }
      } else if (
        expectedExtension &&
        !filePath.toLowerCase().endsWith(expectedExtension.toLowerCase())
      ) {
        setError(`Dateipfad muss mit ${expectedExtension} enden.`);
        setSnackbarOpen(true);
        return;
      }
    }

    const connectionDetails: Record<string, any> = {};
    const addIfExists = (key: keyof SourceData) => {
      if (formData[key] !== undefined) {
        connectionDetails[key] = formData[key];
      }
    };

    switch (formData.type.toLowerCase()) {
      case "csv":
      case "json":
      case "excel":
        ["file_path", "file_source_type", "delimiter", "encoding"].forEach((key) =>
          addIfExists(key as keyof SourceData)
        );
        break;
      case "postgresql":
      case "mysql":
      case "mongodb":
        ["host", "port", "user", "password", "db_name", "query", "tables"].forEach(
          (key) => addIfExists(key as keyof SourceData)
        );
        break;
      case "rest api":
        ["url", "headers", "params"].forEach((key) =>
          addIfExists(key as keyof SourceData)
        );
        break;
    }

    const dataToSend: SourceData = {
      id: formData.id,
      name: formData.name,
      type: formData.type,
      connectionDetails,
    };

    onClose(dataToSend);
  };

  const renderFields = () => {
    switch (formData.type.toLowerCase()) {
      case "csv":
      case "json":
      case "excel":
        return (
          <>
            <TextField
              label="Dateipfad"
              name="file_path"
              fullWidth
              margin="dense"
              value={formData.file_path || ""}
              onChange={handleChange}
            />
            <TextField
              label="Dateiquelle"
              name="file_source_type"
              select
              fullWidth
              margin="dense"
              value={formData.file_source_type || ""}
              onChange={handleChange}
            >
              {fileSourceTypeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Trennzeichen"
              name="delimiter"
              fullWidth
              margin="dense"
              value={formData.delimiter || ""}
              onChange={handleChange}
            />
            <TextField
              label="Encoding"
              name="encoding"
              fullWidth
              margin="dense"
              value={formData.encoding || ""}
              onChange={handleChange}
            />
          </>
        );
      case "rest api":
        return (
          <>
            <TextField
              label="API URL"
              name="url"
              fullWidth
              margin="dense"
              value={formData.url || ""}
              onChange={handleChange}
            />
            <TextField
              label="Headers (JSON)"
              name="headers"
              fullWidth
              margin="dense"
              value={formData.headers ? JSON.stringify(formData.headers) : ""}
              onChange={handleJsonField("headers")}
            />
            <TextField
              label="Parameter (JSON)"
              name="params"
              fullWidth
              margin="dense"
              value={formData.params ? JSON.stringify(formData.params) : ""}
              onChange={handleJsonField("params")}
            />
          </>
        );
      case "postgresql":
      case "mysql":
      case "mongodb":
        return (
          <>
            <TextField
              label="Host"
              name="host"
              fullWidth
              margin="dense"
              value={formData.host || ""}
              onChange={handleChange}
            />
            <TextField
              label="Port"
              name="port"
              type="number"
              fullWidth
              margin="dense"
              value={formData.port ?? ""}
              onChange={handleChange}
            />
            <TextField
              label="Benutzer"
              name="user"
              fullWidth
              margin="dense"
              value={formData.user || ""}
              onChange={handleChange}
            />
            <TextField
              label="Passwort"
              name="password"
              type="password"
              fullWidth
              margin="dense"
              value={formData.password || ""}
              onChange={handleChange}
            />
            <TextField
              label="Datenbankname"
              name="db_name"
              fullWidth
              margin="dense"
              value={formData.db_name || ""}
              onChange={handleChange}
            />
            <TextField
              label="SQL-Abfrage"
              name="query"
              fullWidth
              margin="dense"
              value={formData.query || ""}
              onChange={handleChange}
            />
            <TextField
              label="Tabellen (kommagetrennt)"
              name="tables"
              fullWidth
              margin="dense"
              value={formData.tables?.join(", ") || ""}
              onChange={handleArrayField}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={open} onClose={() => onClose(null)} fullWidth maxWidth="sm">
        <DialogTitle>
          {isEdit ? "Quelle bearbeiten" : "Neue Quelle hinzufügen"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Source Name"
            name="name"
            fullWidth
            margin="dense"
            value={formData.name}
            onChange={handleChange}
            disabled={isEdit}
          />
          <TextField
            label="Source Type"
            name="type"
            select
            fullWidth
            margin="dense"
            value={formData.type}
            onChange={handleChange}
            disabled={isEdit}
          >
            {typeOptions.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          {renderFields()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(null)} color="secondary">
            Abbrechen
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          severity="error"
          onClose={() => setSnackbarOpen(false)}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SourceDialog;