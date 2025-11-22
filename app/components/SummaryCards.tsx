'use client'

function formatCurrency(n: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);
}

export default function SummaryCards({ total, byCategory }: { total: number; byCategory: Record<string, number>; }) {
  const top = Object.entries(byCategory).sort((a,b)=>b[1]-a[1])[0];
  const month = new Date().toLocaleString(undefined, { month: 'long', year: 'numeric' });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="rounded border bg-white p-4">
        <div className="text-sm text-gray-600">Total Spent ({month})</div>
        <div className="text-2xl font-semibold mt-1">{formatCurrency(total)}</div>
      </div>
      <div className="rounded border bg-white p-4">
        <div className="text-sm text-gray-600">Top Category</div>
        <div className="text-2xl font-semibold mt-1">{top ? `${top[0]} ? ${formatCurrency(top[1])}` : '?'}</div>
      </div>
      <div className="rounded border bg-white p-4">
        <div className="text-sm text-gray-600">Entries</div>
        <div className="text-2xl font-semibold mt-1">{Object.values(byCategory).reduce((a,b)=>a+b,0) === 0 ? 0 : 'Active'}</div>
      </div>
    </div>
  );
}
