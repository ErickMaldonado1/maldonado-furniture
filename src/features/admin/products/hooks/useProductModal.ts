import { useState } from "react";
import { ModalState } from "../types/product.types";

export function useProductModal() {
  const [modal, setModal] = useState<ModalState>({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  const showModal = (
    type: "success" | "error",
    title: string,
    message: string,
    onConfirm?: () => void
  ) => {
    setModal({
      open: true,
      type,
      title,
      message,
      onConfirm,
    });
  };

  const closeModal = () => {
    const onConfirm = modal.onConfirm;
    setModal((prev) => ({
      ...prev,
      open: false,
      onConfirm: undefined,
    }));

    if (onConfirm) {
      onConfirm();
    }
  };

  return {
    modal,
    showModal,
    closeModal,
  };
}
