import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProductScanRequest } from "@/types/product-scan.type";
import {
  AlertTriangle,
  Camera,
  CheckCircle,
  Eye,
  Hash,
  Loader2,
  Package,
  QrCode,
  RefreshCw,
  Shield,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import QRScanner from "./components/qr-scanner";
import { useProductScan } from "./hooks/use-product-scan";

function ProductScanForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qrCodeParam = searchParams.get("qrCode");
  const [qrCode, setQrCode] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [scanMode] = useState<"qr" | "serial">("serial");
  const [showQRScanner, setShowQRScanner] = useState(false);

  const {
    mutate: scanProduct,
    data: scanResult,
    isPending,
    error,
    isSuccess,
    reset,
  } = useProductScan();

  useEffect(() => {
    if (qrCodeParam) {
      scanProduct({
        qrCode: qrCodeParam,
      });
    }
  }, [qrCodeParam]);

  const handleScanProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const scanData: ProductScanRequest = {};

    if (scanMode === "qr" && qrCode.trim()) {
      scanData.qrCode = qrCode.trim();
    } else if (scanMode === "serial" && serialNumber.trim()) {
      scanData.serialNumber = serialNumber.trim();
    }

    if (scanData.qrCode || scanData.serialNumber) {
      scanProduct(scanData);
    }
  };

  const handleReset = () => {
    setQrCode("");
    setSerialNumber("");
    setSearchParams({});
    reset();
  };

  const handleQRScanResult = (result: string) => {
    setQrCode(result);
    setShowQRScanner(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 transition-all duration-500 hover:scale-110">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Product Authentication
        </h1>
        <p className="text-muted-foreground">
          Verify product authenticity by scanning QR code or entering serial
          number
        </p>
      </div>

      {/* Scan Form - Hidden when there's a successful result */}
      <div
        className={`transition-all duration-700 ease-in-out ${
          (isSuccess && scanResult?.data?.data) || error
            ? "opacity-0 -translate-y-8 pointer-events-none h-0 overflow-hidden"
            : "opacity-100 translate-y-0 pointer-events-auto h-auto"
        }`}
      >
        {/* Scan Mode Toggle */}
        {/* <Card className="transition-all duration-300 hover:shadow-md mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Choose Scan Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant={scanMode === "qr" ? "default" : "outline"}
                onClick={() => setScanMode("qr")}
                className="flex items-center gap-2 h-12 transition-all duration-200 hover:scale-105"
              >
                <QrCode className="w-4 h-4" />
                QR Code
              </Button>
              <Button
                variant={scanMode === "serial" ? "default" : "outline"}
                onClick={() => setScanMode("serial")}
                className="flex items-center gap-2 h-12 transition-all duration-200 hover:scale-105"
              >
                <Hash className="w-4 h-4" />
                Serial Number
              </Button>
            </div>
          </CardContent>
        </Card> */}

        {/* Scan Form */}
        <Card className="transition-all duration-300 hover:shadow-md mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {scanMode === "qr" ? (
                <QrCode className="w-5 h-5" />
              ) : (
                <Hash className="w-5 h-5" />
              )}
              {scanMode === "qr" ? "Scan QR Code" : "Enter Serial Number"}
            </CardTitle>
            <CardDescription>
              {scanMode === "qr"
                ? "Position the QR code within the camera frame or enter manually"
                : "Enter the product serial number to verify authenticity"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleScanProduct} className="space-y-4">
              {scanMode === "qr" ? (
                <div className="space-y-2">
                  <Label htmlFor="qrCode">QR Code</Label>
                  <div className="relative">
                    <Input
                      id="qrCode"
                      placeholder="Enter QR code or scan with camera"
                      value={qrCode}
                      onChange={(e) => setQrCode(e.target.value)}
                      className="pr-10 transition-all duration-200 focus:scale-[1.02]"
                      disabled={isPending}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 transition-all duration-200 hover:scale-110"
                      disabled={isPending}
                      onClick={() => setShowQRScanner(true)}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input
                    id="serialNumber"
                    placeholder="Enter product serial number"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    disabled={isPending}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 h-12 transition-all duration-200 hover:scale-[1.02]"
                  disabled={
                    isPending ||
                    (scanMode === "qr" ? !qrCode.trim() : !serialNumber.trim())
                  }
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Verify Product
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Error State */}
      {error && (
        <Card className="w-full mx-auto border-red-200 bg-gradient-to-br from-red-50 to-red-100/50">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {/* Error Icon with Animation */}
              <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center ring-4 ring-red-50 animate-pulse">
                <AlertTriangle className="h-10 w-10 text-red-600" />
              </div>

              {/* Error Title */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-red-900">
                  Serial Number Invalid
                </h3>
                <p className="text-red-700 text-base max-w-md mx-auto leading-relaxed">
                  We couldn't find a product with this serial number. The code
                  might be incorrect or the product hasn't been registered yet.
                </p>
              </div>

              {/* Error Details Card */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto border border-red-200/50 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="h-5 w-5 text-red-600" />
                  <p className="text-sm font-semibold text-red-800">
                    Common Issues:
                  </p>
                </div>
                <ul className="text-sm text-red-700 space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Serial number entered incorrectly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>QR code is damaged or unreadable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Product not yet registered in system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Temporary server connection issue</span>
                  </li>
                </ul>
              </div>

              {/* Action Suggestions */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-red-800">
                  <RefreshCw className="h-4 w-4" />
                  <p className="text-sm font-medium">
                    Double-check the serial number and try scanning again
                  </p>
                </div>

                {/* Help Text */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-sm mx-auto">
                  <p className="text-xs text-amber-800 font-medium">
                    💡 Need Help?
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Make sure you're scanning the official Carabao product QR
                    code and the lighting is adequate for a clear scan.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 h-12 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-md "
              >
                <Eye className="w-4 h-4 mr-2" />
                Scan Another Product
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Result with Animation */}
      {isSuccess && scanResult?.data?.data && (
        <div className="animate-in slide-in-from-bottom-4 fade-in-0 duration-700 ease-out w-full">
          <Card className="w-full mx-auto bg-slate-900/95 border-emerald-500/20 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 backdrop-blur-sm">
            <CardHeader className="relative px-4 sm:px-6">
              <div className="absolute -top-3 -right-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-emerald-500/50">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
              <CardTitle className="flex items-center gap-2 text-emerald-400 text-lg sm:text-xl">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">Product Verification Success!</span>
              </CardTitle>
              <CardDescription className="text-emerald-300/80 text-sm">
                Product authenticity has been verified successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              {/* Product Info */}
              <div className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-200">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-emerald-500/30 shadow-md mx-auto sm:mx-0 flex-shrink-0">
                  <AvatarImage
                    src={scanResult.data.data.product.imageUrl}
                    alt={scanResult.data.data.product.name}
                  />
                  <AvatarFallback className="bg-slate-800 text-emerald-400">
                    <Package className="w-8 h-8 sm:w-10 sm:h-10" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 w-full text-center sm:text-left">
                  <h3 className="font-bold text-lg sm:text-xl text-white mb-2 break-words">
                    {scanResult.data.data.product.name}
                  </h3>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className="bg-slate-800/50 text-slate-300 border-slate-600 text-xs"
                    >
                      Batch: {scanResult.data.data.batch.batchCode}
                    </Badge>
                  </div>

                  {/* Quick Info Grid - Mobile Responsive */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200">
                      <p className="text-emerald-400 font-medium mb-1 text-center sm:text-left">
                        Serial Number
                      </p>
                      <p className="font-mono text-slate-200 text-xs break-all text-center sm:text-left">
                        {scanResult.data.data.productItem.serialNumber}
                      </p>
                    </div>
                    <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200">
                      <p className="text-emerald-400 font-medium mb-1 text-center sm:text-left">
                        Product Number
                      </p>
                      <p className="font-mono text-slate-200 text-xs break-all text-center sm:text-left">
                        1 / 1000
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-700/50">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full sm:flex-1 h-12 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:shadow-emerald-500/20"
                >
                  <Eye className="w-4 h-4 mr-2 flex-shrink-0" />
                  Scan Another Product
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* QR Scanner Modal */}
      <QRScanner
        isOpen={showQRScanner}
        onScanResult={handleQRScanResult}
        onClose={() => setShowQRScanner(false)}
      />
    </div>
  );
}

export default ProductScanForm;
