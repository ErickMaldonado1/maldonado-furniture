import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage(props: EditProductPageProps) {
  const params = await props.params;
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      images: true,
      variants: {
        include: { dimensions: true },
      },
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      <ProductForm initialData={product} />
    </div>
  );
}
