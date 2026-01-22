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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Editando: {product.name}</h1>
      <p className="bg-yellow-100 p-4 rounded text-yellow-800"></p>
    </div>
  );
}
