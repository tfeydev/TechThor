import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  TextField,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import UndoIcon from "@mui/icons-material/Undo";
import SaveIcon from "@mui/icons-material/Save";
import Layout2 from "../../components/Layout2";

interface SourceData {
  id: number;
  name: string;
  type: string;
}

interface DataPreview {
  rows: Array<Record<string, any>>;
  columns: Record<string, { count: number; nullCount: number; type: string; uniqueValues?: any[] }>;
}

interface NormalizationConfig {
  [column: string]: { action: string; value?: any };
}

const DataSourceCustomizing = () => {
  const [sources, setSources] = useState<SourceData[]>([]);
  const [selectedSourceId, setSelectedSourceId] = useState<number | null>(null);
  const [dataPreview, setDataPreview] = useState<DataPreview | null>(null);
  const [config, setConfig] = useState<NormalizationConfig>({});
  const [prevConfig, setPrevConfig] = useState<NormalizationConfig[]>([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/sources");
        if (!response.ok) throw new Error("Fehler beim Laden der Datenquellen");
        const data = await response.json();
        setSources(data);
      } catch (err) {
        setError("Fehler beim Laden der Quellen: " + (err as Error).message);
        setSnackbarOpen(true);
      }
    };
    fetchSources();
  }, []);

  useEffect(() => {
    if (selectedSourceId == null) return;
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/analyze/${selectedSourceId}?limit=100`);
        if (!response.ok) throw new Error(`Datenquelle mit ID ${selectedSourceId} nicht gefunden`);
        const data = await response.json();
        setDataPreview(data);
        setConfig({});
        setPrevConfig([]);
      } catch (err) {
        setError("Fehler beim Laden der Daten: " + (err as Error).message);
        setDataPreview(null);
        setSnackbarOpen(true);
      }
    };
    fetchData();
  }, [selectedSourceId]);

  const normalizationOptions = [
    { value: "none", label: "Keine Normalisierung", tooltip: "Belässt die Daten unverändert" },
    { value: "replaceNull", label: "Leerwerte ersetzen", tooltip: "Ersetzt NULL-Werte durch 'unbekannt'" },
    { value: "toLowerCase", label: "In Kleinbuchstaben", tooltip: "Konvertiert Text in Kleinbuchstaben" },
    { value: "toUpperCase", label: "In Großbuchstaben", tooltip: "Konvertiert Text in Großbuchstaben" },
    { value: "trim", label: "Leerzeichen entfernen", tooltip: "Entfernt führende und nachfolgende Leerzeichen" },
    { value: "formatDate", label: "Datum formatieren (YYYY-MM-DD)", tooltip: "Formatiert Daten ins Format YYYY-MM-DD" },
  ];

  const handleConfigChange = (column: string, action: string) => {
    setPrevConfig([...prevConfig, { ...config }]);
    setConfig((prev) => ({
      ...prev,
      [column]: { action },
    }));
  };

  const applyNormalization = (value: any, action: string): any => {
    if (value == null && action === "replaceNull") return "unbekannt";
    if (typeof value === "string") {
      switch (action) {
        case "toLowerCase":
          return value.toLowerCase();
        case "toUpperCase":
          return value.toUpperCase();
        case "trim":
          return value.trim();
        case "formatDate":
          try {
            return new Date(value).toISOString().split("T")[0];
          } catch {
            return value;
          }
        default:
          return value;
      }
    }
    return value;
  };

  const handleUndo = () => {
    if (prevConfig.length > 0) {
      setConfig(prevConfig[prevConfig.length - 1]);
      setPrevConfig(prevConfig.slice(0, -1));
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "normalization-config.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedConfig = JSON.parse(e.target?.result as string);
          setPrevConfig([...prevConfig, { ...config }]);
          setConfig(importedConfig);
        } catch {
          setError("Ungültige Konfigurationsdatei.");
          setSnackbarOpen(true);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedSourceId) {
      setError("Keine Quelle ausgewählt.");
      setSnackbarOpen(true);
      return;
    }
    if (Object.keys(config).length === 0) {
      setError("Bitte wählen Sie mindestens eine Normalisierungsregel.");
      setSnackbarOpen(true);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/save-normalization/${selectedSourceId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!response.ok) throw new Error("Fehler beim Speichern");
      setError("Normalisierung erfolgreich gespeichert.");
      setSnackbarOpen(true);
    } catch (err) {
      setError("Fehler beim Speichern der Normalisierung: " + (err as Error).message);
      setSnackbarOpen(true);
    }
  };

  return (
    <Layout2>
      <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        <Box
          sx={{
            width: "250px",
            bgcolor: "#f5f5f5",
            p: 2,
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" color="primary" gutterBottom>
            Datenquellen
          </Typography>
          <List>
            {sources.map((source) => (
              <ListItem key={source.id} disablePadding>
                <ListItemButton
                  onClick={() => setSelectedSourceId(source.id)}
                  selected={selectedSourceId === source.id}
                  sx={{
                    borderRadius: "4px",
                    "&.Mui-selected": {
                      bgcolor: "#e3f2fd",
                      "&:hover": { bgcolor: "#bbdefb" },
                    },
                    "&:hover": { bgcolor: "#f0f0f0" },
                  }}
                >
                  <ListItemText
                    primary={source.name}
                    secondary={source.type}
                    primaryTypographyProps={{ fontWeight: "medium" }}
                    secondaryTypographyProps={{ color: "text.secondary" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ flex: 1, p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" gutterBottom>
              Data Source Customizing
            </Typography>
            <Button
              component={Link}
              to="/dashboard/datafusionhub/data-source-manager"
              variant="outlined"
              color="primary"
            >
              Zurück zum Data Source Manager
            </Button>
          </Box>
          {selectedSourceId == null || !dataPreview ? (
            <Typography color="text.secondary">
              {selectedSourceId == null ? "Bitte wählen Sie eine Datenquelle aus." : "Daten konnten nicht geladen werden."}
            </Typography>
          ) : (
            <>
              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                Normalisierung für {sources.find((s) => s.id === selectedSourceId)?.name}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                  label="Spalten filtern"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  size="small"
                  sx={{ flex: 1, maxWidth: "300px" }}
                />
                <Tooltip title="Letzte Änderung rückgängig machen">
                  <span>
                    <IconButton onClick={handleUndo} disabled={prevConfig.length === 0}>
                      <UndoIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Normalisierungskonfiguration exportieren">
                  <Button variant="outlined" startIcon={<SaveIcon />} onClick={handleExport}>
                    Export
                  </Button>
                </Tooltip>
                <Tooltip title="Normalisierungskonfiguration importieren">
                  <Button variant="outlined" component="label">
                    Import
                    <input type="file" accept=".json" hidden onChange={handleImport} />
                  </Button>
                </Tooltip>
              </Box>
              <Box sx={{ bgcolor: "white", borderRadius: 2, boxShadow: 1, p: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {Object.keys(dataPreview.columns || {})
                        .filter((col) => col.toLowerCase().includes(filter.toLowerCase()))
                        .map((column) => (
                          <TableCell key={column}>
                            {column}
                            <br />
                            <Select
                              value={config[column]?.action || "none"}
                              onChange={(e) => handleConfigChange(column, e.target.value)}
                              size="small"
                            >
                              {normalizationOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                            <br />
                            <Typography variant="caption" color="text.secondary">
                              Typ: {dataPreview.columns[column]?.type || "Unbekannt"}, Null:{" "}
                              {dataPreview.columns[column]?.nullCount || 0}
                            </Typography>
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataPreview.rows.slice(0, 10).map((row, index) => (
                      <TableRow key={index}>
                        {Object.keys(dataPreview.columns || {})
                          .filter((col) => col.toLowerCase().includes(filter.toLowerCase()))
                          .map((column) => (
                            <TableCell key={column}>
                              {applyNormalization(row[column], config[column]?.action || "none")}
                            </TableCell>
                          ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
              >
                Normalisierung speichern
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          severity={error?.includes("Fehler") ? "error" : "success"}
          onClose={() => setSnackbarOpen(false)}
        >
          {error}
        </Alert>
      </Snackbar>
    </Layout2>
  );
};

export default DataSourceCustomizing;