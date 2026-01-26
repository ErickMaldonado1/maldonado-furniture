import ProductForm from "@/components/admin/ProductForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      images: true,
      variants: {
        include: { dimensions: true },
      },
    },
  });

  if (!product) notFound();

  return (
    <div className="max-w-6xl mx-auto">
      <ProductForm initialData={product} />
    </div>
  );
}
