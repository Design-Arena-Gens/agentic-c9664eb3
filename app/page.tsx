'use client'

import { useEffect, useMemo, useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import SummaryCards from './components/SummaryCards';
import CategoryChart from './components/CategoryChart';
import { loadExpenses, saveExpenses, exportExpensesJson, importExpensesJson } from './lib/storage';

export type Expense = {
  id: string;
  date: string; // ISO
  description: string;
  category: string;
  amount: number;
};

const defaultCategories = ['Food', 'Transport', 'Housing', 'Utilities', 'Entertainment', 'Health', 'Shopping', 'Travel', 'Other'];

export default function Page() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setExpenses(loadExpenses());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveExpenses(expenses);
  }, [expenses, hydrated]);

  const total = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);

  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};
    for (const e of expenses) {
      map[e.category] = (map[e.category] ?? 0) + e.amount;
    }
    return map;
  }, [expenses]);

  function addExpense(e: Expense) {
    setExpenses(prev => [e, ...prev]);
  }

  function deleteExpense(id: string) {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }

  function resetAll() {
    if (confirm('This will clear all expenses. Continue?')) {
      setExpenses([]);
    }
  }

  async function handleExport() {
    const blob = new Blob([exportExpensesJson(expenses)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport(file: File) {
    const text = await file.text();
    const parsed = importExpensesJson(text);
    setExpenses(parsed);
  }

  if (!hydrated) {
    return (
      <main>
        <h1 className="text-2xl font-semibold">Expense Dashboard</h1>
        <p className="text-gray-500 mt-2">Loading?</p>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-semibold">Expense Dashboard</h1>
        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Export</button>
          <label className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer">
            Import
            <input type="file" accept="application/json" className="hidden" onChange={e => {
              const f = e.target.files?.[0];
              if (f) handleImport(f);
            }} />
          </label>
          <button onClick={resetAll} className="px-3 py-2 rounded bg-rose-600 text-white hover:bg-rose-700">Reset</button>
        </div>
      </div>

      <SummaryCards total={total} byCategory={byCategory} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ExpenseForm categories={defaultCategories} onAdd={addExpense} />
        </div>
        <div className="lg:col-span-2">
          <CategoryChart byCategory={byCategory} />
        </div>
      </div>

      <ExpenseTable items={expenses} onDelete={deleteExpense} />
    </main>
  );
}
