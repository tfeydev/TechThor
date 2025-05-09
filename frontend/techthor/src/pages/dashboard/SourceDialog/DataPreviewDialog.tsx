import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SourceData } from "../types";

const DataPreviewDialog = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [source, setSource] = useState<SourceData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSource = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/sources/${encodeURIComponent(name!)}`);
        if (!response.ok) throw new Error("Fehler beim Laden der Vorschau");
        const data = await response.json();
        setSource(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchSource();
  }, [name]);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Dialog open={true} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Vorschau: {source?.name || "Unbekannt"}
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {error ? (
          <DialogContentText color="error">{error}</DialogContentText>
        ) : source ? (
          <>
            <p><strong>Typ:</strong> {source.type}</p>
            <p><strong>Verbindungsdetails:</strong></p>
            <pre
              style={{
                backgroundColor: "#f5f5f5",
                padding: "8px",
                borderRadius: "4px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontSize: "0.875rem",
              }}
            >
              {typeof source.connectionDetails === "object"
                ? JSON.stringify(source.connectionDetails, null, 2)
                : source.connectionDetails}
            </pre>
          </>
        ) : (
          <DialogContentText>Lade Daten...</DialogContentText>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DataPreviewDialog;
