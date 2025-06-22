import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CreateProductRequest } from "@/types/product.types";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateProduct } from "../hooks/use-product";

type InputProduct = Omit<CreateProductRequest, "id" | "createdAt">;

function ButtonModalCreateProduct() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputProduct>({
    mode: "onChange",
    defaultValues: {
      description: "",
    },
  });
  const { mutate: createProduct, isPending } = useCreateProduct();

  const onSubmit = (data: InputProduct) => {
    createProduct(
      {
        ...data,
        category: "undefined",
      },
      {
        onSuccess: () => {
          toast.success("Product created successfully!");
          reset();
          setIsOpen(false);
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to create product"
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
          Create Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogHeader className="mb-4">
            <DialogTitle>Create Product</DialogTitle>
            <DialogDescription>Create a new product.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mb-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                  disabled: isPending,
                })}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name">Image URL</Label>
              <Input
                id="imageUrl"
                type="text"
                {...register("imageUrl", {
                  required: "Image URL is required",
                  minLength: {
                    value: 3,
                    message: "Image URL must be at least 3 characters",
                  },
                  disabled: isPending,
                })}
                className={errors.imageUrl ? "border-red-500" : ""}
              />
              {errors.imageUrl && (
                <span className="text-sm text-red-500">
                  {errors.imageUrl.message}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name">Description</Label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 3,
                    message: "Description must be at least 3 characters",
                  },
                  disabled: isPending,
                })}
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 3,
                    message: "Image URL must be at least 3 characters",
                  },
                  disabled: isPending,
                })}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <span className="text-sm text-red-500">
                  {errors.description.message}
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

export default ButtonModalCreateProduct;
