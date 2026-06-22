"use client";

import { useState } from "react";
import { Plus, Trash2, Printer } from "lucide-react";
import { labelClass, groupLabel, inputClass, esc } from "./ui";

type Item = { id: number; desc: string; qty: string; rate: string };

type Biz = { name: string; email: string; phone: string };
type Client = { name: string; email: string; address: string };
type Meta = { number: string; date: string; due: string };

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number.isFinite(n) ? n : 0);

const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
};

let nextId = 3;

function buildInvoiceHtml(
  biz: Biz,
  client: Client,
  meta: Meta,
  items: Item[],
  taxRate: string,
  notes: string,
  accent: string,
  subtotal: number,
  tax: number,
  total: number,
): string {
  const a = esc(accent);
  const rows = items
    .filter((it) => it.desc || it.qty || it.rate)
    .map(
      (it) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee;">${esc(it.desc)}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">${esc(it.qty || "0")}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">${fmt(num(it.rate))}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">${fmt(num(it.qty) * num(it.rate))}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html><html><head><meta charset="utf-8"><title>Invoice ${esc(
    meta.number || "",
  )}</title></head>
  <body style="font-family:Arial,Helvetica,sans-serif;color:#222;max-width:720px;margin:32px auto;padding:0 24px;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid ${a};padding-bottom:16px;">
      <div>
        <div style="font-size:20px;font-weight:bold;color:${a};">${esc(biz.name || "Your Business")}</div>
        <div style="font-size:13px;color:#666;">${esc(biz.email)}${biz.email && biz.phone ? " · " : ""}${esc(biz.phone)}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:26px;font-weight:bold;letter-spacing:2px;color:${a};">INVOICE</div>
        <div style="font-size:13px;color:#666;">#${esc(meta.number || "—")}</div>
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;">
      <div>
        <div style="color:#999;text-transform:uppercase;font-size:11px;letter-spacing:1px;">Bill to</div>
        <div style="font-weight:bold;margin-top:4px;">${esc(client.name || "—")}</div>
        <div style="color:#666;">${esc(client.email)}</div>
        <div style="color:#666;white-space:pre-line;">${esc(client.address)}</div>
      </div>
      <div style="text-align:right;">
        <div><span style="color:#999;">Date:</span> ${esc(meta.date || "—")}</div>
        <div><span style="color:#999;">Due:</span> ${esc(meta.due || "—")}</div>
      </div>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-top:24px;font-size:13px;">
      <thead>
        <tr style="color:#999;text-transform:uppercase;font-size:11px;letter-spacing:1px;">
          <th style="text-align:left;padding-bottom:8px;border-bottom:2px solid ${a};">Description</th>
          <th style="text-align:right;padding-bottom:8px;border-bottom:2px solid ${a};">Qty</th>
          <th style="text-align:right;padding-bottom:8px;border-bottom:2px solid ${a};">Rate</th>
          <th style="text-align:right;padding-bottom:8px;border-bottom:2px solid ${a};">Amount</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <div style="margin-top:16px;margin-left:auto;width:260px;font-size:13px;">
      <div style="display:flex;justify-content:space-between;padding:4px 0;">
        <span style="color:#666;">Subtotal</span><span>${fmt(subtotal)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:4px 0;">
        <span style="color:#666;">Tax (${esc(taxRate || "0")}%)</span><span>${fmt(tax)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:10px 0;margin-top:4px;border-top:2px solid ${a};font-weight:bold;font-size:16px;color:${a};">
        <span>Total</span><span>${fmt(total)}</span>
      </div>
    </div>

    ${
      notes
        ? `<div style="margin-top:28px;font-size:12px;color:#666;border-top:1px solid #eee;padding-top:12px;"><strong>Notes:</strong> ${esc(
            notes,
          )}</div>`
        : ""
    }
  </body></html>`;
}

export function InvoiceTool() {
  const [biz, setBiz] = useState<Biz>({ name: "", email: "", phone: "" });
  const [client, setClient] = useState<Client>({
    name: "",
    email: "",
    address: "",
  });
  const [meta, setMeta] = useState<Meta>({ number: "1001", date: "", due: "" });
  const [items, setItems] = useState<Item[]>([
    { id: 1, desc: "", qty: "1", rate: "" },
    { id: 2, desc: "", qty: "1", rate: "" },
  ]);
  const [taxRate, setTaxRate] = useState("0");
  const [notes, setNotes] = useState("");
  const accent = "#3A6096";

  const subtotal = items.reduce(
    (sum, it) => sum + num(it.qty) * num(it.rate),
    0,
  );
  const tax = subtotal * (num(taxRate) / 100);
  const total = subtotal + tax;

  const updateItem = (id: number, key: keyof Item, value: string) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [key]: value } : it)),
    );
  const addItem = () =>
    setItems((prev) => [
      ...prev,
      { id: nextId++, desc: "", qty: "1", rate: "" },
    ]);
  const removeItem = (id: number) =>
    setItems((prev) =>
      prev.length > 1 ? prev.filter((it) => it.id !== id) : prev,
    );

  function printInvoice() {
    const html = buildInvoiceHtml(
      biz,
      client,
      meta,
      items,
      taxRate,
      notes,
      accent,
      subtotal,
      tax,
      total,
    );
    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "style",
      "position:fixed;right:0;bottom:0;width:0;height:0;border:0;",
    );
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow?.document;
    if (!doc) return;
    doc.open();
    doc.write(html);
    doc.close();
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => iframe.remove(), 800);
    }, 300);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Form */}
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className={groupLabel}>From</p>
            <div className="mt-2.5 space-y-3">
              <input
                className={inputClass}
                placeholder="Your business name"
                value={biz.name}
                onChange={(e) => setBiz({ ...biz, name: e.target.value })}
              />
              <input
                className={inputClass}
                placeholder="Email"
                value={biz.email}
                onChange={(e) => setBiz({ ...biz, email: e.target.value })}
              />
              <input
                className={inputClass}
                placeholder="Phone"
                value={biz.phone}
                onChange={(e) => setBiz({ ...biz, phone: e.target.value })}
              />
            </div>
          </div>
          <div>
            <p className={groupLabel}>Bill to</p>
            <div className="mt-2.5 space-y-3">
              <input
                className={inputClass}
                placeholder="Client name"
                value={client.name}
                onChange={(e) =>
                  setClient({ ...client, name: e.target.value })
                }
              />
              <input
                className={inputClass}
                placeholder="Client email"
                value={client.email}
                onChange={(e) =>
                  setClient({ ...client, email: e.target.value })
                }
              />
              <input
                className={inputClass}
                placeholder="Client address"
                value={client.address}
                onChange={(e) =>
                  setClient({ ...client, address: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div>
          <p className={groupLabel}>Invoice details</p>
          <div className="mt-2.5 grid gap-3 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Invoice #</label>
              <input
                className={inputClass}
                value={meta.number}
                onChange={(e) => setMeta({ ...meta, number: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input
                className={inputClass}
                placeholder="Jun 22, 2026"
                value={meta.date}
                onChange={(e) => setMeta({ ...meta, date: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Due</label>
              <input
                className={inputClass}
                placeholder="Net 30"
                value={meta.due}
                onChange={(e) => setMeta({ ...meta, due: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div>
          <p className={groupLabel}>Line items</p>
          <div className="mt-2.5 space-y-2">
            {items.map((it) => (
              <div key={it.id} className="flex items-center gap-2">
                <input
                  className={`${inputClass} mt-0 flex-1`}
                  placeholder="Description"
                  value={it.desc}
                  onChange={(e) => updateItem(it.id, "desc", e.target.value)}
                />
                <input
                  className={`${inputClass} mt-0 w-16 text-right`}
                  inputMode="decimal"
                  placeholder="Qty"
                  value={it.qty}
                  onChange={(e) => updateItem(it.id, "qty", e.target.value)}
                  aria-label="Quantity"
                />
                <input
                  className={`${inputClass} mt-0 w-24 text-right`}
                  inputMode="decimal"
                  placeholder="Rate"
                  value={it.rate}
                  onChange={(e) => updateItem(it.id, "rate", e.target.value)}
                  aria-label="Rate"
                />
                <button
                  type="button"
                  onClick={() => removeItem(it.id)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-mist/60 hover:text-ink"
                  aria-label="Remove line item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addItem}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-deep hover:text-ink"
          >
            <Plus className="h-4 w-4" />
            Add line item
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Tax rate (%)</label>
            <input
              className={inputClass}
              inputMode="decimal"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Notes</label>
            <input
              className={inputClass}
              placeholder="Thank you for your business!"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Live preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className={labelClass}>Live preview</span>
          <button type="button" onClick={printInvoice} className="btn-ink">
            <Printer className="h-4 w-4" />
            Print / Save PDF
          </button>
        </div>

        <div className="overflow-x-auto rounded-card border border-line bg-white p-6 text-sm text-gray-800">
          <div
            className="flex items-start justify-between border-b-[3px] pb-4"
            style={{ borderColor: accent }}
          >
            <div>
              <div className="text-lg font-bold" style={{ color: accent }}>
                {biz.name || "Your Business"}
              </div>
              <div className="text-xs text-gray-500">
                {[biz.email, biz.phone].filter(Boolean).join(" · ")}
              </div>
            </div>
            <div className="text-right">
              <div
                className="text-xl font-bold tracking-widest"
                style={{ color: accent }}
              >
                INVOICE
              </div>
              <div className="text-xs text-gray-500">#{meta.number || "—"}</div>
            </div>
          </div>

          <div className="mt-4 flex justify-between text-xs">
            <div>
              <div className="uppercase tracking-wide text-gray-400">
                Bill to
              </div>
              <div className="mt-1 font-semibold">{client.name || "—"}</div>
              <div className="text-gray-500">{client.email}</div>
              <div className="whitespace-pre-line text-gray-500">
                {client.address}
              </div>
            </div>
            <div className="text-right text-gray-600">
              <div>
                <span className="text-gray-400">Date:</span>{" "}
                {meta.date || "—"}
              </div>
              <div>
                <span className="text-gray-400">Due:</span> {meta.due || "—"}
              </div>
            </div>
          </div>

          <table className="mt-5 w-full text-xs">
            <thead>
              <tr
                className="uppercase tracking-wide text-gray-400"
                style={{ borderBottom: `2px solid ${accent}` }}
              >
                <th className="pb-2 text-left font-medium">Description</th>
                <th className="pb-2 text-right font-medium">Qty</th>
                <th className="pb-2 text-right font-medium">Rate</th>
                <th className="pb-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items
                .filter((it) => it.desc || it.rate)
                .map((it) => (
                  <tr key={it.id} className="border-b border-gray-100">
                    <td className="py-2">{it.desc || "—"}</td>
                    <td className="py-2 text-right">{it.qty || "0"}</td>
                    <td className="py-2 text-right">{fmt(num(it.rate))}</td>
                    <td className="py-2 text-right">
                      {fmt(num(it.qty) * num(it.rate))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="ml-auto mt-4 w-56 text-xs">
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Subtotal</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Tax ({taxRate || "0"}%)</span>
              <span>{fmt(tax)}</span>
            </div>
            <div
              className="mt-1 flex justify-between border-t-2 py-2 text-base font-bold"
              style={{ borderColor: accent, color: accent }}
            >
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>
          </div>

          {notes && (
            <div className="mt-6 border-t border-gray-100 pt-3 text-xs text-gray-500">
              <strong>Notes:</strong> {notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
