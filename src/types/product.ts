export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  pages: number;
}

export interface ApiLog {
  id: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  endpoint: string;
  status: number;
  timestamp: Date;
  duration: number;
  requestBody?: ProductFormData | Partial<ProductFormData>;
  responseBody?: unknown;
}

export interface ProductFormData {
  name: string;
  price: number;
  category: string;
}
