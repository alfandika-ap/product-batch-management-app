import type { Batch } from "@/types/batch.types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useDeleteBatch } from "../hooks/use-batch";
import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
type ButtonDeleteBatchProps = {
  batch: Batch;
};

function ButtonDeleteBatch({ batch }: ButtonDeleteBatchProps) {
  const { id } = batch;
  const queryClient = useQueryClient();
  const { mutate: deleteBatch, isPending } = useDeleteBatch();
  const [open, setOpen] = useState(false);

  const handleDeleteBatch = () => {
    deleteBatch(id, {
      onSuccess: () => {
        toast.success("Batch berhasil dihapus!");
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["batches"] });
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Gagal menghapus batch");
      },
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Batch</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Apakah anda yakin ingin menghapus batch{" "}
            <span className="font-bold">{batch.batchCode}</span>?
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleDeleteBatch}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Hapus"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ButtonDeleteBatch;
