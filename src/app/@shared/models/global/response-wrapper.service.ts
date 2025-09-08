export interface PaginationResponse<D> {
  status: string;
  reason: string;
  page: number;
  total_pages: number;
  total_items: number;
  data: D;
  asset_id: string;
}

export interface GetResponse<D> {
  status: string;
  reason: string;
  total_items: number;
  data: D;
  asset_id: string;
}

export interface PostResponse<D> {
  status: string;
  reason: string;
  total_items: number;
  data: D;
  asset_id: string;
}

export interface PutResponse<D> {
  status: string;
  reason: string;
  total_items: number;
  data: D;
  asset_id: string;
}

export interface DeleteResponse {
  status: string;
  reason: string;
  data: null;
  asset_id: string;
}

export interface ErrorResponse {
  status: string;
  reason: string;
  data: any;
  asset_id: string;
}
