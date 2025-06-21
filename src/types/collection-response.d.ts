export interface CollectionApiResponse {
  meta: Meta;
  data: ApiCollection[];
}

export interface Meta {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiCollection {
  id: number;
  filters: Filters;
  type: number;
  info: Info;
  salesChannelId: number;
  products: null;
}

export interface Filters {
  useOrLogic: boolean;
  filters: Filter[];
}

export interface Filter {
  id: string;
  title: string;
  value: string;
  valueName: string;
  currency: null;
  comparisonType: number;
}

export interface Info {
  id: number;
  name: string;
  description: string;
  url: string;
  langCode: string;
}
