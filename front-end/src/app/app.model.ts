export interface SelectionState {
  tables: string[];
  selectedFile: string;
}

export interface TableDetails {
  rows?: number;
  columns?: number;
  notes?: string;
}
