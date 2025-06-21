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
import { PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import type { CreateBatchRequest } from "@/types/batch.types";
import { useCreateBatch } from "../hooks/use-batch";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type InputBatch = Omit<CreateBatchRequest, "product_id">;

function ButtonModalCreateBatch() {
  const [isOpen, setIsOpen] = useState(false);
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputBatch>({
    mode: "onChange",
  });
  const { mutate: createBatch, isPending } = useCreateBatch();

  const onSubmit = (data: InputBatch) => {
    if (!productId) return;
    createBatch(
      {
        ...data,
        product_id: productId,
      },
      {
        onSuccess: () => {
          toast.success("Batch created successfully!");
          reset();
          setIsOpen(false);
          queryClient.invalidateQueries({
            queryKey: ["batches", productId],
          });
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to create batch"
          );
        },
      }
    );
  };

  const onError = () => {
    toast.error("Please fill all required fields correctly");
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="w-4 h-4" />
          Create Batch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogHeader className="mb-4">
            <DialogTitle>Create Batch</DialogTitle>
            <DialogDescription>
              Create a new batch for the product.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mb-4">
            <div className="grid gap-3">
              <Label htmlFor="batch-code">Batch Code</Label>
              <Input
                id="batch-code"
                type="text"
                {...register("batch_code", {
                  required: "Batch code is required",
                  minLength: {
                    value: 3,
                    message: "Batch code must be at least 3 characters",
                  },
                  disabled: isPending,
                })}
                className={errors.batch_code ? "border-red-500" : ""}
              />
              {errors.batch_code && (
                <span className="text-sm text-red-500">
                  {errors.batch_code.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: {
                    value: 1,
                    message: "Quantity must be at least 1",
                  },
                  valueAsNumber: true,
                  disabled: isPending,
                })}
                className={errors.quantity ? "border-red-500" : ""}
              />
              {errors.quantity && (
                <span className="text-sm text-red-500">
                  {errors.quantity.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button id="close-dialog" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ButtonModalCreateBatch;
