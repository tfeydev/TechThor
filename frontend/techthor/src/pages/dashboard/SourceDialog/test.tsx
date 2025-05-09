import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

interface SourceData {
  name: string;
  type: string;
  file_path?: string;
  file_source_type?: "local" | "gdrive" | "onedrive" | "smb";
  delimiter?: string;
  encoding?: string;
  url?: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  db_type?: string;
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  db_name?: string;
  query?: string;
  tables?: string[];
}

interface SourceDialogProps {
  open: boolean;
  onClose: (data: SourceData | null) => void;
  initialData?: SourceData;
  isEdit?: boolean;
}

const typeOptions = ["csv", "json", "api", "database"];
const fileSourceTypeOptions = ["local", "gdrive", "onedrive", "smb"];
const dbTypeOptions = ["mysql", "postgresql", "mongodb"];

const SourceDialog: React.FC<SourceDialogProps> = ({
  open,
  onClose,
  initialData = { name: "", type: "" },
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<SourceData>(initialData);

  useEffect(() => {
    if (open) {
      setFormData(initialData);
    }
  }, [open, initialData]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setFormData((prev) => ({ ...prev, [e.target.name!]: e.target.value as string }));
  };

  const handleJsonChange = (field: "headers" | "params") => (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = JSON.parse(e.target.value);
      setFormData((prev) => ({ ...prev, [field]: value }));
    } catch (error) {
      console.error(`Invalid JSON for ${field}`);
    }
  };

  const handleTablesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, tables: e.target.value.split(", ").filter(Boolean) }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.type) {
      onClose(formData);
    }
  };

  const handleDelete = () => {
    if (isEdit && formData.name) {
      onClose({ name: formData.name, type: formData.type });
    }
  };

  const renderFields = () => {
    switch (formData.type) {
      case "csv":
        return (
          <>
            <TextField
              margin="dense"
              name="file_path"
              label="File Path"
              fullWidth
              value={formData.file_path || ""}
              onChange={handleTextChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>File Source Type</InputLabel>
              <Select
                name="file_source_type"
                value={formData.file_source_type || "local"}
                onChange={handleSelectChange}
              >
                {fileSourceTypeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="delimiter"
              label="Delimiter"
              fullWidth
              value={formData.delimiter || ","}
              onChange={handleTextChange}
            />
            <TextField
              margin="dense"
              name="encoding"
              label="Encoding"
              fullWidth
              value={formData.encoding || "utf-8"}
              onChange={handleTextChange}
            />
          </>
        );
      case "json":
        return (
          <>
            <TextField
              margin="dense"
              name="file_path"
              label="File Path"
              fullWidth
              value={formData.file_path || ""}
              onChange={handleTextChange}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>File Source Type</InputLabel>
              <Select
                name="file_source_type"
                value={formData.file_source_type || "local"}
                onChange={handleSelectChange}
              >
                {fileSourceTypeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="encoding"
              label="Encoding"
              fullWidth
              value={formData.encoding || "utf-8"}
              onChange={handleTextChange}
            />
          </>
        );
      case "api":
        return (
          <>
            <TextField
              margin="dense"
              name="url"
              label="API URL"
              fullWidth
              value={formData.url || ""}
              onChange={handleTextChange}
            />
            <TextField
              margin="dense"
              name="headers"
              label="Headers (JSON)"
              fullWidth
              value={formData.headers ? JSON.stringify(formData.headers) : "{}"}
              onChange={handleJsonChange("headers")}
            />
            <TextField
              margin="dense"
              name="params"
              label="Params (JSON)"
              fullWidth
              value={formData.params ? JSON.stringify(formData.params) : "{}"}
              onChange={handleJsonChange("params")}
            />
          </>
        );
      case "database":
        return (
          <>
            <FormControl fullWidth margin="dense">
              <InputLabel>Database Type</InputLabel>
              <Select
                name="db_type"
                value={formData.db_type || ""}
                onChange={handleSelectChange}
              >
                {dbTypeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="host"
              label="Host"
              fullWidth
              value={formData.host || ""}
              onChange={handleTextChange}
            />
            <TextField
              margin="dense"
              name="port"
              label="Port"
              type="number"
              fullWidth
              value={formData.port || ""}
              onChange={handleTextChange}
            />
            <TextField
              margin="dense"
              name="user"
              label="User"
              fullWidth
              value={formData.user || ""}
              onChange={handleTextChange}
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={formData.password || ""}
              onChange={handleTextChange}
            />
            <TextField
              margin="dense"
              name="db_name"
              label="Database Name"
              fullWidth
              value={formData.db_name || ""}
              onChange={handleTextChange}
            />
            <TextField
              margin="dense"
              name="query"
              label="Query"
              fullWidth
              value={formData.query || ""}
              onChange={handleTextChange}
            />
            <TextField
              margin="dense"
              name="tables"
              label="Tables (comma-separated)"
              fullWidth
              value={formData.tables ? formData.tables.join(", ") : ""}
              onChange={handleTablesChange}
            />
          </>
        );
      default:
        return <div>Select a type to see additional fields</div>;
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(null)} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit Source" : "Add New Source"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Source Name"
          fullWidth
          value={formData.name}
          onChange={handleTextChange}
          disabled={isEdit}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="type-select-label">Source Type</InputLabel>
          <Select
            labelId="type-select-label"
            name="type"
            value={formData.type}
            onChange={handleSelectChange}
            label="Source Type"
          >
            <MenuItem value="">
              <em>Select a type</em>
            </MenuItem>
            {typeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {renderFields()}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)}>Cancel</Button>
        {isEdit && (
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        )}
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SourceDialog;