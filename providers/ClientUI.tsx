"use client";

import dynamic from "next/dynamic";

const Toaster = dynamic(() => import("sonner").then((mod) => mod.Toaster), {
  ssr: false,
});

const WhatsAppButton = dynamic(
  () => import("@/components/ui/WhatsApp/WhatsAppButton"),
  {
    ssr: false,
  },
);

export default function ClientUI() {
  return (
    <>
      <Toaster position="bottom-right" richColors expand={false} />
      <WhatsAppButton />
    </>
  );
}
