import ProductScanForm from "@/modules/product-scan/product-scan-form";

function ScanPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <ProductScanForm />
      </div>
    </div>
  );
}

export default ScanPage;
