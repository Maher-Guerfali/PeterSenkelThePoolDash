import { useState, useCallback } from 'react';
import { ApiLog, Product, ProductsResponse, ProductFormData } from '@/types/product';

const API_BASE = 'https://petersenkelthepool.onrender.com/api';

export function useApi() {
  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });

  const addLog = useCallback((log: Omit<ApiLog, 'id'>) => {
    const newLog: ApiLog = {
      ...log,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setLogs((prev) => [newLog, ...prev].slice(0, 50));
    return newLog;
  }, []);

  const fetchProducts = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      category?: string;
      minPrice?: number;
      maxPrice?: number;
    }) => {
      setLoading(true);
      const startTime = Date.now();
      const queryParams = new URLSearchParams();

      if (params?.page) queryParams.set('page', params.page.toString());
      if (params?.limit) queryParams.set('limit', params.limit.toString());
      if (params?.category) queryParams.set('category', params.category);
      if (params?.minPrice) queryParams.set('minPrice', params.minPrice.toString());
      if (params?.maxPrice) queryParams.set('maxPrice', params.maxPrice.toString());

      const endpoint = `/products${queryParams.toString() ? `?${queryParams}` : ''}`;

      try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        const data: ProductsResponse = await response.json();
        const duration = Date.now() - startTime;

        addLog({
          method: 'GET',
          endpoint,
          status: response.status,
          timestamp: new Date(),
          duration,
          responseBody: data,
        });

        if (response.ok) {
          setProducts(data.data);
          setPagination({
            total: data.total,
            page: data.page,
            pages: data.pages,
          });
        }

        return { success: response.ok, data };
      } catch (error) {
        const duration = Date.now() - startTime;
        addLog({
          method: 'GET',
          endpoint,
          status: 500,
          timestamp: new Date(),
          duration,
          responseBody: { message: 'Network error' },
        });
        return { success: false, error };
      } finally {
        setLoading(false);
      }
    },
    [addLog]
  );

  const getProduct = useCallback(
    async (id: string) => {
      setLoading(true);
      const startTime = Date.now();
      const endpoint = `/products/${id}`;

      try {
        const response = await fetch(`${API_BASE}${endpoint}`);
        const data = await response.json();
        const duration = Date.now() - startTime;

        addLog({
          method: 'GET',
          endpoint,
          status: response.status,
          timestamp: new Date(),
          duration,
          responseBody: data,
        });

        return { success: response.ok, data };
      } catch (error) {
        const duration = Date.now() - startTime;
        addLog({
          method: 'GET',
          endpoint,
          status: 500,
          timestamp: new Date(),
          duration,
          responseBody: { message: 'Network error' },
        });
        return { success: false, error };
      } finally {
        setLoading(false);
      }
    },
    [addLog]
  );

  const createProduct = useCallback(
    async (productData: ProductFormData) => {
      setLoading(true);
      const startTime = Date.now();
      const endpoint = '/products';

      try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        const data = await response.json();
        const duration = Date.now() - startTime;

        addLog({
          method: 'POST',
          endpoint,
          status: response.status,
          timestamp: new Date(),
          duration,
          requestBody: productData,
          responseBody: data,
        });

        if (response.ok) {
          await fetchProducts();
        }

        return { success: response.ok, data };
      } catch (error) {
        const duration = Date.now() - startTime;
        addLog({
          method: 'POST',
          endpoint,
          status: 500,
          timestamp: new Date(),
          duration,
          requestBody: productData,
          responseBody: { message: 'Network error' },
        });
        return { success: false, error };
      } finally {
        setLoading(false);
      }
    },
    [addLog, fetchProducts]
  );

  const updateProduct = useCallback(
    async (id: string, productData: Partial<ProductFormData>) => {
      setLoading(true);
      const startTime = Date.now();
      const endpoint = `/products/${id}`;

      try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        const data = await response.json();
        const duration = Date.now() - startTime;

        addLog({
          method: 'PATCH',
          endpoint,
          status: response.status,
          timestamp: new Date(),
          duration,
          requestBody: productData,
          responseBody: data,
        });

        if (response.ok) {
          await fetchProducts();
        }

        return { success: response.ok, data };
      } catch (error) {
        const duration = Date.now() - startTime;
        addLog({
          method: 'PATCH',
          endpoint,
          status: 500,
          timestamp: new Date(),
          duration,
          requestBody: productData,
          responseBody: { message: 'Network error' },
        });
        return { success: false, error };
      } finally {
        setLoading(false);
      }
    },
    [addLog, fetchProducts]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      setLoading(true);
      const startTime = Date.now();
      const endpoint = `/products/${id}`;

      try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
          method: 'DELETE',
        });
        const data = response.status !== 204 ? await response.json() : null;
        const duration = Date.now() - startTime;

        addLog({
          method: 'DELETE',
          endpoint,
          status: response.status,
          timestamp: new Date(),
          duration,
          responseBody: data || { message: 'Product deleted' },
        });

        if (response.ok) {
          await fetchProducts();
        }

        return { success: response.ok, data };
      } catch (error) {
        const duration = Date.now() - startTime;
        addLog({
          method: 'DELETE',
          endpoint,
          status: 500,
          timestamp: new Date(),
          duration,
          responseBody: { message: 'Network error' },
        });
        return { success: false, error };
      } finally {
        setLoading(false);
      }
    },
    [addLog, fetchProducts]
  );

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return {
    logs,
    products,
    loading,
    pagination,
    fetchProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    clearLogs,
  };
}
