import { useState } from 'react';
import { Table, Layers, Package, DollarSign, Calendar, Hash, Trash2, Eye, Edit } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '@/types/product';
import { CroissantIcon, ScriptL, PineappleIcon } from '@/components/FoodIcons';
import { PinkWave } from '@/components/PinkWave';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DataVisualizationProps {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
  onDeleteProduct: (id: string) => Promise<{ success: boolean }>;
  onUpdateProduct: (id: string, data: Partial<Product>) => Promise<{ success: boolean }>;
  loading: boolean;
}

export function DataVisualization({ products, pagination, onDeleteProduct, onUpdateProduct, loading }: DataVisualizationProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editFormData, setEditFormData] = useState({ name: '', price: 0, category: '' });
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      price: product.price,
      category: product.category,
    });
  };

  const handleUpdateSubmit = async () => {
    if (!editingProduct) return;
    await onUpdateProduct(editingProduct._id, editFormData);
    setEditingProduct(null);
  };

  const clusterInfo = {
    name: 'PoolCluster',
    database: 'test',
    collection: 'products',
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ScriptL className="w-8 h-8 text-pink" />
            </div>
            <div>
              <h2 className="text-xl font-black text-foreground tracking-tight uppercase">Data Explorer</h2>
              <p className="text-sm text-muted-foreground">MongoDB Visualization</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
              className={viewMode === 'table' ? 'bg-foreground text-background' : 'border-2'}
            >
              <Table className="w-4 h-4 mr-1" />
              TABLE
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('cards')}
              className={viewMode === 'cards' ? 'bg-foreground text-background' : 'border-2'}
            >
              <Layers className="w-4 h-4 mr-1" />
              CARDS
            </Button>
          </div>
        </div>

        {/* Cluster Info Cards */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'CLUSTER', value: clusterInfo.name, icon: <PineappleIcon className="w-5 h-5 text-pink" /> },
            { label: 'DATABASE', value: clusterInfo.database, icon: <Layers className="w-4 h-4 text-pink" /> },
            { label: 'COLLECTION', value: clusterInfo.collection, icon: <Table className="w-4 h-4 text-pink" /> },
            { label: 'TOTAL DOCS', value: pagination.total.toString(), icon: <Package className="w-4 h-4 text-pink" /> },
          ].map((item, index) => (
            <div
              key={item.label}
              className="p-3 bg-background border-2 border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-2 mb-1">
                {item.icon}
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{item.label}</span>
              </div>
              <p className="text-sm font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
        <PinkWave className="w-full h-6 text-pink mt-4" />
      </div>

      {/* Pagination Info */}
      <div className="px-6 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs uppercase tracking-wider">
          <span className="text-muted-foreground">
            Page <span className="font-bold text-foreground">{pagination.page}</span> of{' '}
            <span className="font-bold text-foreground">{pagination.pages}</span>
          </span>
          <span className="text-muted-foreground">
            <span className="font-bold text-foreground">{products.length}</span> products loaded
          </span>
        </div>
      </div>

      {/* Data Display */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-pink border-t-transparent animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <CroissantIcon className="w-16 h-16 text-pink/30 mb-4" />
              <p className="text-lg font-bold uppercase tracking-wider">No Products Found</p>
              <p className="text-sm">Use the API Control Panel to fetch or create products</p>
            </div>
          ) : viewMode === 'table' ? (
            <div className="border-2 border-border overflow-hidden animate-fade-in">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b-2 border-border">
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Hash className="w-3 h-3" />
                        ID
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Package className="w-3 h-3" />
                        Name
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3 h-3" />
                        Price
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Layers className="w-3 h-3" />
                        Category
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        Created
                      </div>
                    </th>
                    <th className="px-4 py-3 text-right text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.map((product, index) => (
                    <tr
                      key={product._id}
                      className="bg-card hover:bg-muted/30 transition-colors animate-slide-up cursor-pointer group relative"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="px-4 py-3 relative">
                        <span className="absolute bottom-1 left-4 text-[9px] text-muted-foreground/30 group-hover:opacity-0 transition-opacity uppercase tracking-wider">hover</span>
                        <code className="text-xs text-muted-foreground bg-muted px-2 py-1">
                          {product._id.slice(-8)}
                        </code>
                      </td>
                      <td className="px-4 py-3 font-bold text-foreground">{product.name}</td>
                      <td className="px-4 py-3">
                        <span className="text-pink font-bold">${product.price.toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs font-bold bg-primary/10 text-primary border border-primary/30">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedProduct(product)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(product)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteProduct(product._id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className="p-4 bg-background border-2 border-border hover:border-primary transition-all group opacity-0 animate-fade-in cursor-pointer relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute bottom-2 left-2 text-[9px] text-muted-foreground/30 group-hover:opacity-0 transition-opacity uppercase tracking-wider">hover</div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-foreground">
                        {product.name}
                      </h3>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">ID: {product._id.slice(-8)}</span>
                    </div>
                    <span className="text-xl font-bold text-pink">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 text-xs font-bold bg-primary/10 text-primary border border-primary/30">
                      {product.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-2"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      VIEW
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-2"
                      onClick={() => handleEditClick(product)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      EDIT
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => onDeleteProduct(product._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      DELETE
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-md border-2">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 uppercase tracking-wider">
              <Package className="w-5 h-5 text-pink" />
              Product Details
            </DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 border-2 border-border">
                <pre className="text-sm text-foreground overflow-x-auto font-mono">
                  {JSON.stringify(selectedProduct, null, 2)}
                </pre>
              </div>
              <PinkWave className="w-full h-4 text-pink" />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="sm:max-w-md border-2">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 uppercase tracking-wider">
              <Edit className="w-5 h-5 text-pink" />
              Edit Product
            </DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-xs font-bold uppercase tracking-wider">Product Name</Label>
                <Input
                  id="edit-name"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="border-2 border-border focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price" className="text-xs font-bold uppercase tracking-wider">Price ($)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) })}
                  className="border-2 border-border focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category" className="text-xs font-bold uppercase tracking-wider">Category</Label>
                <Input
                  id="edit-category"
                  value={editFormData.category}
                  onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                  className="border-2 border-border focus:border-primary"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-2"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleUpdateSubmit}
                >
                  Update Product
                </Button>
              </div>
              <PinkWave className="w-full h-4 text-pink" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
