import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Scan, Upload, X } from "lucide-react";

interface QRScannerProps {
  onScanResult: (qrCode: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

function QRScanner({ onScanResult, onClose, isOpen }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartScan = async () => {
    setIsScanning(true);
    setError(null);

    try {
      // Placeholder for actual camera integration
      // In a real implementation, you would use libraries like:
      // - @zxing/library for QR scanning
      // - react-qr-reader
      // - html5-qrcode

      setTimeout(() => {
        // Simulate scan result for demo
        onScanResult("DEMO_QR_CODE_12345");
        setIsScanning(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError("Failed to access camera. Please check permissions.");
      setIsScanning(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Placeholder for QR code reading from image
      // In real implementation, you would process the image here
      const reader = new FileReader();
      reader.onload = () => {
        // Simulate QR code extraction from image
        onScanResult("UPLOADED_QR_CODE_67890");
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-0 duration-300">
      <Card className="w-full max-w-md animate-in slide-in-from-bottom-4 duration-500 shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              QR Scanner
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:scale-110 transition-transform duration-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription>
            Scan QR code using your camera or upload an image
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Camera Scanner */}
          <div className="space-y-3">
            <div className="aspect-square bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-600 flex items-center justify-center">
              {isScanning ? (
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-slate-300">Scanning...</p>
                  <Badge
                    variant="outline"
                    className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  >
                    Point camera at QR code
                  </Badge>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <Camera className="w-12 h-12 text-slate-400 mx-auto" />
                  <p className="text-sm text-slate-400">
                    Camera preview will appear here
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={handleStartScan}
              disabled={isScanning}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700"
            >
              <Scan className="w-4 h-4 mr-2" />
              {isScanning ? "Scanning..." : "Start Camera Scan"}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <label htmlFor="qr-upload" className="block">
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors cursor-pointer bg-slate-800/30 hover:bg-slate-700/30">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-300">Upload QR code image</p>
                <p className="text-xs text-slate-400 mt-1">
                  PNG, JPG up to 10MB
                </p>
              </div>
              <input
                id="qr-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QRScanner;
