export type ProductScanRequest = {
  qrCode?: string;
  serialNumber?: string;
};

export type ProductScanResponse = {
  product: {
    name: string;
    imageUrl: string;
  };
  batch: {
    batchCode: string;
  };
  productItem: {
    id: number;
    batchId: number;
    qrCode: string;
    serialNumber: string;
    status: string;
    firstScanAt: string | null;
    scanCount: number;
    createdAt: string;
  };
};

