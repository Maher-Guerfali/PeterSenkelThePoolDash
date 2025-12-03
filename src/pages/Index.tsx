import { useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { ApiControlPanel } from '@/components/ApiControlPanel';
import { ApiLogPanel } from '@/components/ApiLogPanel';
import { DataVisualization } from '@/components/DataVisualization';
import { PineappleIcon, SushiIcon } from '@/components/FoodIcons';
import { PinkWave } from '@/components/PinkWave';
import { FloatingLogo } from '@/components/FloatingLogo';
import { DashedBorder } from '@/components/DashedBorder';

const Index = () => {
  const {
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
  } = useApi();

  useEffect(() => {
    fetchProducts({ page: 1, limit: 10 });
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <FloatingLogo />
            <div>
              <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">
                The Pool <span className="text-pink">API Explorer</span>
              </h1>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Product Management Dashboard By <span className="font-semibold">Maher Guerfali</span></p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <PinkWave className="w-20 h-5 text-pink hidden md:block" />
            <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 border-2 border-success/30">
              <div className="w-2 h-2 bg-success animate-pulse" />
              <span className="text-xs font-bold text-success uppercase tracking-wider">Connected</span>
            </div>
            <a
              href="https://petersenkelthepool.onrender.com/api-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-pink text-white text-xs font-bold uppercase tracking-wider border-2 border-pink hover:bg-pink/80 transition-colors"
            >
              Open Swagger
            </a>
            <code className="text-xs text-muted-foreground bg-muted px-3 py-1.5 border-2 border-border hidden lg:block">
              petersenkelthepool.onrender.com
            </code>
          </div>
        </div>
        <DashedBorder />
      </header>

      {/* Main Content */}
      <main className="pt-20 h-screen flex">
        {/* Left Panel - API Controls & Logs */}
        <div className="w-1/2 h-full flex flex-col">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* API Control Panel */}
            <div className="h-[55%] overflow-hidden animate-slide-in-left">
              <ApiControlPanel
                onFetchProducts={fetchProducts}
                onGetProduct={getProduct}
                onCreateProduct={createProduct}
                onUpdateProduct={updateProduct}
                onDeleteProduct={deleteProduct}
                loading={loading}
              />
            </div>

            <DashedBorder />

            {/* API Logs */}
            <div className="h-[45%] p-4 overflow-hidden animate-slide-in-left stagger-2">
              <ApiLogPanel logs={logs} onClearLogs={clearLogs} />
            </div>
          </div>
        </div>

        <DashedBorder orientation="vertical" />

        {/* Right Panel - Data Visualization */}
        <div className="w-1/2 h-full overflow-hidden animate-slide-in-right">
          <DataVisualization
            products={products}
            pagination={pagination}
            onDeleteProduct={deleteProduct}
            onUpdateProduct={updateProduct}
            loading={loading}
          />
        </div>
      </main>

      {/* Footer decoration */}
      <div className="fixed bottom-4 left-8 flex items-center gap-2 text-muted-foreground">
        <span className="text-xs font-bold uppercase tracking-wider">01</span>
        <div className="w-8 h-0.5 bg-border" />
        <span className="text-xs font-bold uppercase tracking-wider">10</span>
      </div>
    </div>
  );
};

export default Index;
