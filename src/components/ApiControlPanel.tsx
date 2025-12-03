import { useState } from 'react';
import { Plus, Search, RefreshCw, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProductFormData } from '@/types/product';
import { toast } from '@/hooks/use-toast';
import { SushiIcon, LetterP } from '@/components/FoodIcons';
import { PinkWave } from '@/components/PinkWave';

interface ApiControlPanelProps {
  onFetchProducts: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => Promise<{ success: boolean; data?: unknown }>;
  onGetProduct: (id: string) => Promise<{ success: boolean; data?: unknown }>;
  onCreateProduct: (data: ProductFormData) => Promise<{ success: boolean; data?: unknown }>;
  onUpdateProduct: (id: string, data: Partial<ProductFormData>) => Promise<{ success: boolean; data?: unknown }>;
  onDeleteProduct: (id: string) => Promise<{ success: boolean; data?: unknown }>;
  loading: boolean;
}

export function ApiControlPanel({
  onFetchProducts,
  onGetProduct,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
  loading,
}: ApiControlPanelProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'read' | 'update' | 'delete'>('create');
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    category: '',
  });
  const [productId, setProductId] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleCreate = async () => {
    if (!formData.name || formData.price <= 0 || !formData.category) {
      toast({
        title: 'Validation Error',
        description: 'Please fill all fields. Price must be greater than 0.',
        variant: 'destructive',
      });
      return;
    }
    const result = await onCreateProduct(formData);
    if (result.success) {
      toast({ title: 'Success', description: 'Product created successfully!' });
      setFormData({ name: '', price: 0, category: '' });
    } else {
      toast({ title: 'Error', description: 'Failed to create product', variant: 'destructive' });
    }
  };

  const handleFetchAll = async () => {
    const params: Record<string, number | string | undefined> = {
      page: filters.page,
      limit: filters.limit,
    };
    if (filters.category) params.category = filters.category;
    if (filters.minPrice) params.minPrice = Number(filters.minPrice);
    if (filters.maxPrice) params.maxPrice = Number(filters.maxPrice);
    await onFetchProducts(params);
  };

  const handleGetOne = async () => {
    if (!productId) {
      toast({ title: 'Error', description: 'Please enter a product ID', variant: 'destructive' });
      return;
    }
    await onGetProduct(productId);
  };

  const handleUpdate = async () => {
    if (!productId) {
      toast({ title: 'Error', description: 'Please enter a product ID', variant: 'destructive' });
      return;
    }
    const updateData: Partial<ProductFormData> = {};
    if (formData.name) updateData.name = formData.name;
    if (formData.price > 0) updateData.price = formData.price;
    if (formData.category) updateData.category = formData.category;

    if (Object.keys(updateData).length === 0) {
      toast({ title: 'Error', description: 'Please fill at least one field to update', variant: 'destructive' });
      return;
    }

    const result = await onUpdateProduct(productId, updateData);
    if (result.success) {
      toast({ title: 'Success', description: 'Product updated successfully!' });
    }
  };

  const handleDelete = async () => {
    if (!productId) {
      toast({ title: 'Error', description: 'Please enter a product ID', variant: 'destructive' });
      return;
    }
    const result = await onDeleteProduct(productId);
    if (result.success) {
      toast({ title: 'Success', description: 'Product deleted successfully!' });
      setProductId('');
    }
  };

  const tabs = [
    { id: 'create' as const, label: 'CREATE', icon: Plus },
    { id: 'read' as const, label: 'READ', icon: Search },
    { id: 'update' as const, label: 'UPDATE', icon: Edit },
    { id: 'delete' as const, label: 'DELETE', icon: Trash2 },
  ];

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="pt-[50px] px-3 pb-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-lg font-bold text-foreground tracking-tight uppercase">API Control</h2>
            <p className="text-xs text-muted-foreground">Product Operations</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 text-xs font-bold tracking-wider transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-foreground bg-primary/10 border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'create' && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider">Product Name</Label>
              <Input
                id="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-2 border-border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="text-xs font-bold uppercase tracking-wider">Price ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="border-2 border-border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider">Category</Label>
              <Input
                id="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="border-2 border-border focus:border-primary"
              />
            </div>
            <Button onClick={handleCreate} disabled={loading} className="w-full bg-foreground text-background hover:bg-foreground/90">
              {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              CREATE PRODUCT
            </Button>
          </div>
        )}

        {activeTab === 'read' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-muted/50 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Fetch All Products</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs uppercase tracking-wider">Page</Label>
                  <Input
                    type="number"
                    value={filters.page}
                    onChange={(e) => setFilters({ ...filters, page: Number(e.target.value) })}
                    className="border-2"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs uppercase tracking-wider">Limit</Label>
                  <Input
                    type="number"
                    value={filters.limit}
                    onChange={(e) => setFilters({ ...filters, limit: Number(e.target.value) })}
                    className="border-2"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs uppercase tracking-wider">Category</Label>
                  <Input
                    placeholder="Filter"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="border-2"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs uppercase tracking-wider">Min Price</Label>
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="border-2"
                  />
                </div>
              </div>
              <Button onClick={handleFetchAll} disabled={loading} className="w-full bg-foreground text-background hover:bg-foreground/90">
                {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Search className="w-4 h-4 mr-2" />}
                FETCH PRODUCTS
              </Button>
            </div>

            <div className="p-4 bg-muted/50 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Fetch Single Product</h3>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">Product ID</Label>
                <Input
                  placeholder="Enter product ID"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="border-2"
                />
              </div>
              <Button onClick={handleGetOne} disabled={loading} variant="outline" className="w-full border-2 border-foreground hover:bg-foreground hover:text-background">
                {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Search className="w-4 h-4 mr-2" />}
                GET PRODUCT
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'update' && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider">Product ID</Label>
              <Input
                placeholder="Enter product ID to update"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="border-2"
              />
            </div>
            <div className="p-4 bg-muted/50 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider">Fields to Update</h3>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">New Name</Label>
                <Input
                  placeholder="New product name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-2"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">New Price</Label>
                <Input
                  type="number"
                  placeholder="New price"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="border-2"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">New Category</Label>
                <Input
                  placeholder="New category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="border-2"
                />
              </div>
            </div>
            <Button onClick={handleUpdate} disabled={loading} className="w-full bg-foreground text-background hover:bg-foreground/90">
              {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              UPDATE PRODUCT
            </Button>
          </div>
        )}

        {activeTab === 'delete' && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider">Product ID</Label>
              <Input
                placeholder="Enter product ID to delete"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="border-2"
              />
            </div>
            <div className="p-4 bg-destructive/5 border-2 border-destructive/20">
              <p className="text-sm text-destructive">
                Warning: This action cannot be undone.
              </p>
            </div>
            <Button onClick={handleDelete} disabled={loading} variant="destructive" className="w-full">
              {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
              DELETE PRODUCT
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
