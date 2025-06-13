import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
type ModalQrDetailProps = {
  trigger: React.ReactNode;
  qrCode: string;
};

function ModalQrDetail({ trigger, qrCode }: ModalQrDetailProps) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>QR Code Detail</DialogTitle>
          <DialogDescription className="pt-3">
            <img src={qrCode} alt="QR Code" className="w-full h-full" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ModalQrDetail;
