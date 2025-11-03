"use client";

import Image from "next/image";
import { useCart } from "@/app/providers";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, updateQty, remove, total, orderId, clear } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    if (!items.length) return;
    const id = orderId ?? String(Math.floor(10000 + Math.random() * 90000));
    const order = {
      id,
      items,
      total: total(),
      createdAt: new Date().toISOString(),
    };
    try {
      const raw = localStorage.getItem("sir_orders_v1");
      const orders = raw ? JSON.parse(raw) : {};
      orders[id] = order;
      localStorage.setItem("sir_orders_v1", JSON.stringify(orders));
    } catch {}
    clear();
    router.push(`/receipt/${id}`);
  };

  return (
    <main className="py-10">
      <h1 className="heading-serif text-3xl md:text-4xl text-[var(--maroon)] mb-6">Your Cart</h1>
      <p className="mb-4 text-sm text-[var(--coffee)]/80">Order ID: <span className="font-semibold">{orderId ?? "— will be generated when you add an item"}</span></p>
      {items.length === 0 ? (
        <p>Your cart is empty. Browse the menu to add items.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((it) => (
              <div key={it.id} className="flex items-center gap-4 rounded-xl border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] bg-white/80 p-3">
                <div className="relative h-20 w-24 overflow-hidden rounded-lg">
                  <Image src={it.imageUrl} alt={it.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold heading-serif text-[var(--maroon)]">{it.name}</p>
                      <p className="text-sm text-[var(--coffee)]/80">₹{it.price}</p>
                    </div>
                    <button onClick={() => remove(it.id)} className="text-[var(--maroon)]/70 hover:text-[var(--maroon)]">Remove</button>
                  </div>
                  <div className="mt-2 inline-flex items-center rounded-full border border-[var(--gold)]/30">
                    <button className="px-3 py-1" onClick={() => updateQty(it.id, it.qty - 1)}>-</button>
                    <input
                      type="number"
                      className="w-12 appearance-none bg-transparent text-center"
                      value={it.qty}
                      onChange={(e) => updateQty(it.id, Number(e.target.value) || 1)}
                      min={1}
                    />
                    <button className="px-3 py-1" onClick={() => updateQty(it.id, it.qty + 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="space-y-4 rounded-xl border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] bg-white/80 p-4 h-fit">
            <h2 className="heading-serif text-xl text-[var(--maroon)]">Summary</h2>
            <div className="flex items-center justify-between">
              <span className="text-[var(--coffee)]/80">Total</span>
              <span className="text-lg font-semibold">₹{total()}</span>
            </div>
            <button className="w-full btn-primary" onClick={handleCheckout}>
              Place Order
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}


