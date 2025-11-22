'use client'

import type { Expense } from '../page';

function formatCurrency(n: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString();
}

export default function ExpenseTable({ items, onDelete }: { items: Expense[]; onDelete: (id: string) => void; }) {
  const sorted = [...items].sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime());

  return (
    <div className="rounded border bg-white overflow-hidden">
      <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
        <h2 className="text-lg font-medium">Expenses</h2>
        <div className="text-sm text-gray-600">{items.length} item{items.length!==1?'s':''}</div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Description</th>
              <th className="text-left px-4 py-2">Category</th>
              <th className="text-right px-4 py-2">Amount</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(e => (
              <tr key={e.id} className="border-t">
                <td className="px-4 py-2 whitespace-nowrap">{formatDate(e.date)}</td>
                <td className="px-4 py-2">{e.description}</td>
                <td className="px-4 py-2">{e.category}</td>
                <td className="px-4 py-2 text-right font-medium">{formatCurrency(e.amount)}</td>
                <td className="px-4 py-2 text-right">
                  <button onClick={()=>onDelete(e.id)} className="text-rose-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">No expenses yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
