export interface TableColumn {
  field: string;
  header: string;
}

export interface TableConfig {
  id: string;
  columns: TableColumn[];
  paginator?: boolean;
  rows?: number;
}

export interface CardConfig {
  title?: string;
  subtitle?: string;
  content?: string;
}

export interface ButtonConfig {
  label: string;
  icon?: string;
  styleClass?: string;
}

export interface DataListConfig {
  id: string;
  itemComponent: string;
  gridClass?: string;
}

export interface GridLayoutConfig {
  columns: string;
  gap?: string;
}

export type ComponentConfig =
  | TableConfig
  | CardConfig
  | ButtonConfig
  | DataListConfig
  | GridLayoutConfig
  | any;
