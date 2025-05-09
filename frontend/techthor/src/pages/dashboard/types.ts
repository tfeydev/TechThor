// types.ts
export interface SourceData {
  id: number;
  name: string;
  type: string;
  connectionDetails: any;
  
  file_path?: string;
  file_source_type?: string;
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

// Optionen als Konstanten (optional: as const für Typsicherheit)
export const typeOptions = [
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "REST API",
  "CSV",
  "JSON", // falls du Excel drin lassen willst
] as const;

export const fileSourceTypeOptions = [
  "local",
  "gdrive",
  "onedrive",
  "NetDrive",
  "HTTP",
] as const;