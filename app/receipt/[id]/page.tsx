"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import OrderSummary from "@/components/OrderSummary";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
}

interface OrderData {
  id: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
}

export default function ReceiptPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [generating, setGenerating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = params.id;
    if (!id) return;
    try {
      const raw = localStorage.getItem("sir_orders_v1");
      const orders = raw ? JSON.parse(raw) : {};
      const o = orders[id] as OrderData | undefined;
      if (!o) {
        router.replace("/menu");
        return;
      }
      setOrder(o);
    } catch {
      router.replace("/menu");
    }
  }, [params.id, router]);

  const downloadPdf = async () => {
    if (!ref.current) return;
    setGenerating(true);
    try {
      const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;
      const x = (pageWidth - imgWidth) / 2;
      const y = 36;
      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save(`order-${order?.id}.pdf`);
    } finally {
      setGenerating(false);
    }
  };

  if (!order) return null;

  return (
    <main className="py-10">
      <h1 className="heading-serif text-3xl md:text-4xl text-[var(--maroon)] mb-6">Thank you for your order!</h1>
      <div ref={ref} className="print:shadow-none">
        <OrderSummary orderId={order.id} items={order.items} total={order.total} />
      </div>
      <div className="mt-6 flex gap-3">
        <button className="btn-primary" onClick={downloadPdf} disabled={generating}>
          {generating ? "Generating…" : "Download PDF"}
        </button>
        <button className="inline-flex items-center justify-center rounded-full px-5 py-2.5 ring-1 ring-[var(--maroon)] text-[var(--maroon)] transition hover:bg-[var(--maroon)] hover:text-white" onClick={() => window.print()}>
          Print
        </button>
      </div>
    </main>
  );
}


