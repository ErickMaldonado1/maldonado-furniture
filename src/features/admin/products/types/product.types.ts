import { ColorCompany } from "@prisma/client";

export interface ProductColor {
  id: string;
  name: string;
  slug: string | null;
  company: ColorCompany;
  hexCode: string | null;
  imageUrl: string | null;
  publicId: string | null;
}

export interface VariantDimensionForm {
  width: number;
  height: number;
  depth: number;
  thickness: number | null;
  sizeLabel?: string | null;
  price?: number | null;
}

export type TabType = "general" | "attributes" | "images" | "variants";

export interface ModalState {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onConfirm?: () => void;
}
