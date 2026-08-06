"use client";

import { useMountedTheme } from "@/hooks/useMountedTheme";
import { Product } from "@/lib/types";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { FiEdit2 } from "react-icons/fi";

interface ProductEditModalProps {
  product: Product;
}

export function ProductEditModal({ product }: ProductEditModalProps) {
  const { isDark } = useMountedTheme();
  const primary = isDark ? "#60A5FA" : "#025395";

  return (
    <Modal>
      {/* ✅ কোনো custom onClick দরকার নেই — HeroUI-এর Modal নিজেই এই বাটনের
          click দিয়ে open state টগল করে। আগে এখানে "hendelEdit(product._id)"
          কল করা হতো যেটা product undefined থাকায় crash করত এবং modal-এর
          নিজের open logic পর্যন্ত পৌঁছাতেই পারত না। */}
      <Button
        className="p-2 rounded-lg transition-colors"
        style={{ color: primary }}
        aria-label="Edit product"
      >
        <FiEdit2 className="w-4 h-4" />
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Product</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Update the details for <strong>{product.productName}</strong>.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4">
                  <TextField
                    className="w-full"
                    name="productName"
                    type="text"
                    variant="secondary"
                    defaultValue={product.productName}
                  >
                    <Label>Product Name</Label>
                    <Input />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="brand"
                    type="text"
                    variant="secondary"
                    defaultValue={product.brand}
                  >
                    <Label>Brand</Label>
                    <Input />
                  </TextField>
                  <TextField
                    className="w-full"
                    name="stockLevel"
                    type="number"
                    variant="secondary"
                    defaultValue={String(product.stockLevel)}
                  >
                    <Label>Stock Level</Label>
                    <Input />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close">Save Changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
