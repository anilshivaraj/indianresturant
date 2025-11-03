import Image from "next/image";

interface SummaryItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
}

export default function OrderSummary({
  orderId,
  items,
  total,
}: {
  orderId: string;
  items: SummaryItem[];
  total: number;
}) {
  return (
    <div id="order-summary" className="rounded-xl bg-white/90 p-6 ring-1 ring-[rgba(179,139,44,0.25)]">
      <div className="mb-4">
        <h2 className="heading-serif text-2xl text-[var(--maroon)]">Order Receipt</h2>
        <p className="text-sm text-[var(--coffee)]/80">Order ID: <span className="font-semibold">{orderId}</span></p>
        <p className="text-sm text-[var(--coffee)]/70">Date: {new Date().toLocaleString()}</p>
      </div>
      <div className="divide-y divide-[var(--gold)]/20">
        {items.map((it) => (
          <div key={it.id} className="flex items-center gap-3 py-3">
            <div className="relative h-14 w-16 overflow-hidden rounded">
              <Image src={it.imageUrl} alt={it.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{it.name}</p>
              <p className="text-xs text-[var(--coffee)]/70">Qty: {it.qty}</p>
            </div>
            <div className="font-semibold">₹{it.price * it.qty}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[var(--coffee)]/80">Total</span>
        <span className="text-lg font-semibold">₹{total}</span>
      </div>
    </div>
  );
}


