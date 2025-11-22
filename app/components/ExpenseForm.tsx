'use client'

import { useMemo, useState } from 'react';
import type { Expense } from '../page';

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function ExpenseForm({ categories, onAdd }: { categories: string[]; onAdd: (e: Expense) => void; }) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0] ?? 'Other');
  const [amount, setAmount] = useState('');

  const isValid = useMemo(() => {
    const amt = Number(amount);
    return description.trim().length > 0 && !Number.isNaN(amt) && amt > 0;
  }, [description, amount]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    const exp: Expense = {
      id: generateId(),
      date: new Date(date + 'T12:00:00').toISOString(),
      description: description.trim(),
      category,
      amount: Number(amount),
    };
    onAdd(exp);
    setDescription('');
    setAmount('');
  }

  return (
    <form onSubmit={submit} className="rounded border p-4 space-y-3 bg-white">
      <h2 className="text-lg font-medium">Add Expense</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Date</label>
          <input value={date} onChange={e=>setDate(e.target.value)} type="date" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full border rounded px-3 py-2">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm text-gray-600">Description</label>
          <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="e.g. Groceries" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm text-gray-600">Amount</label>
          <input value={amount} onChange={e=>setAmount(e.target.value)} inputMode="decimal" placeholder="0.00" className="w-full border rounded px-3 py-2" />
        </div>
      </div>
      <button disabled={!isValid} className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50">Add</button>
    </form>
  );
}
